<template>
    <div class="register-informations">
        <div class="title__breadcrumbs">
            <h1 class="title__primary">Inscription</h1>
            <div class="title__icon">
                <img class="header__breadcrumbs"
                    src="@/assets/breadcrumbs.png"
                    alt="Logo LegalySpace" />
            </div>
            <div class="title__secondary">Mes informations</div>
        </div>
        <p class="text__body">Veuillez renseignez vos informations personnelles légales, elles seront utilisées pour tous vos documents légaux.</p>
        <form class="form"
              action="/register"
              method="post"
              novalidate="true">

            <label class="form__label">Votre sex</label>
            <div class="form__group form__group-radio">
                <div class="form__radio">
                    <input class="form__input form__input-radio"
                        type="radio"
                        id="man"
                        name="sex"
                        value="man"
                        v-model="sex">
                    <label class="form__label form__label-radio"
                           for="man">Homme</label>
                </div>
                <div class="form__radio">
                    <input class="form__input form__input-radio"
                        type="radio"
                        id="woman"
                        name="sex"
                        value="woman"
                        v-model="sex">
                    <label for="woman"
                            class="form__label form__label-radio">Femme</label>
                </div>
            </div>
            <div class="form__group">
                <label class="form__label"
                        for="lastname">Votre nom</label>
                <input class="form__input"
                        type="text"
                        placeholder="Exemple: Dupond"
                        name="lastname"
                        v-model="lastname"
                        id="lastname" />
            </div>
            <div class="form__group">
                <label class="form__label"
                        for="firstname">Votre prénom</label>
                <input class="form__input"
                        type="text"
                        placeholder="Exemple: Arnaud"
                        name="firstname"
                        v-model="firstname"
                        id="firstname" />
            </div>
            <div class="form__group">
                <label class="form__label"
                        for="date">Votre date de naissance</label>
                <input class="form__input"
                        type="date"
                        placeholder="Exemple: 04/12/1993"
                        name="date"
                        v-model="date"
                        id="date" />
            </div>
            <div class="form__group">
                <label class="form__label"
                        for="city">Votre ville de naissance</label>
                <input class="form__input"
                        type="text"
                        placeholder="Exemple: Bordeaux"
                        name="city"
                        v-model="city"
                        id="city" />
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
    name: 'RegisterInformations',
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