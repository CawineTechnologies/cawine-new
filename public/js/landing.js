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


let navbar = document.getElementById('landing-nav-bar');

window.onscroll = function () {
    if (window.scrollY > 600) {
        navbar.style.display = "flex";
    } else {
        navbar.style.display = "none";
    }
}

let initLocation = () => {
    let user_location = localStorage.getItem("user_location");
    if (user_location != null && user_location != "") {
        document.getElementById('landing-location').innerHTML = user_location;
        console.log(user_location);
    } else {
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
                        document.getElementById('landing-location').innerHTML = placeName;
                    }).catch(error => console.error('Error: ', error));
            });
        }
    }
}

initLocation();

let openMaps = () => {
    localStorage.setItem("bundle", "landing");
    window.location.assign("places.html");
}

let openLogin = () => {
    window.location.assign("login.html");
}

let openRegister = () => {
    window.location.assign("register.html");
}

let openClab = () => {
    let vendorId = "vIvr0QCBFfPXUhLcP4DRHsWs4jZ2";
    localStorage.setItem("vendor_id", vendorId);
    window.location.assign("demo.html");
}

let openRoof = () => {
    let vendorId = "kc2ddjgVT0efzPaVFUZkbwKQM6h1";
    localStorage.setItem("vendor_id", vendorId);
    window.location.assign("demo.html");
}

let openWise = () => {
    let vendorId = "iu6NGAQdmvRZChAPj6nsIKIjZh52";
    localStorage.setItem("vendor_id", vendorId);
    window.location.assign("demo.html");
}

let openEandD = () => {
    let vendorId = "mgEzfpeos7VIe2cx0v6Qkav8KQL2";
    localStorage.setItem("vendor_id", vendorId);
    window.location.assign("demo.html");
}

let openVendorApp = () => {
    window.location.assign("https://play.google.com/store/apps/details?id=com.supriminnovations.cawin");
}

let opencourierApp = () => {
    window.location.assign("https://play.google.com/store/apps/details?id=com.supriminnovations.cawinecourier");
}

let openUser = () => {
    window.location.assign("https://play.google.com/store/apps/details?id=com.supriminnovations.cawineuser");
}
// socials
let openTwiter = () => {
    window.location.assign("https://twitter.com/cawineapp?t=8TQ3fcp1xOhoSzvXXdLowA&s=08");
}

let openFacebook = () => {
    window.location.assign("https://www.facebook.com/cawineapp?mibextid=ZbWKwL");
}

let openIntagram = () => {
    window.location.assign("https://instagram.com/cawineapp?igshid=MzNlNGNkZWQ4Mg==");
}

let openLinkedin = () => {
    window.location.assign("https://www.linkedin.com/company/cawine/");
}

let openTiktok = () => {
    window.location.assign("https://www.tiktok.com/@cawineapp?_t=8cv3lTKFGgn&_r=1");
}

let openYutube = () => {
    window.location.assign("https://youtube.com/@cawineapp");
}

let openPinterest = () => {
    window.location.assign("https://pin.it/2VcvDek");
}
