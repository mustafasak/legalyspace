<template>
    <div class="login-form">
        <div class="register__breadcrumbs">
        <h1 class="title__primary">Connexion</h1>
        <div class="title__icon"></div>
        <div class="title__secondary"></div>
        </div>
        <p class="text__body">Renseignez vos identifiants pour vous connecter à votre espace légale, LegalySpace.</p>
        <form class="form"
              @click.stop.prevent="submit"
              action="/register"
              method="post"
              novalidate="true">
            <div class="form__group">
                <label class="form__label"
                        for="email">Identifiant ou e-mail</label>
                <input class="form__input"
                        type="email"
                        placeholder="exemple: abalone0324@legalyspace.com"
                        name="email"
                        v-model="email"
                        id="email" />
            </div>
            <div class="form__group">
                <label class="form__label"
                        for="password">Mot de passe</label>
                <input class="form__input"
                        type="password"
                        placeholder="exemple: JDiehf8344hd"
                        name="password"
                        v-model="password"
                        id="password" />
            </div>
            <div class="form__button layout__flex">
                <button class="button button-submit"
                        type="submit">Suivant</button>
            </div>
        </form>

        <p class="text__body">Vous n'avez pas encore de compte ? <a class="link">Inscription</a></p>
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
        }
    }
}
</script>