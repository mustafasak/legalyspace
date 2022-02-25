import firebaseConfig from "../config/firebase";
import firebase from "firebase/compat/app";
import "firebase/database";
import { getMessaging, getToken } from "firebase/messaging";
import Vue from "vue";

const firebaseApp = firebase.initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);
const db = firebaseApp.database;

getToken(messaging, { vapidKey: "BN9bpGyskPt346ZCQVKJI2upTsn8jVMLsef7kB2H-9IkZEwY0piGjSBQoZWOG-ZuNWcNptGoID0Zom8Ei1RNbn4" });

Vue.prototype.$db = db;
export default firebaseApp;