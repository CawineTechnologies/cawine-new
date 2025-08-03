// alert("Thanks");
// const admin = require("firebase-admin");
// import getAccessToken from "../../../cawine/src/App";

let deliverTo = "";
let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.close-cart');
let openCheckOut = document.querySelector('.closeShopping');
let closeCheckOut = document.querySelector('.close-check-out');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

// getAccessToken();
// alert(admin);

let userId = "";

const m = firebase.messaging();
const app_key = "AAAAlcSb9vY:APA91bGE34UoQh-v0wqSkG1H43c9xinfrNW3nvq6TqkfGYHoQ_t6UVpQJP7JK1ga5eNLr2Y40Wg90qvUFikwyeLrDzoYtWDLNBV9j9UU_EgFSe4w7LsWwc89EOy_s4SHqbkorW8dPL0a";
console.log(app_key);
firebase.auth().onAuthStateChanged(function (user) {
    if (user != null) {
        console.log("Authenticated");
    } else {
        console.log('Ignored');
    }
    
});
function sendTokenToDB(uid) {
    
    m.getToken({
        vapidKey: app_key
    }).then((currentToken) => {
        // console.log("Thanks");
        if (currentToken) {
            
            var database = firebase.database();
            database.ref().child("Devices").child(uid).set({
                device_token: currentToken
            }).then (() => {
                console.log('New token for client: ', currentToken);
                console.log('done');
            });
            // Track the token -> client mapping, by sending to backend server
            // show on the UI that permission is secured
            // ... add you logic to send token to server
        }
    }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        // catch error while creating client token
    });
}

firebase.auth().onAuthStateChanged(function (user) {
    if (!user) {
        window.location.href = "landing.html";
    } else {
        
        let alertMe = "Thank you!";
        localStorage.setItem('alert', alertMe);
        userId = user.uid;
        sendTokenToDB(userId);
        var db = firebase.firestore();
        db.collection("Users").doc(userId).get()
            .then(function (doc) {
                deliverTo = doc.data().deliverTo;
                document.getElementById('logo-title').innerHTML = deliverTo;
                var API_KEY_CAWINE = "AIzaSyByGzJ_xF3kMCK1JQvEUWvJeBaB-NQkmno";
                var query = `https://www.google.com/maps/embed/v1/place?key=${API_KEY_CAWINE}&q=${doc.data().lat},${doc.data().lng}`;
                var mapFrame = "<iframe id='map-panel' src='" + query + "'" + "width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>";
                document.getElementById('maps-container').innerHTML = mapFrame;
                if (doc.data().displayName != null) {
                    document.getElementById('prof-name').innerHTML = doc.data().displayName;
                }
                if (doc.data().profilePic != null) {
                    document.getElementById('prof-pic').src = doc.data().profilePic;
                }
                document.getElementById('prof-pic').addEventListener('click', (e) => {
                    window.location.href = "completeregistration.html";
                })
            });

            db.collection("Users").doc(userId).get().then(function(it) {
                if (it.data() != null) {
                    db.collection('Vendor Locations').get().then(function (snapshot) {
                        snapshot.forEach((doc) => {
                            console.log(doc.data().geoPoint.latitude);
                            console.log(doc.data().vendor.vendorID);

                            let requestOptions = {
                                method: 'GET',
                            };
        
                            fetch(`https://api.geoapify.com/v1/routing?waypoints=${it.data().lat}%2C${it.data().lng}%7C${doc.data().geoPoint.latitude}%2C${doc.data().geoPoint.longitude}&mode=drive&apiKey=423dccfcd18849cf8b6bc202bed91e62`, requestOptions)
                                .then(response => response.json())
                                .then(result => {
                                    meters = result.features[0].properties.distance
                                    // meters = meters.charAt(0);
                                    // console.log(meters);
        
                                    db.collection('Vendors').doc(doc.data().vendor.vendorID).get().then(function (it) {
                                        if (it.data() != null) {
                                            let map = {
                                                eta: meters,
                                                name: (it.data().name != null ? it.data().name : "Vendor"),
                                                addressCity: it.data().addressCity,
                                                addressStreet: it.data().addressStreet,
                                                allowDelivery: it.data().allowDelivery,
                                                approved: (it.data().approved != null ? it.data().approved : null),
                                                category: it.data().category,
                                                countryCode: it.data().countryCode,
                                                currency: it.data().currency,
                                                deliveryFee: it.data().deliveryFee,
                                                email: it.data().email,
                                                freeDelivery: it.data().freeDelivery,
                                                fullPhoneNumber: it.data().fullPhoneNumber,
                                                hasProducts: (it.data().hasProducts != null ? it.data().hasProducts : null),
                                                legalDocUrl: it.data().legalDocUrl,
                                                logo: (it.data().logo != null ? it.data().logo : null),
                                                phoneNumber: it.data().phoneNumber,
                                                place: it.data().place,
                                                likes: (it.data().likes != null ? it.data().likes : 0),
                                                poster: (it.data().poster != null ? it.data().poster : null),
                                                profit: (it.data().profit != null ? it.data().profit : 0),
                                                rating: (it.data().rating != null ? it.data().rating : "0.0"),
                                                reviews: (it.data().reviews != null ? it.data().reviews : "0"),
                                                sales: (it.data().sales != null ? it.data().sales : "0"),
                                                status: (it.data().status != null ? it.data().status : "Offline"),
                                                value: (it.data().value != null ? it.data().value : "0"),
                                                vendorID: it.data().vendorID,
                                                platiform: "web"
                                            }
        
                                            db.collection("Users").doc(userId)
                                                .collection('Nearest Vendors').doc(doc.data().vendor.vendorID).set(map);
                                        }
                                    });
        
                                })
                                .catch(error => console.log('error', error)
                                );
                        });
                    });
                }
            });
            
    }
});

sendTokenToDB(userId)

document.getElementById('open-maps').addEventListener('click', (e) => {
    localStorage.setItem("deliver_to", deliverTo);
    localStorage.setItem("bundle", "home");
    window.location.assign("places.html");
});
document.getElementById('main-menu-btn').addEventListener('click', (e) => {
    body.classList.add('menu');
    document.getElementById('menu-close-btn').style.display = "block";
});
document.getElementById('menu-close-btn').addEventListener('click', (e) => {
    body.classList.remove('menu');
});
document.getElementById('side-nav-home-btn').addEventListener('click', (e) => {
    body.classList.remove('menu');
    window.location.assign("home.html");
});
document.getElementById('side-nav-order-history-btn').addEventListener('click', (e) => {
    window.location.assign("orderhistory.html");
});
document.getElementById('menu-about-btn').addEventListener('click', (e) => {
    window.location.assign("about.html");
});
document.getElementById('menu-earn-btn').addEventListener('click', (e) => {
    window.location.assign("earn.html");
});
document.getElementById('menu-terms-btn').addEventListener('click', (e) => {
    window.location.assign("terms.html");
});
document.getElementById('menu-privacy-btn').addEventListener('click', (e) => {
    window.location.assign("privacy.html");
});
document.getElementById('menu-logout-btn').addEventListener('click', (e) => {
    logout();
});
function testConsts() {
    window.location.assign("offers.html");
}