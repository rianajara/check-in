import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyD7y-S22zh7i7LPgt_-dNaOOQw0XNbPswY",
  authDomain: "axiom-5d1f5.firebaseapp.com",
  projectId: "axiom-5d1f5",
  storageBucket: "axiom-5d1f5.appspot.com",
  messagingSenderId: "87699306441",
  appId: "1:87699306441:web:f53a38c538d6a66bfc5a18",
  measurementId: "G-NPPPX903Q2"
};

// Initialize Firebase
let Firebase = firebase.initializeApp(firebaseConfig)
//const admin = require('firebase-admin');

export default Firebase
