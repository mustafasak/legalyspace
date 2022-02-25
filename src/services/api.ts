import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, CancelTokenSource } from 'axios'
import sessionManager from '@/managers/sessionManager'
import navigationManager from '@/managers/navigationManager'
import Alert from '@/plugins/alert'
import configManager from '@/managers/configManager';
import resourceManager from '@/managers/resourceManager';

// Configuration des URLs des WS. Les URLs sont configurées dans le fichier .end.#ENV#
const API_URL_BASE = configManager.resolveUrl('API_PATH');
const APP_BYPASS_SESSION = configManager.getConfigAsBoolean('BYPASS_SESSION');
const REQUESTED_VERSION_HEADER = configManager.getConfigAsBoolean('REQUESTED_VERSION_HEADER');

export interface CancelationObject {
  code : string,
  message : string
}

export class Canceler {
  private source : CancelTokenSource;
  private interval : number;
  private cancelationObj : CancelationObject;

  constructor(time : number, code : string, message? : string){
    this.cancelationObj = {
      code,
      message : message || `Operation was canceled by user`
    };

    this.interval = setInterval(() => {
      this.cancel();
    }, time)
  }

  private cancel() {
    if(!this.source)
      throw new Error('undefined cancel hook');

    this.source.cancel(JSON.stringify(this.cancelationObj));
  }

  public stop(){
    clearInterval(this.interval);
  }

  private setCancelTokenSource(source : CancelTokenSource) {
    this.source = source;
  }
}

let __authorizedSession : boolean = null;

abstract class Api {
  private readonly _apiClient : AxiosInstance = null;

  private _rootUrl : string = null;
  private _baseUrl : string = null;

  public get RootUrl() { return this._rootUrl; }
  public get BaseUrl() { return `${this._rootUrl}${this._baseUrl}`; }

  constructor(baseUrl : string = null, rootUrl : string = null, requestVersion : boolean = REQUESTED_VERSION_HEADER)
  {
    this._rootUrl = rootUrl || API_URL_BASE;
    this._baseUrl = baseUrl;

    let options : AxiosRequestConfig = {
      baseURL : this._rootUrl,
      withCredentials : true,
      headers : {        
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };

    if(requestVersion)
      options.headers = {
        'X-Requested-Version' : configManager.getVersion()
      };

    this._apiClient = axios.create(options);
    
    this._apiClient.interceptors.request.use(config => {    
      const session = sessionManager.getActiveSession();

      if(!APP_BYPASS_SESSION && session !== null )
          config.headers['Authorization'] = `${session.token}`;

      this.onRequest();

      return config;
    })

    this._apiClient.interceptors.response.use(
      async response => {
        
        if(response.data && response.data.erreur === true) {
          const erreur = response.data as FunctionalError

          if(erreur.erreurCode === "SESSION_EXPIRED") {
            await Alert.confirmMessage(erreur.erreurMessage, 0).then(() => {    
              sessionManager.clearActiveSession();
              navigationManager.redirectToLogin();
            })
            return Promise.reject(new ApiError(ResultStatusEnum.UnAuthorized, response.request.responseURL, ResultStatusEnum.UnAuthorized.toString()));
          }

          this.onFunctionalError(erreur);
        }
        else if(response.data && response.data.erreur === false) {
          const alternativeResponse : AlternativeScenario = {
            alternativeResult : true,
            code : response.data.erreurCode,
            message : response.data.erreurMessage
          };

          response.data = alternativeResponse;
        }

        __authorizedSession = true;

        this.onResponse();

        return response;
      },      
      async error => {
        let apiError;
        if(error.request === undefined) {
          const cancelationObj = JSON.parse(error.message) as CancelationObject;
          
          error.message = cancelationObj.message;
          error.requestCanceled = true;

          apiError = ApiError.initError(error, cancelationObj.code);
        }
        else {
          apiError = ApiError.initError(error);
        }

        this.onError(apiError)

        if(apiError.status === ResultStatusEnum.UnAuthorized) {
          if(__authorizedSession === null || __authorizedSession) {
            __authorizedSession = false;

            await Alert.confirmMessage(resourceManager.translate('session.sessionExpiredMessage'));
            navigationManager.redirectToLogin();

            return Promise.reject(new ApiError(ResultStatusEnum.UnAuthorized, null, ResultStatusEnum.UnAuthorized.toString()));
          }
        }
          
        if(apiError.status === ResultStatusEnum.Forbidden) 
          this.onUnAuthorized(apiError);
        
        if(apiError.status === ResultStatusEnum.NotFound)
          this.onNotFound(apiError);

        if(apiError.status === ResultStatusEnum.Fatal)
          this.onTechnicalError(apiError);

        return Promise.reject(apiError);
      }
    )
  }

  public get<T = any>(url: string): Promise<ApiResponse<T>>
  public get<T = any>(url: string, canceller : Canceler): Promise<ApiResponse<T>>
  public get<T = any>(url: string, config: AxiosRequestConfig): Promise<ApiResponse<T>>
  public get<T = any>(url: string, config: AxiosRequestConfig, canceller : Canceler): Promise<ApiResponse<T>>
  public get<T = any>(param1, param2?, param3?): Promise<ApiResponse<T>> {
    
    let url : string = this._baseUrl !== null ? `${this._baseUrl}${param1}` : param1;
    let config : AxiosRequestConfig = null;
    let canceller : Canceler = null;

    if(!param2 && !param3) {
    }
    else if(!param3) {
      config = param2.constructor.name !== Canceler.name ? param2 : null ;
      canceller = param2.constructor.name === Canceler.name ? param2 : null;
    }
    else {
      config = param2;
      canceller = param3;
    }

    if(canceller) {
      let source = axios.CancelToken.source();        

      config = config || {};
      config.cancelToken = source.token;      

      (canceller as any).setHook(() => source.cancel(`Operation was canceled by user. route=${url}`));
    }

    return this._apiClient.get(url, config).then(
      async response => ApiResponse.initResponse<T>(response)
    );
  }   

  public async getFile(url?: string, fileName? : string, config: AxiosRequestConfig = {}): Promise<ApiResponse<Blob>> {
    url = this._baseUrl !== null ? `${this._baseUrl}${url}` : url;

    const default_file_type = 'application/pdf';

    config.responseType = "arraybuffer";
    config.headers = config.headers || {};

    if(!config.headers.Accept)
      config.headers.Accept = default_file_type;

    return this._apiClient.get(url, config).then(
      async response => fileName 
       ? new ApiResponse(true, new File([response.data], fileName, { type: default_file_type }), null)
       : new ApiResponse(true, new Blob([response.data], { type: default_file_type }), null)
    );
  }   
  
  public post<T = any>(url: string, data: any): Promise<ApiResponse<T>>
  public post<T = any>(url: string, data: any, config: AxiosRequestConfig): Promise<ApiResponse<T>>
  public post<T = any>(url: string, data: any, canceler : Canceler): Promise<ApiResponse<T>>

  public post<T = any>(url: string, data: any, canceler : Canceler): Promise<ApiResponse<T>>
  public post<T = any>(url: string, data: any, config: AxiosRequestConfig): Promise<ApiResponse<T>>

  public post<T = any>(url: string, data: any, config: AxiosRequestConfig, canceler : Canceler): Promise<ApiResponse<T>>
  public post<T = any>(param1, param2, param3?, param4?): Promise<ApiResponse<T>> {
    
    let url : string = this._baseUrl !== null ? `${this._baseUrl}${param1}` : param1;
    let data : any = param2;
    let config : AxiosRequestConfig = null;
    let canceler : Canceler = null;

    if(!param3 && !param4) {      
    }
    else if(!param4) {      
      config = (param3.constructor && param3.constructor.name) !== Canceler.name ? param3 : null ;
      canceler = (param3.constructor && param3.constructor.name) === Canceler.name ? param3 : null;   
    }
    else {
      data = param2;
      config = param3;
      canceler = param4;
    }

    if(canceler) {
      let source = axios.CancelToken.source();        

      config = config || {};
      config.cancelToken = source.token;      

      (canceler as any).setCancelTokenSource(source);
    }

    return this._apiClient.post(url, data, config).then(
      async response => {
        if(canceler) canceler.stop();
        return ApiResponse.initResponse<T>(response);
      },
      async error => {
        if(canceler) canceler.stop();
        return Promise.reject(error);
      }
    );
  }   

  public async postToGetFile(url: string, data?: any, config: AxiosRequestConfig = {}, fileType = 'application/pdf'): Promise<ApiResponse<Blob>> {    
    url = this._baseUrl !== null ? `${this._baseUrl}${url}` : url;
    config = config || {};

    config.responseType = "arraybuffer";
    config.headers = config.headers || {};

    if(!config.headers.Accept)
      config.headers.Accept = fileType;

    return this._apiClient.post(url, data, config).then(
      async response => { 
        return new ApiResponse(true, new Blob([response.data], { type: fileType, }), null);
      },
      async error => {

        return Promise.reject(error);
      }
    );
  }  
    
  public async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    url = this._baseUrl !== null ? `${this._baseUrl}${url}` : url;

    return this._apiClient.put(url, data, config).then(
      async response => ApiResponse.initResponse<T>(response)
    );
  }   

  public async delete<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    url = this._baseUrl !== null ? `${this._baseUrl}${url}` : url;

    return this._apiClient.delete(url, config).then(
      async response => ApiResponse.initResponse<T>(response)
    );
  }   

  protected onRequest(){};
  protected onResponse(){};
  protected onError(error : ApiError){};
  
  protected onFunctionalError(error : FunctionalError) : void {    
    // console.log(`Functional error : ${error.erreurMessage }`);
    // Alert.erreurMessage(`${error.erreurMessage }`);
  };
  
  protected onAlternativeScenario(alternativeScenario : AlternativeScenario) : void {    
    // console.log(`Alternative result : ${alternativeScenario.message }`);
    // Alert.erreurMessage(`${error.erreurMessage }`);
  };

  protected onUnAuthorized(error : ApiError ) : void {    
    // console.log(`UnAuthorized error : ${Alert.DEFAULT_UNAUTHORIZED_MESSAGE }`);
    // Alert.erreurMessage(Alert.DEFAULT_UNAUTHORIZED_MESSAGE);
  };

  protected onNotFound(error : ApiError ) : void {
    // console.log(`NotFound error : ${Alert.DEFAULT_NOTFOUND_MESSAGE }`);
    // Alert.erreurMessage(Alert.DEFAULT_NOTFOUND_MESSAGE);
  };

  protected onTechnicalError(error : ApiError) : void {
    // console.log(`TechnicalError error : ${Alert.DEFAULT_TECHNICAL_MESSAGE }`);
    // Alert.erreurMessage(Alert.DEFAULT_TECHNICAL_MESSAGE);
  };
}

export class GenericApi extends Api{
  constructor(baseUrl : string = null, rootUrl : string = null, requestVersion = false){
    super(baseUrl, rootUrl, requestVersion);
  }
}

export default Api;

//#region -> TYPES ///////////////////////////////////////////////////////////////////////////

export enum ResultStatusEnum {
  Undefined = 0,
  Canceled = -1,
  Ok = 200,
  BadRequest = 400,
  UnAuthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  NotAcceptable = 406,
  Fatal = 500
}

export interface FunctionalError {
  erreurCode : string;
  erreurMessage : string;
}

export interface AlternativeScenario {
  alternativeResult : boolean;
  code : string;
  message : string;
}

export class ApiError {
  private _status : ResultStatusEnum;
  private _erreurMessage : string;
  private _requestUrl : string;
  private _code : string;

  public get status() : ResultStatusEnum { return this._status; }
  public get erreurMessage() : string { return this._erreurMessage; }
  public get requestUrl() : string { return this._requestUrl; }
  public get code() : string { return this._code; }

  constructor(status : number, requestUrl : string = null, message : string = null, code : string = null){
      this._status = status;
      this._code = code;
      this._erreurMessage = message;
      this._requestUrl = requestUrl;
  }

  static initError(error : any, code? : string, requestUrl? : string) : ApiError {

      if(!error)
          return new ApiError(0);
        
      if((error as any).requestCanceled){
        return new ApiError(ResultStatusEnum.Canceled, requestUrl, error.message, code);
      }

      if(!error.response)
        return new ApiError(ResultStatusEnum.Fatal, error.request.requestURL, error.message);

      return new ApiError(error.response.status, error.request.requestURL, error.response.statusText);
  }
}

export class ApiResponse<T> {
  private _success : boolean;
  private _result : T = null;
  private _erreur : FunctionalError = null
  
  public get success() : boolean { return this._success; }
  public get result() : T { return this._result ; }
  public get erreur() : FunctionalError { return this._erreur; }

  constructor(success : boolean, result : T = null, erreur : FunctionalError = null) {
      this._success = success;
      this._result = result;
      this._erreur = erreur;
  }

  static initResponse<T>(response : AxiosResponse) : ApiResponse<T> {
      return response.data.erreur === true
      ? new ApiResponse(false, null, response.data) 
      : new ApiResponse(true, response.data, null);
  } 
}
//#endregion
