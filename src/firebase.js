import firebase from 'firebase';
import * as firebaseui from 'firebaseui'

const firebaseConfig = {
    apiKey: "AIzaSyCKTMDYgXATkKCMxxYZJuH22e36BOE2OsQ",
    authDomain: "todo-authentication-react.firebaseapp.com",
    projectId: "todo-authentication-react",
    storageBucket: "todo-authentication-react.appspot.com",
    messagingSenderId: "589088212389",
    appId: "1:589088212389:web:19ec8df13a656d097ed44c",
    measurementId: "G-T9Y03VTMH9"
  };

firebase.initializeApp(firebaseConfig);

var userid = firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const useruid = user.uid;
    console.log(useruid)
    return useruid
    // ...
  } else {
    console.log(user.uid)
  }
});

export const auth = firebase.auth();
export const authUI = new firebaseui.auth.AuthUI(auth);
export var uid = userid;