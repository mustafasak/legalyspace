<template>
    <div class="header">
        <router-link to="/">
            <img class="header__logo"
                src="@/assets/logo.svg"
                alt="Logo LegalySpace" />
        </router-link>
        <div id="header__navigation">
            <router-link to="/register">Inscription</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Header'
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
        padding: 1em;
    }

    .header__logo {
        width: 150px;
    }
</style>
