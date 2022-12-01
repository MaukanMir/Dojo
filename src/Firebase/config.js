import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyD9KDcWqo0UIBKIwxRBgK09FF_CIs5d28U",
    authDomain: "thedojosite-8a597.firebaseapp.com",
    projectId: "thedojosite-8a597",
    storageBucket: "thedojosite-8a597.appspot.com",
    messagingSenderId: "767586283306",
    appId: "1:767586283306:web:848595984305a04f1bb853"
};

// init firebase
firebase.initializeApp(firebaseConfig);
// init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

//time stamp
const timestamp = firebase.firestore.Timestamp;

export {projectAuth, projectFirestore, timestamp, projectStorage};