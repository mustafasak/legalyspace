<template>
    <div class="layout__columns">
        <div class="layout__column">
            <div class="title__breadcrumbs">
                <h1 class="title__primary">Connexion</h1>
            </div>
            <p class="text__body">Renseignez vos identifiants pour vous connecter à votre espace légale, LegalySpace.</p>
        </div>
        <div class="layout__column">
            <form class="form"
                  @submit.stop.prevent="submit"
                  action="/login"
                  method="post"
                  novalidate="true">
                <div class="form__group">
                    <div class="form__labels">
                        <label class="form__label"
                            for="email">Adresse e-mail</label>
                    </div>
                    <input class="form__input form__input-text"
                            type="username"
                            placeholder="Exemple : legalyspace@mail.com"
                            name="username"
                            v-model="username"
                            autocomplete="username"
                            id="username" />
                </div>
                <div class="form__group">
                    <div class="form__labels">
                        <label class="form__label"
                                for="current-password">Mot de passe</label>
                        <a class="link">Réinitialiser mon mot de passe</a>
                    </div>
                    <input class="form__input form__input-password"
                            type="password"
                            placeholder="Exemple : JDiehf8344hd"
                            name="password"
                            v-model="password"
                            autocomplete="password"
                            id="password" />
                </div>
                <div class="form__button layout__flex">
                    <button class="button button-submit"
                            type="submit">Suivant</button>
                </div>
            </form>
            <p class="text__body">Vous n'avez pas encore de compte ? <a class="link" @click="redirect">Inscription</a></p>
        </div>
    </div>
</template>


<script>
import router from '../router';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import axios from 'axios';


const auth = getAuth();

export default {
    name: 'Login',
    data() {
        return {
            username: "",
            password: ""
        }
    },
    methods: {
        submit: function () {
            let config = {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
                }
            }

            let data = {
                userName: this.username,
                password: this.password
            }
            axios.post(
                `https://demo.legalyspace.com/LYSLogique/api/auth/signin`,
                data,
                config
            ).then(response => {
                console.log(response);
                signInWithEmailAndPassword(auth, "mustafa.sak@outlook.fr", "testtest")
                    .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log(user);
                })
                .catch((error) => {
                    console.error(error);
                });
            })
            .catch(e => {
                    this.errors.push(e)
            })
        },
        redirect: function () {
            router.push({
                path: '/register',
                query: { step: 1 }
            })
        }
    },
    mounted() {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                console.log(uid);
                
                router.push({
                    path: '/documents'
                })

                // ...
            } else {
                // User is signed out
                // ...
            }
        });
    }
}
</script>

<style>
.login-form {
    padding: 2em 0 0;
}
</style>