import firebaseConfig from "../config/firebase";
import firebase from "firebase/compat/app";
import "firebase/database";
import { getMessaging, getToken } from "firebase/messaging";
import Vue from "vue";

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.database;
const messaging = getMessaging();

Vue.prototype.$db = db;
if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("./service-worker.js")
      .then(function(registration) {
        console.log("Registration successful, scope is:", registration.scope);
        messaging.getToken({vapidKey: 'BN9bpGyskPt346ZCQVKJI2upTsn8jVMLsef7kB2H-9IkZEwY0piGjSBQoZWOG-ZuNWcNptGoID0Zom8Ei1RNbn4', serviceWorkerRegistration : registration })
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
    } else {
            
        getToken(
            messaging, {
                vapidKey: 'BN9bpGyskPt346ZCQVKJI2upTsn8jVMLsef7kB2H-9IkZEwY0piGjSBQoZWOG-ZuNWcNptGoID0Zom8Ei1RNbn4' 
            }).then((currentToken) => {
            if (currentToken) {
            // Send the token to your server and update the UI if necessary
            // ...
            } else {
            // Show permission request UI
            console.log('No registration token available. Request permission to generate one.');
            // ...
            }
        }).catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
            // ...
        });
    }

    

export default firebaseApp;