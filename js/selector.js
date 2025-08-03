
const m = firebase.messaging();

const app_key = "AAAAlcSb9vY:APA91bGE34UoQh-v0wqSkG1H43c9xinfrNW3nvq6TqkfGYHoQ_t6UVpQJP7JK1ga5eNLr2Y40Wg90qvUFikwyeLrDzoYtWDLNBV9j9UU_EgFSe4w7LsWwc89EOy_s4SHqbkorW8dPL0a";
console.log(app_key);

function sendTokenToDB(uid) {
    console.log("Thanks");
    m.getToken({
        vapidKey: app_key
    }).then((currentToken) => {
        if (currentToken) {
            var database = firebase.database();
            database.ref().child("Devices").child(uid).set({
                device_token: currentToken
            }).then(() => {
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
    if (user) {
        console.log(user.uid);
    }
});

let userId = localStorage.getItem("user_id");

let home = document.querySelector('.nav__link--home');
let orders = document.querySelector('.nav__link--orders');
let customers = document.querySelector('.nav__link--customers');
let profile = document.querySelector('.nav__link--profile');

let home_views_tab = document.querySelector('.nav__link__home');
let home_activity_tab = document.querySelector('.nav__link__book');

let home_sec = document.getElementById('home-sec');
let orders_sec = document.getElementById('orders-sec');
let customers_sec = document.getElementById('customers-sec');
let profile_sec = document.getElementById('profile-sec');

let views_sec = document.getElementById('views-sec');
let activity_sec = document.getElementById('activity-sec');

home.addEventListener('click', (e) => {
    home.classList.add('nav__link--home--active');
    orders.classList.remove('nav__link--orders--active');
    customers.classList.remove('nav__link--customers--active');
    profile.classList.remove('nav__link--profile--active');

    home_sec.style.display = "block";
    orders_sec.style.display = "none";
    customers_sec.style.display = "none";
    profile_sec.style.display = "none";
});

orders.addEventListener('click', (e) => {
    home.classList.remove('nav__link--home--active');
    orders.classList.add('nav__link--orders--active');
    customers.classList.remove('nav__link--customers--active');
    profile.classList.remove('nav__link--profile--active');

    home_sec.style.display = "none";
    orders_sec.style.display = "block";
    customers_sec.style.display = "none";
    profile_sec.style.display = "none";
});

customers.addEventListener('click', (e) => {
    home.classList.remove('nav__link--home--active');
    orders.classList.remove('nav__link--orders--active');
    customers.classList.add('nav__link--customers--active');
    profile.classList.remove('nav__link--profile--active');

    home_sec.style.display = "none";
    orders_sec.style.display = "none";
    customers_sec.style.display = "block";
    profile_sec.style.display = "none";
});

profile.addEventListener('click', (e) => {
    home.classList.remove('nav__link--home--active');
    orders.classList.remove('nav__link--orders--active');
    customers.classList.remove('nav__link--customers--active');
    profile.classList.add('nav__link--profile--active');

    home_sec.style.display = "none";
    orders_sec.style.display = "none";
    customers_sec.style.display = "none";
    profile_sec.style.display = "block";
});

home_views_tab.addEventListener('click', (e) => {
    home_views_tab.classList.add('nav__link--active');
    home_activity_tab.classList.remove('nav__link--active');

    views_sec.style.display = "block"
    activity_sec.style.display = "none";
});

home_activity_tab.addEventListener('click', (e) => {
    home_views_tab.classList.remove('nav__link--active');
    home_activity_tab.classList.add('nav__link--active');

    views_sec.style.display = "none"
    activity_sec.style.display = "block";
});

if (userId != "") {
    console.log(userId);
    sendTokenToDB(userId);
    db.collection(colValue).doc(userId).get().then(function (doc) {
        if (doc.data() != null) {
            document.getElementById('vendor-title').innerHTML = doc.data().name;
            document.getElementById('endor-place').innerHTML = doc.data().addressStreet + ", " + doc.data().addressCity;
            getViews(userId);

            if (doc.data().logo != null) {
                document.getElementById('add-logo').innerHTML = "Edit Logo"
            }
        }
    });
}

let getViews = (userId) => {
    let count = 0;
    let itemCount = 0;
    let wines = 0;
    let liqueurs = 0;
    let whiskey = 0;
    let vodkas = 0;
    let spirits = 0;
    let soft = 0;
    let gins = 0;
    let energy = 0;
    let beers = 0;
    db.collection("Order History").get().then((snapshot) => {
        snapshot.forEach((doc) => {
            let uid = doc.data().vendorID;
            if (uid === userId) {
                count++;
                itemCount += parseInt(doc.data().itemCount);
                let category = doc.data().category;
                console.log(category);
                if (category.includes("LIQUEUR") || category.includes("Liqueur")) {
                    liqueurs++;
                    // console.log(liqueurs);
                }
                if (category.includes("Wine")) {
                    wines++;
                }
                if (category.includes("WHISKEY")) {
                    whiskey++;
                }
                if (category.includes("VODKA")) {
                    vodkas++;
                }
            }
        });

        document.getElementById('activity-txt').innerHTML = count;
        document.getElementById('item-count-txt').innerHTML = itemCount;
        document.getElementById('liqueur-txt').innerHTML = liqueurs;
        document.getElementById('wine-txt').innerHTML = wines;
        document.getElementById('whiskey-txt').innerHTML = whiskey;
        document.getElementById('vodka-txt').innerHTML = vodkas;
        getActivity(userId);
    });
}

let getActivity = (userId) => {
    let count = 0;
    db.collection(colValue).doc(userId).collection("Views").get().then((snapshot) => {
        snapshot.forEach((doc) => {
            count++;
        });
        document.getElementById('views-txt').innerHTML = count;
        getLikes(userId);
    });
}

let getLikes = (userId) => {
    let count = 0;
    db.collection(colValue).doc(userId).collection("Liked").get().then((snapshot) => {
        snapshot.forEach((doc) => {
            count++;
        });
        document.getElementById('likes-txt').innerHTML = count;
        getRating(userId);
    });
}

let getRating = (userId) => {
    db.collection(colValue).doc(userId).get().then(function (it) {
        if (it.data() != null) {
            document.getElementById('rating-txt').innerHTML = it.data().rating;
            document.getElementById('reviews-txt').innerHTML = it.data().reviews + " Reviews";
            document.getElementById('value-txt').innerHTML = "UGX" + parseInt(it.data().value).toLocaleString();
            getShares(userId);
        }
    });
}

let getShares = (userId) => {
    let count = 0;
    db.collection(colValue).doc(userId).collection("Shared").get().then((snapshot) => {
        snapshot.forEach((doc) => {
            count++;
        });
        document.getElementById('shares-txt').innerHTML = count;
    });
}

const generateReferralCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let referralCode = '';
    for (let i = 0; i < 8; i++) {
        referralCode += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return referralCode;
};

const referralCode = generateReferralCode();
console.log("Referral code: " + referralCode);

document.querySelector('#shareBtn')
    .addEventListener('click', event => {

        // Fallback, Tries to use API only
        // if navigator.share function is
        // available
        if (navigator.share) {
            navigator.share({

                // Title that occurs over
                // web share dialog
                title: `Use this promo code: ${referralCode} to earn more`,

                // URL to share
                url: 'https://www.cawineapp.com/vendor/index.html'
            }).then(() => {
                const db = firebase.firestore();
                let map = {
                    referralCode: referralCode,
                    vendorID: userId,
                    reward: 0,
                    status: "pending"
                }
                db.collection("Referrals").doc(userId).set(map);
                console.log('Thanks for sharing!');
            }).catch(err => {

                // Handle errors, if occurred
                console.log(
                    "Error while using Web share API:");
                console.log(err);
            });
        } else {

            // Alerts user if API not available 
            alert("Browser doesn't support this API !");
        }
    });

document.getElementById('view-more').addEventListener('click', (e) => {
    home.classList.remove('nav__link--home--active');
    orders.classList.remove('nav__link--orders--active');
    customers.classList.remove('nav__link--customers--active');
    profile.classList.add('nav__link--profile--active');

    home_sec.style.display = "none";
    orders_sec.style.display = "none";
    customers_sec.style.display = "none";
    profile_sec.style.display = "block";
});

document.querySelector('#share-btn')
    .addEventListener('click', event => {

        // Fallback, Tries to use API only
        // if navigator.share function is
        // available
        if (navigator.share) {
            navigator.share({

                // Title that occurs over
                // web share dialog
                title: `Use this promo code: ${referralCode} to earn more`,

                // URL to share
                url: 'https://www.cawineapp.com/vendor/index.html'
            }).then(() => {
                const db = firebase.firestore();
                let map = {
                    referralCode: referralCode,
                    vendorID: userId,
                    reward: 0,
                    status: "pending"
                }
                db.collection("Referrals").doc(userId).set(map);
                console.log('Thanks for sharing!');
            }).catch(err => {

                // Handle errors, if occurred
                console.log(
                    "Error while using Web share API:");
                console.log(err);
            });
        } else {

            // Alerts user if API not available 
            alert("Browser doesn't support this API !");
        }
    });

$('#add-logo').click(function () {
    $('#img-uri').trigger('click');
});

$("#img-uri").on("change", function (event) {
    if (!(/\.(jpg)$/i).test(event.target.files[0].name)) {
        window.alert('File not suppoted, upload jpg files only!');
        return;
    }
    let selectedImgUri = event.target.files[0];
    let fileName = selectedImgUri.name;

    let storageRef = firebase.storage().ref("Vendors/" + userId + "/Images/" + fileName);
    let uploadTask = storageRef.put(selectedImgUri);

    uploadTask.on("state_changed", (snapshot) => {
        console.log(snapshot);
        console.log(userId);
    }, (error) => {
        console.log("Error is: " + error.message);
    }, () => {
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            console.log("ImageLink: " + url);
            let imgdownloadUrl = url;
            var map = {
                logo: imgdownloadUrl
            }
            db.collection(colValue).doc(userId).update(map).then(function (e) {
                alert('Logo updated successfully');
            });
        });
    });
});

document.getElementById('btn-create-ads').addEventListener('click', () => {
    window.location.assign("selproduct.html");
});

document.getElementById('add-offer-btn').addEventListener('click', () => {
    window.location.assign("addoffer.html");
})