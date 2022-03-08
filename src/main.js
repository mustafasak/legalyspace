import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router';
import './registerServiceWorker'
import Lottie from "vue-lottie";
import VueFriendlyIframe from 'vue-friendly-iframe';

Vue.config.productionTip = false;
Vue.use(VueFriendlyIframe);
Vue.component("lottie", Lottie);
Vue.use(VueRouter);

export const loadedGoogleMapsAPI = new Promise( (resolve) => {
  window['GoogleMapsInit'] = resolve;
  let GMap = document.createElement('script');
  GMap.setAttribute('src',
 `https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyA4iwiUROFOpoO_MAqUQppf9GTPNIDSiQA&callback=GoogleMapsInit`);
  document.body.appendChild(GMap); 
});


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
