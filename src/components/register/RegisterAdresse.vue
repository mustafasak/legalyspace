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
                <div class="title__secondary">Mon adresse</div>
            </div>
            <p class="text__body">Veuillez indiquer votre adresse postale, elles sera utilisée pour vous contacter.</p>
        </div>
        <div class="layout__column">
            <form class="form"
                action="/register"
                method="post"
                novalidate="true">
                <div class="form__group">
                    <div class="form__labels">
                        <label class="form__label"
                                for="address">Votre adresse postale</label>
                    </div>
                    <input class="form__input form__input-text"
                           type="address"
                           placeholder="Exemple: 28 rue buhan, 33 000, Bordeaux"
                           name="address"
                           v-model="address"
                           id="address"
                           ref="origin"/>
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
//import {loadedGoogleMapsAPI} from '@/main'

export default {
    name: 'RegisterAdresse',
    data() {
        return {
            address: ""
        }
    },
    watch: {
        loadedGoogleMapsAPI: function() {}
    },
    methods: {
        initMap: function() {

        },
        next: function () {
            this.$emit('form', 'next');
        },
        prev: function () {
            this.$emit('form', 'prev')
        }
    },
    mounted() {
    //     loadedGoogleMapsAPI.then(()=> {
    //         new google.maps.places.Autocomplete(this.$refs["origin"]);
    //    });
    },
}
</script>