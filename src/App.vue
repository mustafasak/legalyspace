<template>
  <div id="app">
    <Header />
    <main class="app__layout">
      <router-view/>
    </main>
  </div>
</template>

<script>
import Header from '@/components/common/Header.vue';
import 'reset-css';

export default {
  name: 'App',
  components: {
    Header
  }
}
</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap');

#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 100%;
  --grayscale-ash: #1A1B1D;
  --grayscale-body: #484848;
  --grayscale-input: #E4E4E4;
  --success-default: #00C637;
  color: var(--grayscale-body);
}

.title__primary {
  font-size: 1.25em;
  font-weight: bold;
  color: var(--grayscale-ash);
  padding: 0 2em 0 0;
}

.title__secondary {
  font-size: 1.25em;
  font-weight: normal;
  color: var(--grayscale-ash);
}

.text__body {
  line-height: 1.5em;
}

.app__layout {
  padding: 0 32px 0;
}

.form {
  padding: 32px 0;
}

.form__label {
  font-weight: 500;
  font-size: 0.875em;
  color: var(--grayscale-ash);
  padding: 0.75em 0;
  display: block;
}

.form__input {
  width: 100%;
}
</style>
