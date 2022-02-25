<template>
    <div class="layout__columns">
        <div class="layout__column">
            <div class="title__breadcrumbs">
                <h1 class="title__primary">Inscription</h1>
                <div class="title__icon">
                    <img class="header__breadcrumbs"
                        src="@/assets/breadcrumbs.png"
                        alt="Logo LegalySpace" />
                </div>
                <div class="title__secondary">Mes informations</div>
            </div>
            <p class="text__body">Veuillez renseignez vos informations personnelles, elles seront utilisées pour tous vos documents légaux.</p>
        </div>
        <div class="layout__column">
            <form class="form"
                action="/register"
                method="post"
                novalidate="true">
                <div class="form__labels">
                    <label class="form__label">Votre sex</label>
                </div>
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
                    <div class="form__labels">
                        <label class="form__label"
                                for="lastname">Votre nom</label>
                    </div>
                    <input class="form__input form__input-text"
                            type="text"
                            placeholder="Exemple : Dupond"
                            name="lastname"
                            v-model="lastname"
                            id="lastname" />
                </div>
                <div class="form__group">
                    <div class="form__labels">
                        <label class="form__label"
                                for="firstname">Votre prénom</label>
                    </div>
                    <input class="form__input form__input-text"
                            type="text"
                            placeholder="Exemple : Arnaud"
                            name="firstname"
                            v-model="firstname"
                            id="firstname" />
                </div>
                <div class="form__group">
                    <div class="form__labels">
                        <label class="form__label"
                                for="birthday">Votre date de naissance</label>
                    </div>
                    <input class="form__input form__input-text"
                            type="date"
                            placeholder="Exemple : 04/12/1993"
                            v-model="birthday"
                            name="birthday"
                            id="birthday"/>
                </div>
                <div class="form__group">
                    <div class="form__labels">
                        <label class="form__label"
                                for="birthcity">Votre ville de naissance</label>
                    </div>
                    <input class="form__input form__input-text"
                            type="text"
                            placeholder="Exemple : Bordeaux"
                            name="birthcity"
                            v-model="birthcity"
                            id="birthcity" />
                </div>
                            <div class="form__buttons form__buttons-double layout__flex">
                    <button class="button button-prev"
                            type="button"
                            @click="prev">Précédent</button>
                    <button class="button button-submit"
                            type="submit"
                            @click.stop.prevent="next">Suivant</button>
                </div>
            </form>
        </div>
    </div>
    
</template>

<script>
export default {
    name: 'RegisterInformations',
    props: {
        user: null
    },
    data() {
        return {
            sex: "",
            lastname: "",
            firstname: "",
            birthday: "",
            birthcity: "",
            type: "text"
        }
    },
    methods: {
        next: function () {
            let user = JSON.parse(localStorage.getItem('user'));
            user['nom'] = this.lastname;
            user['prenom'] = this.firstname;
            user['lieuNaissance'] = this.birthcity;
            user['dateNaissance'] = this.birthday;

            localStorage.setItem('user', JSON.stringify(user));
            this.$emit('form', 'next');
        },
        prev: function () {
            this.$emit('form', 'prev')
        }
    },
    created() {
        this.firstname = this.user['prenom'];
        this.lastname = this.user['nom'];
        this.birthcity = this.user['lieuNaissance'];
    }
}
</script>

<style scoped>
input[type="date"]
{
    display:block;
    -webkit-appearance: textfield;
    -moz-appearance: textfield;
    min-height: 1.2em;
}
input[type="date"]::before {
    content: ' '
}


</style>