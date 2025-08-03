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

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        let userId = user.uid;
        db.collection(colValue).doc(userId).get().then(function (doc) {
            if (doc.data().name != null && doc.data().addressCity != null) {
                localStorage.setItem("user_id", userId);
                window.window.location.assign("selector.html", "_self");
            } else {
                localStorage.setItem("user_id", userId);
                window.window.location.assign("addresscity.html", "_self");
                console.log(userId);
            }
        });
    } else {
        window.open("welcome.html", "_self");
    }
});