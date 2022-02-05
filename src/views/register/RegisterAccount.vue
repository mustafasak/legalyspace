<template>
    <div class="login-form">
        <div class="register__breadcrumbs">
        <h1 class="title__primary">Inscription</h1>
        <div class="title__icon"></div>
        <div class="title__secondary">Mon compte</div>
        </div>
        <p class="text__body">Nous allons activer votre compte ensemble, cela ne prendra que quelques secondes. Commencez par renseignez votre e-mail personnel et créez un nouveau mot de passe.</p>
        <form class="form"
              action="/register"
              method="post"
              novalidate="true">
            <div class="form__group">
                <label class="form__label"
                        for="email">Votre e-mail personnel</label>
                <input class="form__input"
                        type="email"
                        placeholder="exemple: prenom@mail.com"
                        name="email"
                        v-model="email"
                        id="email" />
            </div>
            <div class="form__group">
                <label class="form__label"
                        for="password">Nouveau mot de passe</label>
                <input class="form__input"
                        type="password"
                        placeholder="6 charactères minimum"
                        name="password"
                        v-model="password"
                        id="password" />
            </div>
                        <div class="form__group">
                <label class="form__label"
                        for="password">Confirmer le nouveau mot de passe</label>
                <input class="form__input"
                        type="password"
                        placeholder="6 charactères minimum"
                        name="password"
                        v-model="password"
                        id="password" />
            </div>
            <div class="form__buttons form__buttons-double layout__flex">
                <button class="button button-prev"
                        type="Button"
                        @click="prev"
                        :disabled="goback ? '' : disabled">Précédent</button>
                <button class="button button-submit"
                        type="submit"
                        @click.stop.prevent="next">Suivant</button>
            </div>
        </form>
    </div>
</template>


<script>
export default {
    name: 'Login',
    data() {
        return {
            email: "",
            password: "",
            goback: false
        }
    },
    methods: {
        next: function () {
            this.$emit('form', 'next');
        },
        prev: function () {
            this.$emit('form', 'prev')
        }
    }
}
</script>