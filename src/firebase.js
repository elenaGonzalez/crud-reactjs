import firebase from 'firebase/app';
import 'firebase/firestore';

// Your web app's Firebase configuration
 var firebaseConfig = {
   apiKey: "AIzaSyBygGYpTGhzloPjnz_l-aECJIi5lowKqJY",
   authDomain: "crud-reactjs-dc77e.firebaseapp.com",
   databaseURL: "https://crud-reactjs-dc77e.firebaseio.com",
   projectId: "crud-reactjs-dc77e",
   storageBucket: "crud-reactjs-dc77e.appspot.com",
   messagingSenderId: "798886216978",
   appId: "1:798886216978:web:b1358752cb2b952b0d5fcb"
 };
 // Initialize Firebase
 const fb = firebase.initializeApp(firebaseConfig);

 export const db = fb.firestore();
