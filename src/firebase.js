import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
//get user email
// import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBuI4OqPipVbIhiDMflFMyq7dKEFGLQ6cA",
    authDomain: "navigdata-e7716.firebaseapp.com",
    projectId: "navigdata-e7716",
    storageBucket: "navigdata-e7716.appspot.com",
    messagingSenderId: "589120091159",
    appId: "1:589120091159:web:61a22bc2f14ba0dad0d852"
  };
  

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();


export const serverStamp = firebase.firestore.Timestamp;
export default db;