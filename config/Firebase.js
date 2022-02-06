// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyArh51d354uUYIjxW8Dg3Ncvhyj-FlaJ8Q",
    authDomain: "hackathon-7692e.firebaseapp.com",
    projectId: "hackathon-7692e",
    storageBucket: "hackathon-7692e.appspot.com",
    messagingSenderId: "149500994700",
    appId: "1:149500994700:web:868849f81d4772280a87a9",
    // measurementId: "G-HG43F0K96N"
};
let app;

if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig)
} else {
    app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();


export { db, auth };
