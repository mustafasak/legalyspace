import firebaseConfig from "../config/firebase";
import { initializeApp } from 'firebase/app';
// import { getMessaging, getToken } from "firebase/messaging";
// import { getFirestore } from "firebase/firestore";

const app = initializeApp(firebaseConfig);
// const messaging = getMessaging(app);
// const db = getFirestore(app);

// getToken(
//   messaging, {
//   vapidKey: "BN9bpGyskPt346ZCQVKJI2upTsn8jVMLsef7kB2H-9IkZEwY0piGjSBQoZWOG-ZuNWcNptGoID0Zom8Ei1RNbn4"
//   }).then((currentToken) => {
//     if (currentToken) {
//       // Send the token to your server and update the UI if necessary
//       // ...
//       console.log(currentToken);
//     } else {
//       // Show permission request UI
//       console.log('No registration token available. Request permission to generate one.');
//       // ...
//     }
//   }).catch((err) => {
//     console.log('An error occurred while retrieving token. ', err);
//     // ...
// });

export default app;
//  {
//   app,
//   messaging,
//   db
// };