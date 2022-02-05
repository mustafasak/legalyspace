<template>
  <div class="register">
    <Step :step="2"/>
    <div class="register__breadcrumbs">
      <h1 class="title__primary">Inscription</h1>
      <div class="title__icon"></div>
      <div class="title__secondary">Mon compte</div>
    </div>
    <p class="text__body">Veuillez indiquer un mot de passe pour créer votre compte sur l’espace légale LegalySpace. Ce sont les identifiants qui vous seront demandés pour vous connecter.</p>
    <form class="form" action="#">
      <div class="form__input">
          <label class="form__label"
                 for="email">Votre e-mail personnel</label>
          <input class="form__input"
                 type="texte"
                name="email"
                id="email" />
      </div>
    </form>
  </div>
</template>

<script>
import Step from '../components/register/Step.vue';

export default {
  name: 'Register',
  components: {
    Step
  }
}
</script>

<style>
  .register__breadcrumbs {
    display: flex;
    padding: 48px 0 32px 0;
  }
</style>