import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBM-3LnyzhmtIa0M7QBe_AD6zRI0-J-LHA",
  authDomain: "stoque-e9406.firebaseapp.com",
  databaseURL: "https://stoque-e9406-default-rtdb.firebaseio.com",
  projectId: "stoque-e9406",
  storageBucket: "stoque-e9406.appspot.com",
  messagingSenderId: "527643201111",
  appId: "1:527643201111:web:d3ffe7d74033cba91e5d12",
  measurementId: "G-68F8L78JHN",
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
