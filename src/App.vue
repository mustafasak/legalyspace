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
  --grayscale-input: #f7f7f7;
  --grayscale-background: #d7d7d7;
  --primary-default: #FF5000;
  --success-default: #00C637;
  --text-submit: white;
  --text-link: var(--primary-default);
}

.layout__main {
  padding: 0 1.5em;
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

.text__body-nomargin {
  padding: 0 0 4px 0;
}

.text__body-bold {
  font-weight: 600;
  color: var(--grayscale-ash);
}

.link {
  font-family: Roboto, Helvetica, Arial, sans-serif;
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
  font-family: Roboto, Helvetica, Arial, sans-serif;
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
  font-size: 0.75em;
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
  font-family: Roboto, Helvetica, Arial, sans-serif;
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

@media screen and (min-width: 768px) {
  .layout__main {
    padding: 1em 30%;
  }
}
</style>
