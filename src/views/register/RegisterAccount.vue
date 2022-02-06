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
                        @click="prev">Précédent</button>
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
            password: ""
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