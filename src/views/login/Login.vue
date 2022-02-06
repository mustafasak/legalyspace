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
                        for="email">Adresse e-mail</label>
                <input class="form__input"
                        type="username"
                        placeholder="Exemple : legalyspace@mail.com"
                        name="username"
                        v-model="username"
                        autocomplete="username"
                        id="username" />
            </div>
            <div class="form__group">
                <div class="form__group-actions">
                    <label class="form__label"
                            for="current-password">Mot de passe</label>
                    <a class="link">Réinitialiser mon mot de passe</a>
                </div>
                <input class="form__input"
                        type="password"
                        placeholder="Exemple : JDiehf8344hd"
                        name="current-password"
                        v-model="password"
                        autocomplete="current-password"
                        id="current-password" />
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
            username: "",
            password: ""
        }
    },
    methods: {
        submit: function () {
            router.push({
            path: '/register',
            query: { step: 1 }
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