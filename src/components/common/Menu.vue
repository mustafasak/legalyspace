<template>
    <div class="menu">
        <div class="menu__item"> 
            <router-link class="menu__link" to="/list">
                <img src="@/assets/icons/documents.png" />
                <div class="menu__label">Documents</div>
            </router-link>
        </div>
        <div class="menu__item">
            <router-link class="menu__link" to="/bulletins">
                <img src="@/assets/icons/bulletins.png" />
                <div class="menu__label">Bulletins</div>
            </router-link>
        </div>
        <div class="menu__item">
            <router-link class="menu__link" to="/activités">
                <img src="@/assets/icons/activites.png" />
                <div class="menu__label">Activités</div>
            </router-link>
        </div>
        <div class="menu__item">
            <router-link class="menu__link" to="/profil">
                <img src="@/assets/icons/profil.png" />
                <div class="menu__label">Profil</div>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Menu'
}
</script>

<style>
.menu {
    padding: 1em 1em 0 1em;
    display: flex;
    justify-content: space-around;
    text-align: center;
}

.menu__link {
    font-family: Roboto, Helvetica, Arial, sans-serif;
    text-decoration: none;
    color: var(--grayscale-body);
    font-weight: 400;
    display: inline-block;
    cursor: pointer;
    transition: all 0.1s linear;
}

.menu__link:hover {
    color: var(--primary-default);
    transition: all 0.1s linear;
}

.menu__label {
    font-size: 0.875em;
}
</style>
