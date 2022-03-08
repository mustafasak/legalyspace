<template>
	<div class="layout__main">
    <Step :step="step"/>
    <div v-show="step == 2">
        <div class="layout__column">
            <div class="title__breadcrumbs">
                <h1 class="title__primary">Inscription</h1>
                <div class="title__icon">
                    <img class="header__breadcrumbs"
                         src="@/assets/breadcrumbs.png"
                         alt="Logo LegalySpace" />
                </div>
                <div class="title__secondary">Mon compte</div>
            </div>
            <p class="text__body">Nous allons créer votre espace légale ensemble, renseignez votre e-mail personnel et créez un nouveau mot de passe.</p>
        </div>
          <CustomInput :options="{
            type: 'email',
            name: 'email',
            id: 'email',
            autocomplete: 'email',
            label: 'Votre adresse email',
            placeholder: 'Entrer votre adresse email.',
            action: [false],
            typeable: false}"
            @valueChange="getValue($event)"></CustomInput>
          <CustomInput :options="{
            type: 'password',
            name: 'password',
            id: 'paswword',
            autocomplete: 'new-password',
            label: 'Créer un nouveau mot de passe',
            placeholder: 'Créer un nouveau mot de passe.',
            action: [false],
            typeable: true}"
            @valueChange="getValue($event)"></CustomInput>
          <CustomInput :options="{
            type: 'password',
            name: 'passwordConfirm',
            id: 'passwordConfirm',
            autocomplete: 'new-password',
            label: 'Répéter votre nouveau mot de passe',
            placeholder: 'Répéter votre nouveau mot de passe.',
            action: [false],
            typeable: true}"
            @valueChange="getValue($event)"></CustomInput>
    </div>
    <div v-show="step == 3">
        <div class="layout__column">
            <div class="title__breadcrumbs">
                <h1 class="title__primary">Inscription</h1>
                <div class="title__icon">
                    <img class="header__breadcrumbs"
                        src="@/assets/breadcrumbs.png"
                        alt="Logo LegalySpace" />
                </div>
                <div class="title__secondary">Mes informations</div>
            </div>
            <p class="text__body">Veuillez renseignez vos informations personnelles, elles seront utilisées pour tous vos documents légaux.</p>
        </div>
        <CustomInput :options="{
            type: 'text',
            name: 'lastname',
            id: 'lastname',
            autocomplete: 'lastname',
            label: 'Votre nom',
            placeholder: 'Entrer votre nom.',
            action: [false],
            typeable: false}"
            @valueChange="getValue($event)"></CustomInput>
        <CustomInput :options="{
            type: 'text',
            name: 'firstname',
            id: 'firstname',
            autocomplete: 'firstname',
            label: 'Votre prenom',
            placeholder: 'Entrer votre prenom.',
            action: [false],
            typeable: false}"
            @valueChange="getValue($event)"></CustomInput>
        <CustomInput :options="{
            type: 'date',
            name: 'birthday',
            id: 'birthday',
            autocomplete: 'birthday',
            label: 'Votre date de naissance',
            placeholder: '',
            action: [false],
            typeable: false}"
            @valueChange="getValue($event)"></CustomInput>
        <CustomInput :options="{
            type: 'text',
            name: 'birthcity',
            id: 'birthcity',
            autocomplete: 'birthcity',
            label: 'Votre ville de naissance',
            placeholder: 'Entrer votre ville de naissance',
            action: [false],
            typeable: false}"
            @valueChange="getValue($event)"></CustomInput>
        <CustomInput :options="{
            type: 'text',
            name: 'birthcontry',
            id: 'birthcontry',
            autocomplete: 'birthcontry',
            label: 'Votre pays de naissance',
            placeholder: 'Entrer votre pays de naissance',
            action: [false],
            typeable: false}"
            @valueChange="getValue($event)"></CustomInput>
    </div>
    <div v-show="step == 4">
       <div class="layout__column">
            <div class="title__breadcrumbs">
                <h1 class="title__primary">Inscription</h1>
                <div class="title__icon">
                    <img class="header__breadcrumbs"
                        src="@/assets/breadcrumbs.png"
                        alt="Logo LegalySpace" />
                </div>
                <div class="title__secondary">Mon adresse</div>
            </div>
            <p class="text__body">Veuillez indiquer votre adresse postale, elles sera utilisée pour vous contacter.</p>
        </div>
        <CustomInput :options="{
            type: 'text',
            name: 'address',
            id: 'address',
            autocomplete: 'address',
            label: 'Votre adresse de résidence',
            placeholder: 'Entrer votre adresse ',
            action: [false],
            typeable: false}"
            @valueChange="getValue($event)"></CustomInput>
        <CustomInput :options="{
            type: 'text',
            name: 'cityName',
            id: 'cityName',
            autocomplete: 'cityName',
            label: 'Votre ville de résidence',
            placeholder: 'Entrer ville',
            action: [false],
            typeable: false}"
            @valueChange="getValue($event)"></CustomInput>
        <CustomInput :options="{
            type: 'text',
            name: 'cityCode',
            id: 'cityCode',
            autocomplete: 'addressCode',
            label: 'Votre code postale de résidence',
            placeholder: 'Entrer votre code postal',
            action: [false],
            typeable: false}"
            @valueChange="getValue($event)"></CustomInput>
    </div>
    <div class="form__buttons form__buttons-double layout__flex">
        <button class="button button-prev"
                type="button"
                @click.stop.prevent="previous"
                :disabled="step > 2 ? false : true">Précédent</button>
        <button class="button button-submit"
                type="submit"
                @click.stop.prevent="next">Suivant</button>
    </div>
  </div>
</template>

<script>
import router from '../router';
import Step from '../components/common/Step.vue';
import CustomInput from "../components/input.vue";
import axios from 'axios';
import "../plugins/firebase.js";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

export default {
  name: 'Register',
  components: {
    Step,
    CustomInput
  },
  data() {
    return {
      api: null,
      error: null,
      loading: false,
      user: null,
      email: null,
      lastname: null,
      firstname: null,
      address: null,
      cityName: null,
      cityCode: null,
      birthday: null,
      birthcity: null,
      birthcontry: null,
      password: null,
      passwordConfirm: null,
    }
  },
  computed: {
    step() {
      return parseInt(this.$route.query['step']) || 2;
    },
    code() {
      return this.$route.query['code'];
    }
  },
  methods: {
    initUser() {
      this.user = {
        mail: this.email,
        nom: this.lastname,
        prenom: this.firstname,
        adresse: this.address,
        ville: this.cityName,
        codePostal: this.cityCode,
        dateNaissance: '04/12/1993',
        lieuNaissance: this.birthcity,
        paysNaissance: this.birthcontry,
        password: this.password,
        passwordConfirm: this.passwordConfirm,
        cgvAgreed: true,
      }
    },

    getUserInformations() {            
      this.api = axios.create({
          baseURL : 'https://demo.legalyspace.com/LYSLogique/api/',
          withCredentials : true,
          headers : {        
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          }
      });

      this.api.post(
          `https://demo.legalyspace.com/LYSLogique/api/inscription/getUserFromCodePartenaire`, {
              codePartenaire: this.code 
          }
      ).then(response => {
        this.email = response.data.mail;
        this.lastname = response.data.nom;
        this.firstname = response.data.prenom;
        this.address = response.data.adresse;
        this.cityName = response.data.ville;
        this.cityCode = response.data.codePostal;
        this.birthday = response.data.dateNaissance;
        this.birthcity = response.data.lieuNaissance;
        this.birthcontry = response.data.paysNaissance;
      })
      .catch(e => {
          console.error(e);
      });
    },

    registration() {
        this.initUser();
        this.api.post(`https://demo.legalyspace.com/LYSLogique/api/inscription/validerInscriptionParticulier`, this.user)
           .then(response => {
              console.log(response);
              
              if (response.data['erreur'] !== undefined) {
                console.log("ERROR_ON_REGISTRATION")
              } else {
                console.log("REGISTRATION_IS_POSSIBLE");
        
                this.api.post(`https://demo.legalyspace.com/LYSLogique/api/inscription/finaliserInscriptionParticulier`, this.user)
                   .then(response => {
                      console.log(response.data);
                      localStorage.setItem('NavigSession', JSON.stringify((response.data.NavigSession)));
            
                    if (response.data['erreur'] !== undefined) {
                      console.log("ERROR_ON_REGISTRATION");
                    } else {
                      console.log("REGISTRATION_IS_DONE");
                      signInWithEmailAndPassword(auth, "mustafa.sak@outlook.fr", "testtest")
                          .then((/*userCredential*/) => {
                              this.loading = true;
                              // Signed in 
                              // const user = userCredential.user;
                              // console.log(user);
                      })
                      .catch((error) => {
                          console.error(error);
                      });
                    }
              }).catch(e => {
                console.error(e);
            })
          }
        }).catch(e => {
            console.error(e);
        })
    },

    next(event) {
      if (this.step == 4) {
        event.preventDefault();
        this.registration();
      } else {
        router.push({
          path: '/register',
          query: {
            step: this.step + 1,
            code: this.code
          }
        })
      }
    },
    previous() {
      router.push({
        path: '/register',
        query: {
          step: this.step - 1,
          code: this.code
        }
      })
    },

    getValue(event) {
        if (event.name == 'email') {
            this.email = event.value;
        } else if (event.name == 'password') {
            this.password = event.value;
        } else if (event.name == 'passwordConfirm') {
            this.passwordConfirm = event.value;
        } else if (event.name == 'firstname') {
            this.firstname = event.value;
        } else if (event.name == 'lastname') {
            this.lastname = event.value;
        } else if (event.name == 'address') {
            this.address = event.value;
        } else if (event.name == 'cityName') {
            this.cityName = event.value;
        } else if (event.name == 'cityCode') {
            this.cityCode = event.value;
        } else if (event.name == 'birthday') {
            this.birthday = event.value;
        } else if (event.name == 'birthcity') {
            this.birthcity = event.value;
        } else if (event.name == 'birthcontry') {
            this.birthcontry = event.value;
        }
    }
  },
  created() {
    this.getUserInformations();
  }
}
</script>

<style>

</style>