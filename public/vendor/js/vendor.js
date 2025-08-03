
var firebaseConfig = {
    apiKey: "AIzaSyByGzJ_xF3kMCK1JQvEUWvJeBaB-NQkmno",
    authDomain: "cawine-736ac.firebaseapp.com",
    databaseURL: "https://cawine-736ac-default-rtdb.firebaseio.com",
    projectId: "cawine-736ac",
    storageBucket: "cawine-736ac.appspot.com",
    messagingSenderId: "643248682742",
    appId: "1:643248682742:web:c2ae192bf3cfbfe818ded7",
    measurementId: "G-2HEXE80L51"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.auth.Auth.Persistence.LOCAL;
let db = firebase.firestore();