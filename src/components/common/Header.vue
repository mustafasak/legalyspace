<template>
    <div class="header">
        <div class="banner" v-if="deferredPrompt">
            <p>Installer la nouvelle application de legalyspace pour faciliter l'accès à vos documents !</p>
            <template>
            <button class="link" @click="dismiss">Dismiss</button>
            <button class="button button-submit" @click="install">Install</button>
            </template>
        </div>
        <router-link to="/">
            <img class="header__logo"
                src="@/assets/logo.svg"
                alt="Logo LegalySpace" />
        </router-link>
        <div id="header__navigation">
            <router-link class="link" to="/login">Connexion</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Header',
        data() {
            return {
                deferredPrompt: null
            };
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
        },
        methods: {
            async dismiss() {
                this.deferredPrompt = null;
            },
            async install() {
                this.deferredPrompt.prompt();
            }
        }
    }
</script>

<style>
    .header {
        background: white;
        box-shadow: 0 0px 14px 0 rgb(0 0 0 / 10%);
        position: sticky;
        top: 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        padding: 1em 1.5em;
        border-radius: 0 0 12px 12px;
    }

    @media screen and (min-width: 768px) {
        .header {
            padding: 1em 10%;
        }
    }

    .header__logo {
        width: 150px;
    }
</style>
