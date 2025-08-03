
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

let delivery_status = "";
let db = firebase.firestore();
let userId = localStorage.getItem("user_id");
let next_btn = document.getElementById('next-btn');
let check_deliver = document.getElementById("radio-deliver");
let check_no_deliver = document.getElementById('radio-no-deliver');

// alert("UID: "+ userId);
check_deliver.addEventListener('change', function () {
    if (this.checked) {
        delivery_status = "Yes";
        console.log(delivery_status);
    }
});
check_no_deliver.addEventListener('change', function () {
    if (this.checked) {
        delivery_status = "No";
        console.log(delivery_status);
    }
});

next_btn.addEventListener('click', (e) => {
    console.log("UID: " + userId);
    if (delivery_status === "") {
        alert("Select an option that your business apply to");
        return;
    }

    let address_val = localStorage.getItem("address");
    let city_value = localStorage.getItem("city");

    var map = {
        status: delivery_status,
        addressStreet: address_val,
        addressCity: city_value,
        allowDelivery: (check_deliver.checked === true ? "Yes" : "No")
    }
    db.collection(colValue).doc(userId).update(map).then(function () {
        window.location.assign('selector.html');
    });
});