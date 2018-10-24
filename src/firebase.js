import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";



var config = {
    apiKey: "AIzaSyDR_p3qPRBmlefsuML55UntKBc_fEWBkN8",
    authDomain: "react-slace-clone.firebaseapp.com",
    databaseURL: "https://react-slace-clone.firebaseio.com",
    projectId: "react-slace-clone",
    storageBucket: "react-slace-clone.appspot.com",
    messagingSenderId: "468076575741"
  };
  firebase.initializeApp(config);


  export default firebase;