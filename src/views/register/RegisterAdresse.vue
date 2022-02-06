<template>
    <div class="register-adresse">
        <div class="title__breadcrumbs">
            <h1 class="title__primary">Inscription</h1>
            <div class="title__icon">
                <img class="header__breadcrumbs"
                    src="@/assets/breadcrumbs.png"
                    alt="Logo LegalySpace" />
            </div>
            <div class="title__secondary">Mon adresse</div>
        </div>
        <p class="text__body">Nous allons activer votre compte ensemble, cela ne prendra que quelques secondes. Commencez par renseignez votre e-mail personnel et créez un nouveau mot de passe.</p>
        <form class="form"
              action="/register"
              method="post"
              novalidate="true">
            <div class="form__group">
                <label class="form__label"
                        for="address">Votre adresse postale</label>
                <input class="form__input"
                        type="address"
                        placeholder="Exemple: 28 rue buhan, 33 000, Bordeaux"
                        name="address"
                        v-model="address"
                        id="address" />
            </div>
        </form>
        <div class="form__buttons form__buttons-double layout__flex">
            <button class="button button-prev"
                    type="Button"
                    @click="prev">Précédent</button>
            <button class="button button-submit"
                    type="submit"
                    @click.stop.prevent="next">Suivant</button>
        </div>
    </div>
    
</template>

<script>
export default {
    name: 'RegisterAdresse',
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