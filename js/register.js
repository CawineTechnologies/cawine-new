let auth = firebase.auth();

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
                if (it.data() != null && it.data().fName != null) {
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
                                                    window.location.assign("completeregistration.html");
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
            plugin_name: 'Cawine App'
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
    },
        function (error) {
            console.log(JSON.stringify(error, undefined, 2));
        }
    );
}

function showPassword() {
    var x = document.getElementById("pass-word");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}