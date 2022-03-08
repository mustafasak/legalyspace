<template>
    <div class="layout__main">
        <div class="layout__column">
            <div class="title__breadcrumbs">
                <h1 class="title__primary">Connexion</h1>
            </div>
            <p class="text__body">Renseignez vos identifiants pour vous connecter à votre espace légal.</p>
        </div>
        <div class="layout__column">
            <form class="form"
                @submit.stop.prevent="login()"
                action="/login"
                method="post"
                novalidate="true">
                <CustomInput :options="{
                    type: 'username',
                    name: 'username',
                    id: 'username',
                    autocomplete: 'username',
                    label: 'Adresse e-mail ou code',
                    placeholder: 'Entrer votre adresse e-mail',
                    action: [
                        true,
                        'Réinitialise le mot de passe',
                    ],
                    typeable: false }"
                    @valueChange="getValue($event)"></CustomInput>
                <CustomInput :options="{
                    type: 'password',
                    name: 'password',
                    id: 'password',
                    autocomplete: 'current-password',
                    label: 'Mot de passe',
                    placeholder: 'Minimun 6 charactères.',
                    action: [false],
                    typeable: true}"
                    @valueChange="getValue($event)"></CustomInput>
                <div class="form__erreur"
                    v-show="erreur !== null">
                    <p class="text__body text__body-error">{{ erreur }}</p>
                </div>
                <div class="form__button layout__flex">
                    <button class="button button-submit"
                            type="submit">
                            <span>Connexion</span>
                            <svg class="button__spinner"
                                viewBox="0 0 50 50"
                                v-show="loading">
                                <circle class="path"
                                        cx="25" cy="25" r="20"
                                        fill="none"
                                        stroke-width="5">
                                </circle>
                            </svg>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>


<script>
import "../plugins/firebase.js";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import axios from 'axios';
import CustomInput from "../components/input.vue";

const auth = getAuth();

export default {
    name: 'Login',
    components: {
        CustomInput
    },
    data() {
        return {
            api: null,
            erreur: null,
            loading: false,
            username: '',
            password: '',
        }
    },
    methods: {
        login() {
            this.loading = true;
            this.erreur = null;
            
            this.api = axios.create({
                baseURL : 'https://demo.legalyspace.com/LYSLogique/api/',
                withCredentials : true,
                headers : {        
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            this.api.post(
                `https://demo.legalyspace.com/LYSLogique/api/auth/signin`, {
                    userName: this.username,
                    password: this.password
                }
            ).then(response => {
                console.log(response.data);
                localStorage.setItem('NavigSession', JSON.stringify((response.data.NavigSession)));
                signInWithEmailAndPassword(auth, "mustafa.sak@outlook.fr", "testtest")
                            .then((/*userCredential*/) => {
                                this.loading = false;
                                // Signed in 
                                // const user = userCredential.user;
                                // console.log(user);
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                if (response.data.erreur === true) {
                    this.loading = false;
                    this.erreur = response.data.erreurMessage;
                }
            })
            .catch((error) => {
                console.error(error);
            })
        },
        parseJwt (token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            return JSON.parse(jsonPayload);
        },
        getValue(event) {
            if (event.name == 'username') {
                this.username = event.value;
            } else {
                this.password = event.value;
            }
        }
    },
    mounted() {
         signOut(auth).then(() => {
                localStorage.removeItem('NavigSession');
            }).catch((error) => {
                console.error(error);
            });
    }
}
</script>

<style>
.login-form {
    padding: 2em 0 0;
}
</style>