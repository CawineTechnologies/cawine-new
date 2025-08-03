
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

let fileName = "";
let progress = 0;
let selectedImgUri = "";
let next_btn = document.getElementById('next-btn');
let progressbar = document.querySelector('.progressbar');

function enableProgressbar() {
    progressbar.setAttribute("role", "progressbar");
    progressbar.setAttribute("aria-valuenow", 0);
    progressbar.setAttribute("aria-live", "polite");
}

enableProgressbar();

function updateProgress(progress) {
    progressbar.setAttribute("aria-valuenow", progress);
    progressbar.style.setProperty("--progress", progress + "%");
}

$('#legal-doc-btn').click(function () {
    $('#input-file-url').trigger('click');
});

$("#input-file-url").on("change", function (event) {
    if (!(/\.(pdf)$/i).test(event.target.files[0].name)) {
        window.alert('File not suppoted, upload pdf files only!');
        return;
    }
    selectedImgUri = event.target.files[0];
    fileName = selectedImgUri.name;
    document.getElementById('legal-doc-btn').value = "Selected (1)";
});

next_btn.addEventListener('click', (e) => {
    saveData();
});

function saveData() {
    let email = localStorage.getItem("email");
    let password = localStorage.getItem("password");
    let promo_code = localStorage.getItem('promo_code');
    let check_terms = document.getElementById('check-terms');
    let busy_name = document.getElementById('input-business-name').value;
    let category = document.getElementById('business-category').value;
    let currency = document.getElementById('business-currency').value;
    let deliveryFee = document.getElementById('input-delivery-fee').value;
    let merchCode = document.getElementById('input-merch-code').value;
    if (busy_name === "" || deliveryFee === "" || fileName === "" || check_terms.checked === false || merchCode === "") {
        alert("All fields are requiered!");
        return;
    }

    next_btn.style.display = "none";

    firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {
        let user = firebase.auth().currentUser;
        if (user) {
            var userId = user.uid;
            let storageRef = firebase.storage().ref("legal_docs/" + userId + fileName);
            let uploadTask = storageRef.put(selectedImgUri);

            uploadTask.on("state_changed", (snapshot) => {
                console.log(snapshot);
                progress = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                progressbar.setAttribute("aria-busy", "true");
                updateProgress(progress);
                console.log(progress);
                console.log(userId);
            }, (error) => {
                console.log("Error is: " + error.message);
            }, () => {
                uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                    console.log("ImageLink: " + url);
                    imgdownloadUrl = url;
                    var map = {
                        legalDocUrl: imgdownloadUrl,
                        currency: currency,
                        name: busy_name,
                        category: category,
                        deliveryFee: deliveryFee,
                        email: email,
                        userID: userId,
                        freeDelivery: "No",
                        hasProducts: false,
                        statu: "Offline",
                        likes: 0,
                        merchantCode: merchCode,
                    }
                    db.collection(colValue).doc(userId).set(map).then(function (e) {
                        if (promo_code != "") {
                            db.collection("Referrals").get().then(function (snapshot) {
                                snapshot.forEach((it) => {
                                    let promoRef = it.data().referralCode;
                                    let status = it.data().status;
                                    if (promoRef === promo_code) {
                                        let reward = it.data().reward + 1000;
                                        let map = {
                                            reward: reward,
                                        }
                                        db.collection("Referrals").doc(it.data().vendorID)
                                            .update(map).then(function (e) {
                                                var map = {
                                                    name: busy_name,
                                                    email: email,
                                                    userID: userId,
                                                }
                                                db.collection("Referrals").doc(it.data().vendorID).collection('Vendors')
                                                    .doc(userId).set(map).then(function () {
                                                        progressbar.setAttribute("aria-busy", "false");
                                                        localStorage.setItem("user_id", userId);
                                                        window.location.assign('addresscity.html');
                                                    });
                                            });
                                    }
                                });
                            });
                        } else {
                            progressbar.setAttribute("aria-busy", "false");
                            localStorage.setItem("user_id", userId);
                            window.location.assign('addresscity.html');
                        }
                    });
                });
            });
        } else {
            alert("Something went wrong, try again later!");
            next_btn.value = "Retry";
            next_btn.style.display = "block";
            progress = 0;
            updateProgress(progress);
            progressbar.setAttribute("aria-busy", "false");
        }
    });
}

// saveData();