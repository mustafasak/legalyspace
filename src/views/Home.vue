<template>
  <div class="layout__webview">
    <!-- <iframe id="iframe"
            src="https://wwww.legalyspace.com/"
            width="100%"
            height="100%"
            frameborder="0">
    </iframe> -->
    <vue-friendly-iframe className="iframe"
                         src="https://demo.legalyspace.com/"
                         crossorigin="use-credentials"
                         @load="onLoad">
    </vue-friendly-iframe>
  </div>
</template>

<script>
import router from '../router';

export default {
  name: 'Home',
  methods: {
    onLoad() {
      window.addEventListener('message', function(message) {
        if(message.origin === 'https://demo.legalyspace.com' && message.data === 'TRY_TO_LOGIN') {
            router.push({
                path: '/login'
            })
        }
      }, false);
    }
  }
}
</script>

<style>
.iframe {
  width: 100%;
  height: 100vh;
  border: 0;
}
</style>
