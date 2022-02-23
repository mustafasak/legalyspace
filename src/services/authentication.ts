import Api, { ApiError, ApiResponse } from './apiBase'
import nProgress from 'nprogress';

//#region API TYPES
////////////////////////////////////////////////////////////

// -> SignIn
export interface SignInRequest {
    userName : string,
    password : string
}

export interface SignInData {    
    NavigAuth : string;
    NavigSession : string;
    REFONTE_ACTIVE : boolean;
}

export interface SignInDataResult extends SignInData {

    result? : string;

    // -> case token request
    uniqueId? : string;
    userName? : string;
    userMail? : string;
    //password? : string;

    // -> case finalisation inscription
    codePartenaire? : string;

    // -> case page speciale
    pageSpeciale? : string;
    nomPageSpeciale? : string;
    logoPageSpeciale? : string;
}

// -> ChangePassword
export interface ChangePasswordRequest {
    accesUniqueId : string;
    password : string;
    passwordConfirm : string;
    fullName : string;
}

// -> RenewSession
export interface RenewSessionData {    
    NavigSession : string;
}

//#endregion

/// -> API CONCRETE
////////////////////////////////////////////////////////////
export class AuthApi extends Api {
    constructor() {
        super('/auth');
    }
    
    public signIn(request : SignInRequest) : Promise<ApiResponse<SignInDataResult>> { // TODO : (JES) -> Define any
        return this.post('/signin', {
            userName: request.userName,
            password: request.password
        });
    }
    
    
    public signOut() : Promise<ApiResponse<void>> { // TODO : (JES) -> Define any
        return this.post('/signout', {});
    }
    
    public forgetPass(email : string) : Promise<ApiResponse<any>> { // TODO : (JES) -> Define any
        return this.post('/forgetpass', {
            userName: email,
            password: ''
        });
    }
    
    public validOtp(uniqueId : string, password : string, codeOtp : string) : Promise<ApiResponse<any>> { // TODO : (JES) -> Define any
        return this.post('/validateTokenOtp', {
            uniqueIdentifier: uniqueId,
            password : password,
            codeOtp: codeOtp
        });
    }
    
    public changepassword(request : ChangePasswordRequest) : Promise<ApiResponse<any>> { // TODO : (JES) -> Define any
        return this.post('/changepassword', request);
    }
    
    public creationPassword(request : ChangePasswordRequest) : Promise<ApiResponse<any>> { // TODO : (JES) -> Define any
        return this.post('/creationpassword', request);
    }

    public renvoiCodeOtp(uniqueId : string) : Promise<ApiResponse<any>> {        
        return this.post('/renvoiCodeOtp', uniqueId);
    }

    public renewSession() : Promise<ApiResponse<RenewSessionData>> {
        return this.post('/renewSession', {});
    }

    public renewSessionOldApp() : Promise<ApiResponse<void>> {
        return this.put('/renewSessionOldPlateforme');
    }

    onRequest() {          
        super.onRequest();

        nProgress.start();      
    }

    onResponse(){
        super.onResponse();

        nProgress.done();     
    }

    onError(error : ApiError){
        super.onError(error);

        nProgress.done();     
    }
}

export default new AuthApi()
