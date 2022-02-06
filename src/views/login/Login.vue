<template>
    <div class="login-form">
        <div class="register__breadcrumbs">
        <h1 class="title__primary">Connexion</h1>
        </div>
        <p class="text__body">Renseignez vos identifiants pour vous connecter à votre espace légale, LegalySpace.</p>
        <form class="form"
              @submit.stop.prevent="submit"
              action="/register"
              method="post"
              novalidate="true">
            <div class="form__group">
                <label class="form__label"
                        for="email">Identifiant ou e-mail</label>
                <input class="form__input"
                        type="email"
                        placeholder="Exemple : legalyspace0324"
                        name="email"
                        v-model="email"
                        id="email" />
            </div>
            <div class="form__group">
                <div class="form__group-actions">
                    <label class="form__label"
                            for="password">Mot de passe</label>
                    <a class="link">Réinitialiser mon mot de passe</a>
                </div>
                <input class="form__input"
                        type="password"
                        placeholder="Exemple : JDiehf8344hd"
                        name="password"
                        v-model="password"
                        id="password" />
            </div>
            <!-- <p class="text__body">Vous avez oublié votre mot de passe ?
                <a class="link">Réinitialiser mon mot de passe</a></p> -->
            <div class="form__button layout__flex">
                <button class="button button-submit"
                        type="submit">Suivant</button>
            </div>
        </form>

        <p class="text__body">Vous n'avez pas encore de compte ? <a class="link" @click="redirect">Inscription</a></p>
    </div>
</template>


<script>
import router from '../../router';

export default {
    name: 'Login',
    data() {
        return {
            email: "",
            password: ""
        }
    },
    methods: {
        submit: function () {
            router.push({
            path: '/register',
            query: { step: 2 }
          })
        },
        redirect: function () {
            router.push({
            path: '/register',
            query: { step: 1 }
          })
        }
    }
}
</script>

<style>
.login-form {
    padding: 2em 0 0;
}
</style>