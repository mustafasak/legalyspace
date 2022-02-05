<template>
	<div class="register">
    <Step :step="currentStep"/>
    <RegisterAccount @form="navigation"/>
  </div>
</template>

<script>
import router from '../../router';
import Step from '../../components/common/Step.vue';
import RegisterAccount from './RegisterAccount.vue';


export default {
  name: 'Register',
  components: {
    Step,
    RegisterAccount
  },
  data() {
    return {
      step: Number
    }
  },
  computed: {
    currentStep: function() {
      return parseInt(this.$route.query['step']) || 1;
    },
    nextStep: function() {
      return parseInt(this.$route.query['step']) + 1;
    },
    prevStep: function() {
      return parseInt(this.$route.query['step']) - 1;
    }
  },
  watch: {
    currentStep: function () {}
  },
  methods: {
    navigation: function(value) {
      if (value == "prev") {
        if (this.currentStep == 2 ) {
          router.push({
            path: '/login',
          })
        } else {
          router.push({
            path: '/register',
            query: { step: this.prevStep }
          })
        }
      } else {
        router.push({
          path: '/register',
          query: { step: this.nextStep }
        })
      }
    }
  },
  mounted() {}
}
</script>

<style>
  .register__breadcrumbs {
    display: flex;
    padding: 48px 0 32px 0;
  }
</style>