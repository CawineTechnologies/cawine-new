// // Hard-coded, replace with your public key
// const publicVapidKey = 'BAp7KPCJL9kBLvEpnD6WDPq-kpzi1IjuNVPgYQfwI6OHXy_A2tkKa8bXvudF6kg-x89r0OGz-Q4IS-dzb2ZbEdM';

// if ('serviceWorker' in navigator) {
//   console.log('Registering service worker');

//   run().catch(error => console.error(error));
// }

// async function run() {
//   console.log('Registering service worker');
//   const registration = await navigator.serviceWorker.
//     register('/worker.js', {scope: '/'});
//   console.log('Registered service worker');

//   console.log('Registering push');
//   const subscription = await registration.pushManager.
//     subscribe({
//       userVisibleOnly: true,
//       // The `urlBase64ToUint8Array()` function is the same as in
//       // https://www.npmjs.com/package/web-push#using-vapid-key-for-applicationserverkey
//       applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
//     });
//   console.log('Registered push');

//   console.log('Sending push');
//   await fetch('/subscribe', {
//     method: 'POST',
//     body: JSON.stringify(subscription),
//     headers: {
//       'content-type': 'application/json'
//     }
//   });
//   console.log('Sent push');
// }

// navigator.serviceWorker.register('worker.js')
// .then(function(registration) {
//   console.log('Service worker successfully registered.');
// })
// .catch(function(error) {
//   console.log('Service worker registration failed:', error);
// });
// alert("Thanks");

// var firebaseConfig = {
//     apiKey: "AIzaSyByGzJ_xF3kMCK1JQvEUWvJeBaB-NQkmno",
//     authDomain: "cawine-736ac.firebaseapp.com",
//     databaseURL: "https://cawine-736ac-default-rtdb.firebaseio.com",
//     projectId: "cawine-736ac",
//     storageBucket: "cawine-736ac.appspot.com",
//     messagingSenderId: "643248682742",
//     appId: "1:643248682742:web:c2ae192bf3cfbfe818ded7",
//     measurementId: "G-2HEXE80L51"
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// firebase.auth.Auth.Persistence.LOCAL;
const m = firebase.messaging();

const app_key = "AAAAlcSb9vY:APA91bGE34UoQh-v0wqSkG1H43c9xinfrNW3nvq6TqkfGYHoQ_t6UVpQJP7JK1ga5eNLr2Y40Wg90qvUFikwyeLrDzoYtWDLNBV9j9UU_EgFSe4w7LsWwc89EOy_s4SHqbkorW8dPL0a";
console.log(app_key);
firebase.auth().onAuthStateChanged(function (user) {
    if (user != null) {
        alert("Authenticated")
        console.log("Authenticated");
    } else {
        console.log('Ignored');
    }
    
});
function sendTokenToDB(uid) {
    console.log("Thanks");
    console.log('current token for client: ', currentToken);
    m.getToken({
        vapidKey: app_key
    }).then((currentToken) => {
        if (currentToken) {
            console.log('current token for client: ', currentToken);
            // Track the token -> client mapping, by sending to backend server
            // show on the UI that permission is secured
            // ... add you logic to send token to server
        }
    }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        // catch error while creating client token
    });
}

let showNotification = () => {

    new Notification("Cawine", { 
        body: "Discover the greatest moment with cawine",
        icon: 'images/img-11.jpg'
    });
    console.log('Hello!')
}

function requestAndShowPermission() {

    Promise.resolve(Notification.requestPermission()).then(function(permission) {
        showNotification();
    });
}

requestAndShowPermission();