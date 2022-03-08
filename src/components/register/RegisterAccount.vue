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
                <div class="title__secondary">Mon compte</div>
            </div>
            <p class="text__body">Nous allons créer votre espace légale ensemble, renseignez votre e-mail personnel et créez un nouveau mot de passe.</p>
        </div>
        <div class="layout__column">
            <form class="form"
                action="/register"
                method="post"
                novalidate="true">
                <div class="form__group">
                    <div class="form__labels">
                        <label class="form__label"
                                for="email">Votre email personnel</label>
                    </div>
                    <input class="form__input form__input-text"
                            type="email"
                            placeholder="Exemple: prenom@mail.com"
                            name="email"
                            v-model="email"
                            required="required"
                            autocomplete="username"
                            id="email"
                            :disabled="autocomplete ? true : false"/>
                </div>
                <div class="form__group">
                    <div class="form__labels">
                        <label class="form__label"
                                for="new-password">Nouveau mot de passe</label>
                    </div>
                    <input class="form__input form__input-password"
                            :type="typePassword ? 'password' : 'text'"
                            placeholder="6 charactères minimum"
                            name="new-password"
                            v-model="password"
                            autocomplete="new-password"
                            required="required"
                            id="new-password"/>

                        <span @click="showPassword('password')">Afficher le mot de passe</span>
                </div>
                <div class="form__group">
                    <div class="form__labels">
                        <label class="form__label"
                                for="confirm-password">Confirmer le nouveau mot de passe</label>
                    </div>
                    <input class="form__input form__input-password"
                            :type="typePasswordConfirm ? 'password' : 'text'"
                            placeholder="6 charactères minimum"
                            name="new-password"
                            v-model="passwordConfirm"
                            autocomplete="new-password"
                            required="required"
                            id="confirm-password" />
                    <span @click="showPassword('passwordConfirm')">
                        <img class="input__icon"
                             src="@/assets/icons/eye-off-outline.png"
                             alt="show password" />
                    </span>
                </div>
            </form>
            <div class="form__buttons form__buttons-double layout__flex">
                <button class="button button-prev"
                        type="button"
                        @click.stop.prevent="previous"
                        disabled="disabled">Précédent</button>
                <button class="button button-submit"
                        type="submit"
                        @click.stop.prevent="next">Suivant</button>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: 'RegisterAccount',
    props: {
        user: null
    },
    data() {
        return {
            autocomplete: false,
            email: '',
            password: '',
            passwordConfirm: '',
            typePassword: true,
            typePasswordConfirm: true,
            displayPassword: false
        }
    },
    methods: {
        next() {
            this.$emit('form', {
                action: 'next',
                form: 'account',
                password: this.password,
                passwordConfirm: this.passwordConfirm
            });
        },
        previous() {
            this.$emit('form', {
                action: 'previous'
            })
        },
        showPassword(item) {
            if(item == "password") {
                this.typePassword = !this.typePassword;
            } else {
                this.typePasswordConfirm = !this.typePasswordConfirm;
            }
        },
        completeForm() {
            if (this.user !== null) {
                this.autocomplete = true;
                if (this.user['mail'] !== null) {
                    this.email = this.user['mail'];
                }
                if (this.user['password'] !== null ) {
                    this.password = this.user['password'];
                }
                if (this.user['passwordConfirm'] !== null) {
                    this.passwordConfirm = this.user['passwordConfirm'];
                }
            }
        }
    },
    mounted() {
        this.completeForm();
    }
}
</script>