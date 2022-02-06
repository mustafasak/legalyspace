<template>
  <div id="app">
    <Header />
    <main class="layout__main">
      <router-view/>
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/common/Header.vue';
import Footer from '@/components/common/Footer.vue';

import 'reset-css';

export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap');
* {
  box-sizing: border-box;
}

#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 100%;
  color: var(--grayscale-body);
  --grayscale-ash: #1A1B1D;
  --grayscale-body: #484848;
  --grayscale-placeholder: #A7A7A7;
  --grayscale-input: #E4E4E4;
  --grayscale-background: #F7F7F7;
  --primary-default: #FF5000;
  --success-default: #00C637;
  --text-submit: white;
}

.layout__main {
  padding: 0 1.5em 0;
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
  color: var(--grayscale-ash);
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
  padding: 1.5em 0 2em 0;
  align-items: flex-start;
}

.title__icon {
  display: block;
  padding: 0.75em 0;
}

.text__body {
  line-height: 1.5em;
  font-size: 0.875em;
  padding: 0 0 1em 0;
}

.text__body-nomargin {
  padding: 0 0 4px 0;
}

.text__body-bold {
  font-weight: 600;
  color: var(--grayscale-ash);
}

.link {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  text-decoration: underline;
  color: var(--grayscale-ash);
  font-weight: 600;
}

.form {
  padding: 1em 0 0;
}

.form__group {
  padding: 0 0 1.5em 0;
}

.form__group-radio {
  display: flex;
}

.form__radio {
  display: flex;
  align-items: center;
}

.form__radio:first-child {
  margin-right: 2em;
}

.form__buttons {
  padding: 1.5em 0;
}

.form__button {
  padding: 0 0 1.5em 0;
}

.form__buttons.layout__fixed {
  background: white;
  box-shadow: 0 0px 14px 0 rgb(0 0 0 / 10%);
  display: flex;
  bottom: 0;
  left: 0;
  padding: 1em 1.5em;
}

.form__label {
  font-weight: 500;
  font-size: 0.875em;
  color: var(--grayscale-ash);
  padding: 0.75em 0;
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
  font-family: Roboto, Helvetica, Arial, sans-serif;
  width: 100%;
  background: var(--grayscale-input);
  border: 1px solid var(--grayscale-background);
  border-radius: 0.75em;
  padding: 1em 1.5em;
  font-weight: 500;
  font-size: 0.875em;
}

.form__input-radio {
  width: inherit;
  margin: 0;
}

.form__input-radio:checked + .form__label-radio  {
  color: var(--grayscale-ash);
  font-weight: 500;
}

.form__input::placeholder {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  font-weight: normal;
  font-size: 0.875em;
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
  padding: 0.875em 2em; 
  font-size: 0.875em;
  cursor: pointer;
  text-align: center;
}

.button-prev {
  border: 1px solid var(--grayscale-input);
}

.button-submit {
  background: var(--primary-default);
  color: var(--text-submit);
}

</style>
