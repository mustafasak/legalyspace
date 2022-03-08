<template>
    <div class="header">
        <div class="banner" v-if="deferredPrompt">
            <p class="text__body">Installer la nouvelle application de legalyspace pour faciliter l'accès à vos documents !</p>
            <div class="banner__link">
                <a class="link link-filled" @click="install">Installer</a>
                <a class="link" @click="dismiss">Non, merci</a>
            </div>
        </div>
        <div class="header__inner">
            <router-link to="/">
                <img class="header__logo"
                    src="@/assets/logo.svg"
                    alt="Logo LegalySpace" />
            </router-link>
            <!-- <div id="header__navigation">
                <router-link class="link" to="/login">Connexion</router-link>
            </div> -->
        </div>
        <Menu v-if="showMenu"/>
    </div>
</template>

<script>
import Menu from '../common/Menu.vue';

export default {
    name: 'Header',
    components: {
        Menu
    },
    props: {
        menu: Boolean
    },
    data() {
        return {
            deferredPrompt: null
        }
    },
    computed: {
        showMenu() {
            return this.menu
        }
    },
    methods: {
        async dismiss() {
            this.deferredPrompt = null;
        },
        async install() {
            this.deferredPrompt.prompt();
        }
    },
    created() {
        window.addEventListener("beforeinstallprompt", e => {
            e.preventDefault();
            // Stash the event so it can be triggered later.
            this.deferredPrompt = e;
        });
        window.addEventListener("appinstalled", () => {
            this.deferredPrompt = null;
        });
    }
}
</script>

<style>
    .header {
        background: white;
        box-shadow: 0 0px 14px 0 rgb(0 0 0 / 10%);
        position: sticky;
        top: 0;
        padding: 1em 0;
        border-radius: 0 0 12px 12px;
        z-index: 4;
    }

    @media screen and (min-width: 768px) {
        .header {
            padding: 1em 10%;
        }
    }

    .header__logo {
        width: 124px;
    }

    .header__inner {
        display: flex;
        justify-content: center;
        padding: 0 1.5em;
    }

    .banner {
        display: flex;
        padding: 1em 1.5em;
        flex-wrap: wrap;
        justify-content: space-between;
        align-content: stretch;
    }

    .banner__link {
        width: 20%;
        align-self: stretch;
        justify-content: space-between;
        display: flex;
        flex-wrap: wrap;
    }

    .banner  .text__body {
        padding-bottom: 1em;
        width: 80%;
    }
</style>
