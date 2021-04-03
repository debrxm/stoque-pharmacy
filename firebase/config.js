import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDYQozbjTxM-4mBgyTXZzs4KilYr40TeVw",
  authDomain: "stoque-pharmacy.firebaseapp.com",
  projectId: "stoque-pharmacy",
  storageBucket: "stoque-pharmacy.appspot.com",
  messagingSenderId: "297460588813",
  appId: "1:297460588813:web:08032071f039c860811044",
  measurementId: "G-CENSWL0JRM",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}
// firebase.firestore().enablePersistence();

export const auth = firebase.auth();
export const firestore = firebase.firestore();
firestore.enableNetwork();
export default firebase;
