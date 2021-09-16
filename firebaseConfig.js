// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import  "firebase/compat/auth";
import  "firebase/compat/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIfWIrmwvfSgj-TCPISa2tulhJlgslGVs",
  authDomain: "whatsapp-clone-3f534.firebaseapp.com",
  projectId: "whatsapp-clone-3f534",
  storageBucket: "whatsapp-clone-3f534.appspot.com",
  messagingSenderId: "546751565873",
  appId: "1:546751565873:web:b7275487ca752bfcbf4510"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();	
const auth = firebase.auth();	
const provider = new firebase.auth.GoogleAuthProvider();	


export { auth, provider, db };	
