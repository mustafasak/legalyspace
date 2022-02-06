<template>
    <div class="register-account">
        <div class="title__breadcrumbs">
        <h1 class="title__primary">Inscription</h1>
        <div class="title__icon">
            <img class="header__breadcrumbs"
                src="@/assets/breadcrumbs.png"
                alt="Logo LegalySpace" />
        </div>
        <div class="title__secondary">Mon compte</div>
        </div>
        <p class="text__body">Nous allons créer votre espace légale ensemble, commencez par renseignez votre e-mail personnel et créez un nouveau mot de passe.</p>
        <form class="form"
              action="/register"
              method="post"
              novalidate="true">
            <div class="form__group">
                <label class="form__label"
                        for="email">Votre e-mail personnel</label>
                <input class="form__input"
                        type="email"
                        placeholder="Exemple: prenom@mail.com"
                        name="email"
                        v-model="email"
                        required="required"
                        id="email" />
            </div>
            <div class="form__group">
                <label class="form__label"
                        for="new-password">Nouveau mot de passe</label>
                <input class="form__input"
                        type="password"
                        placeholder="6 charactères minimum"
                        name="new-password"
                        v-model="password"
                        autocomplete="new-password"
                        required="required"
                        id="new-password" />
            </div>
            <div class="form__group">
                <label class="form__label"
                        for="new-password">Confirmer le nouveau mot de passe</label>
                <input class="form__input"
                        type="password"
                        placeholder="6 charactères minimum"
                        name="new-password"
                        v-model="confirmPassword"
                        autocomplete="new-password"
                        required="required"
                        id="new-password" />
            </div>
            <div class="form__buttons form__buttons-double layout__flex">
                <button class="button button-prev"
                        type="button"
                        @click="prev"
                        disabled>Précédent</button>
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
            confirmPassword: ""
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