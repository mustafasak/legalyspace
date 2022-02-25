/* eslint-disable no-console */

import { register } from 'register-service-worker'

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready () {
      console.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
      )
    },
    registered () {
      console.log('Service worker has been registered.')
    },
    cached () {
      console.log('Content has been cached for offline use.')
    },
    updatefound () {
      console.log('New content is downloading.')
    },
    updated () {
      console.log('New content is available; please refresh.')
    },
    offline () {
      console.log('No internet connection found. App is running in offline mode.')
    },
    error (error) {
      console.error('Error during service worker registration:', error)
    }
  })
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./firebase-messaging-sw.js")
    .then(function(registration) {
      console.log("Registration successful, scope is:", registration.scope);
      messaging.getToken({vapidKey: 'YOUR_VAPID_KEY', serviceWorkerRegistration : registration })
        .then((currentToken) => {
          if (currentToken) {
            console.log('current token for client: ', currentToken);
  
            // Track the token -> client mapping, by sending to backend server
            // show on the UI that permission is secured
          } else {
            console.log('No registration token available. Request permission to generate one.');
  
            // shows on the UI that permission is required 
          }
        }).catch((err) => {
          console.log('An error occurred while retrieving token. ', err);
          // catch error while creating client token
        });  
      })
      .catch(function(err) {
        console.log("Service worker registration failed, error:"  , err );
    }); 
  }