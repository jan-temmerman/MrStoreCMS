import * as firebase from 'firebase'

let firebaseConfig = {
    apiKey: "AIzaSyCIEi_QxG_hGVRD05ajobZqE69l8dz6TeE",
    authDomain: "storecms-ff5f8.firebaseapp.com",
    databaseURL: "https://storecms-ff5f8.firebaseio.com",
    projectId: "storecms-ff5f8",
    storageBucket: "storecms-ff5f8.appspot.com",
    messagingSenderId: "173022818895",
    appId: "1:173022818895:web:260f56148454cdebddb03a"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig)
const db = firebase.database()

export default db