

// Your web app's Firebase configuration
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
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        window.location.assign("home.html");
    }
});

// let googleUser = {};
let auth = firebase.auth();
let db = firebase.firestore();

let openRegister = () => {
    window.location.assign("register.html");
}

let openPrivacy = () => {
    window.location.assign("privacy.html");
}

let exit = () => {
    close();
}

let openPasswordReset = () => {
    window.location.assign("resetPassword.html");
}

let signInWithGoogle = () => {
    document.getElementById('loading').style.display = "flex";
    let googleProvider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(googleProvider).then((result) => {
        if (result) {
            const user = result.user;
            const uid = user.uid;
            const email = user.email;
            const name = user.displayName;
            const pic = user.photoURL;
            console.log(user);
            let db = firebase.firestore();
            db.collection("Users").doc(uid).get().then(function (it) {
                if (it.data() != null) {
                    console.log(it.data());
                    document.getElementById('loading').style.display = "none";
                    window.location.assign("home.html");
                } else {
                    console.log(user.uid);
                    let map = {
                        email: email,
                        displayName: name,
                        profilePic: pic,
                        userID: user.uid
                    }
                    db.collection("Users").doc(user.uid).set(map).then(function () {
                        var latitude = 0;
                        var longitude = 0;
                        if (navigator.geolocation) {
                            navigator.geolocation.getCurrentPosition(function (position) {
                                latitude = position.coords.latitude;
                                longitude = position.coords.longitude;
                                console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

                                var API_KEY_CAWINE = "AIzaSyByGzJ_xF3kMCK1JQvEUWvJeBaB-NQkmno";

                                fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY_CAWINE}`)
                                    .then(response => response.json())
                                    .then(data => {
                                        const placeName = data.results[0].formatted_address;
                                        console.log(placeName);
                                        var userId = user.uid;
                                        var map = {
                                            deliverTo: placeName,
                                            lat: `${latitude}`,
                                            lng: `${longitude}`
                                        }
                                        var db = firebase.firestore();
                                        db.collection("Users").doc(userId).get().then((it) => {
                                            if (it.data() != null && it.data().displayName != null) {
                                                db.collection("Users").doc(userId).update(map).then(function (e) {
                                                    document.getElementById('loading').style.display = "none";
                                                    window.location.assign("home.html");
                                                });
                                            }
                                        });
                                    }).catch((error) => {
                                        document.getElementById('loading').style.display = "none";
                                        console.error('Error: ', error)
                                    });
                            });
                        }
                    });

                }
            });
        }
    })
        .catch(error => {
            console.log(error);
        });
}

document.getElementById('customBtn').addEventListener('click', signInWithGoogle);

function myFunction() {
    
    var email = document.getElementById("user-name").value;
    var password = document.getElementById("pass-word").value;

    if (email != "" && password != "") {

        document.getElementById('loading').style.display = "flex";
        var result = firebase.auth().signInWithEmailAndPassword(email, password);
        result.then(function () {
            document.getElementById('loading').style.display = "none";
            window.location.assign('home.html');
        });
        result.catch(function (error) {

            document.getElementById('loading').style.display = "none";
            var errorMessage = error.message;
            window.alert("Error: " + "Something went wrong try again later!");

        });

    }
    else {
        window.alert("Please all fields are required!");
    }
};

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}

let renderApp = function () {
    gapi.load('auth2', function () {
        auth2 = gapi.auth2.init({
            client_id: '643248682742-fiic3c24brr1j360uqui6vr61tibkeju.apps.googleusercontent.com',
            cookiepolicy: 'single_host_origin',
            plugin_name: 'Cawine'
        });
        attachSignin(document.getElementById('customBtn')); //Function called  for click 
    });
}

function attachSignin(element) {
    console.log(element.id);
    auth2.attachClickHandler(element, {}, function (googleUser) {
        var profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        document.getElementById('user-name').value = profile.getEmail();
        // firebase.auth().createUserWithEmailAndPassword(profile.getEmail(), "123456")
        //     .then(function () {
        //         alert(`Login successfully\nEmail ID: ${profile.getEmail()}\nTemporary password: ${"123456"}\nYou can change it by tapping 'Forgot pasword'`);
        //         window.location.assign("home.html");
        //     });
        // db.collection("Users").get().then(function(snapshort) {
        //     snapshort.forEach((doc) => {
        //         let mail = doc.data().email;
        //         if (mail === profile.getEmail()) {
        //             document.getElementById('user-name').value = profile.getEmail();
        //         } else {
        //             firebase.auth().createUserWithEmailAndPassword(profile.getEmail(), "123456")
        //             .then(function() {
        //                 alert(`Login successfully\nEmail ID: ${profile.getEmail()}\nTemporary password: ${"123456"}\nYou can change it by tapping 'Forgot pasword'`);
        //                 window.location.assign("home.html");
        //             });
        //         }
        //     });
        // });
    },
        function (error) {
            console.log(JSON.stringify(error, undefined, 2));
        }
    );
}
