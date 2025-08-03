
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


let sign_in_btn = document.getElementById('sign-in-btn');
let new_register_btn = document.getElementById('new-register-btn');
let forgot_pass_btn = document.getElementById('forgot-pass-btn');

sign_in_btn.addEventListener('click', (e) => {
    let input_email = document.getElementById('input-email').value;
    let input_pass = document.getElementById('input-password').value;
    if (input_email === "" && input_pass === "") {
        alert("All fields are requiered!");
        return;
    }
    firebase.auth().signInWithEmailAndPassword(input_email, input_pass).then( function () {
        window.location.assign('index.html');
    });
});

new_register_btn.addEventListener('click', (e) => {
    window.location.assign('signup.html');
});

forgot_pass_btn.addEventListener('click', (e) => {
    window.location.assign('resetpass.html');
});