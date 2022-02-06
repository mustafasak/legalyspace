<template>
    <div class="register-sign">
        <div class="title__breadcrumbs">
            <h1 class="title__primary">Inscription</h1>
            <div class="title__icon">
                <img class="header__breadcrumbs"
                    src="@/assets/breadcrumbs.png"
                    alt="Logo LegalySpace" />
            </div>
            <div class="title__secondary">Signature de la convention</div>
        </div>
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
    name: 'RegisterSign',
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