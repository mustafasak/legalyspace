<template>
  <div id="app">
    <Header v-show="webview" :menu="application"/>
    <main>
      <router-view />
    </main>
    <Footer v-show="webview"/>
  </div>
</template>

<script>
import Header from '@/components/common/Header.vue';
import Footer from '@/components/common/Footer.vue';
import router from './router';
import 'reset-css';
import axios from 'axios';

// Firebase Services
import './plugins/firebase';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      api: null
    }
  },
  computed: {
    webview() {
      if (this.$route.path == '/') {
        return false;
      } else {
        return true;
      }
    },
    application() {
      if (this.$route.path == '/login' || this.$route.path == '/register' || this.$route.path == '/sign') {
        return false;
      } else {
        return true;
      }
    }
  },
  watch: {
    $route() {}
  },
  mounted() {
    this.api = axios.create({
        baseURL : 'https://demo.legalyspace.com/LYSLogique/api/',
        withCredentials : true,
        headers : {        
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            //const uid = user.uid;
            //console.log(uid);
            if (localStorage.getItem('NavigSession') !== undefined) {
              this.api.get(`https://demo.legalyspace.com/LYSLogique/api/userState`, {
                        headers: {
                            'Authorization': JSON.parse(localStorage.getItem('NavigSession'))
                        }
                    }).then((response) => {
                        if (response.data.hasConventionASigner === true) {
                            console.log("NEED_CONVENTION_SIGN");
                            router.push({
                              path: '/sign'
                          })
                        }  else {
                          router.push({
                              path: '/documents'
                          })
                        }
                    });
            }
            // ...
        } else {
          router.push({
              path: '/login'
          })
        }
    });
  }
}
</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;900&display=swap');

* {
  box-sizing: border-box;
}

#app {
  font-family: Poppins, Helvetica, Arial, sans-serif;
  letter-spacing: 0.75 px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 100%;
  color: var(--grayscale-body);
  --grayscale-offblack: #1A1B1D;
  --grayscale-ash: #1A1B1D;
  --grayscale-body: #484848;
  --grayscale-placeholder: #717171;
  --grayscale-input: #E4E4E4;
  --grayscale-background: #d7d7d7;
  --primary-default: #FF5000;
  --primary-background: #FF500020;
  --success-default: #00C637;
  --success-light: #EAF9DE;
  --error-default: #E8505B;
  --error-light: #FFECED;
  --text-submit: white;
  --text-link: var(--primary-default);
}

.layout__main {
  padding: 0 1.5em;
}

.layout__wrapper {
  display: flex;
}

.layout__webview {
  height: 100vh;
  padding: 0;
}

.layout__flex {
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  flex-wrap: nowrap;
}

.layout__fixed {
  position: fixed;
  width: 100%;
}

.title__primary {
  font-size: 1.25em;
  font-weight: bold;
  color: var(--grayscale-offblack);
  padding: 0.5em 1em 0.5em 0;
}

.title__secondary {
  font-size: 1.25em;
  font-weight: normal;
  color: var(--grayscale-ash);
  padding: 0.5em 0 0.5em 1em;
}

.title__breadcrumbs {
  display: flex;
  padding: 1.5em 0 1em 0;
  align-items: flex-start;
}

.title__icon {
  display: block;
  padding: 0.75em 0;
}

.text__body {
  line-height: 1.5em;
  font-size: 1em;
  padding: 0 0 2em 0;
}

.text__body-error {
    padding: 1em 1.5em;
    background: var(--error-light);
    border-radius: 12px;
    color: var(--error-default);
}

.text__body-nomargin {
  padding: 0 0 4px 0;
}

.text__body-bold {
  font-weight: 600;
  color: var(--grayscale-ash);
}

.link {
  font-family: Poppins, Helvetica, Arial, sans-serif;
  text-decoration: none;
  color: var(--grayscale-body);
  font-weight: 400;
  display: inline-block;
  cursor: pointer;
  transition: all 0.1s linear;
}

.link:hover {
  color: var(--primary-default);
  transition: all 0.1s linear;
}

.link:hover:after {
  background: var(--primary-default);
  transition: all 0.1s linear;
}

.link:after {
  content: '';
  display: block;
  width: 100%;
  height: 1px;
  background: var(--grayscale-background);
}

.link-filled {
  color: var(--primary-default);
}

.form {
  padding: 1em 0 0;
}

.form__group {
  margin: 0 0 1.5em 0;
}

.form__group-radio {
  display: flex;
}

.form__buttons {
  padding: 1.5em 0;
  display: flex;
  justify-content: space-between;
}

.form__button {
  padding: 1.5em 0;
  transition: all 0.3s ease-in-out;
}

.button:disabled {
  opacity: 0.5;
}

.form__buttons.layout__fixed {
  background: white;
  box-shadow: 0 0px 14px 0 rgb(0 0 0 / 10%);
  display: flex;
  bottom: 0;
  left: 0;
  padding: 1.5em 1.5em 2em 1.5em;
  border-radius: 12px 12px 0 0;
}

.form__labels {
  padding-bottom: 0.875em;
  display: flex;
  justify-content: space-between;
}

.form__label {
  font-weight: 500;
  font-size: 1em;
  color: var(--grayscale-ash);
  display: block;
  cursor: pointer;
}

.form__label-radio {
  display: inline;
  padding: 0 0 0 0.5em;
  font-weight: normal;
  color: var(--grayscale-placeholder);
}

.form__input {
  width: 100%;
  background: var(--grayscale-input);
  border: 1px solid var(--grayscale-background);
}

.form__radio {
  display: flex;
  align-items: center;
}


.form__radio:first-child {
  margin-right: 2em;
}

.form__input-text,
.form__input-password  {
  border-radius: 0.75em;
  padding: 1.25em 1.5em;
  font-weight: 400;
  font-size: 0.875em;
  margin: 0;
  display: block;
}

.form__input-radio {
  width: 2em;
  height: 2em;
  margin: 0;
}

.form__input-text::placeholder,
.form__input-password::placeholder  {
  font-family: Poppins, Helvetica, Arial, sans-serif;
  font-weight: 400;
} 

.form__input-radio:checked + .form__label-radio  {
  color: var(--grayscale-ash);
  font-weight: 500;
}


.form__input-text:not(:placeholder-shown),
.form__input-password:not(:placeholder-shown) {
  background: white;
}


.input {
  position: relative;
}

.input__inner {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  padding: 10px 1em;
}

.input__icon {
  cursor: pointer;
  display: block;
  margin: 4px 0 4px 1em;
}

.form__buttons-double .button:first-child {
  margin-right: 8px;
}
.form__buttons-double .button:last-child {
  margin-left: 8px;
}

.button {
  font-weight: 600;
  border-radius: 0.875em;
  border: 0;
  width: 100%;
  padding: 1em 2em; 
  font-size: 1em;
  cursor: pointer;
  text-align: center;
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}

.button-prev {
  border: 0;
  background: var(--grayscale-input);
  color: var(--grayscale-ash);
}

.button-submit {
  background: var(--primary-default);
  color: var(--text-submit);
}
.button__spinner {
  animation: rotate 2s linear infinite;
  z-index: 2;
  margin: 0 0 0 16px;
  width: 18px;
  height: 18px;
}

.button__spinner .path {
  stroke: white;
  stroke-linecap: round;
  animation: dash 1.5s ease-in-out infinite;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}


@media screen and (min-width: 768px) {
  .layout__main {
    padding: 1em 30%;
  }
}
</style>
