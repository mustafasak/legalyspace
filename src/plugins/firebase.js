import firebaseConfig from "../config/firebase";
import firebase from "firebase/compat/app";
import "firebase/database";
import { getToken } from "firebase/messaging";
import { getMessaging } from "firebase/messaging/sw";
import Vue from "vue";

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.database;
const messaging = getMessaging(firebaseApp);

Vue.prototype.$db = db;

getToken(messaging, { vapidKey: 'BN9bpGyskPt346ZCQVKJI2upTsn8jVMLsef7kB2H-9IkZEwY0piGjSBQoZWOG-ZuNWcNptGoID0Zom8Ei1RNbn4' }).then((currentToken) => {
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
    

export default firebaseApp;