
let navbar = document.getElementById('profile-header-sec');
let profile_title = document.getElementById('profile-header-title');

window.onscroll = function () {
    if (window.scrollY > 300) {
        navbar.style.height = 65 + "px"
        navbar.style.backgroundColor = "white";
        profile_title.style.color = "black";
    } else {
        navbar.style.height = 60 + "px"
        navbar.style.backgroundColor = "transparent";
        profile_title.style.color = "white";
    }
}

let nav_link_about = document.querySelector(".nav__link--prof");
let nav_link_Prod = document.querySelector('.nav__link--prod');
let nav_link_offers = document.querySelector('.nav__link--offers');
let nav_link_cour = document.querySelector('.nav__link--cour');

let overview_sec = document.getElementById('overview-sec');
let products_sec = document.getElementById('productc-sec');
let offers_sec = document.getElementById('offers-sec');
let couriers_sec = document.getElementById('couriers-sec');

nav_link_about.addEventListener('click', (e) => {
    nav_link_about.classList.add('nav__link--prof--active');
    nav_link_Prod.classList.remove('nav__link--prod--active');
    nav_link_offers.classList.remove('nav__link--offers--active');
    nav_link_cour.classList.remove('nav__link--cour--active');

    overview_sec.style.display = "block";
    products_sec.style.display = "none";
    offers_sec.style.display = "none";
    couriers_sec.style.display = "none";
});

nav_link_Prod.addEventListener('click', (e) => {
    nav_link_about.classList.remove('nav__link--prof--active');
    nav_link_Prod.classList.add('nav__link--prod--active');
    nav_link_offers.classList.remove('nav__link--offers--active');
    nav_link_cour.classList.remove('nav__link--cour--active');

    overview_sec.style.display = "none";
    products_sec.style.display = "block";
    offers_sec.style.display = "none";
    couriers_sec.style.display = "none";
});

nav_link_offers.addEventListener('click', (e) => {
    nav_link_about.classList.remove('nav__link--prof--active');
    nav_link_Prod.classList.remove('nav__link--prod--active');
    nav_link_offers.classList.add('nav__link--offers--active');
    nav_link_cour.classList.remove('nav__link--cour--active');

    overview_sec.style.display = "none";
    products_sec.style.display = "none";
    offers_sec.style.display = "block";
    couriers_sec.style.display = "none";
});

nav_link_cour.addEventListener('click', (e) => {
    nav_link_about.classList.remove('nav__link--prof--active');
    nav_link_Prod.classList.remove('nav__link--prod--active');
    nav_link_offers.classList.remove('nav__link--offers--active');
    nav_link_cour.classList.add('nav__link--cour--active');

    overview_sec.style.display = "none";
    products_sec.style.display = "none";
    offers_sec.style.display = "none";
    couriers_sec.style.display = "block";
});

if (userId != "") {
    console.log(userId);
    db.collection(colValue).doc(userId).get().then(function (doc) {
        if (doc.data() != null) {
            document.getElementById('profile-poster').src = (doc.data().poster != null ? doc.data().poster : "");
            document.getElementById('profile-header-title').innerHTML = doc.data().name;
            document.getElementById('verified-name').innerHTML = doc.data().name;
            document.getElementById('profile-category').innerHTML = doc.data().category;
            document.getElementById('profile-txt').innerHTML = (doc.data().poster != null ? "Edit Business Profile cover photo helps improve user experience and brings meaningful of your business to your customers" : "Adding Business Profile cover photo helps improve user experience and brings meaningful of your business to your customers");
            document.getElementById('profile-logo-img').src = (doc.data().logo != null ? doc.data().logo : 'images/ic_cawine_launcher_icon_round.png');
            document.getElementById('profile-logo-add').innerHTML = (doc.data().logo != null ? "Edit Logo" : "Add Logo");
            document.getElementById('profile-vendor-name').innerHTML = doc.data().name;
            document.getElementById('profile-vendor-cat').innerHTML = doc.data().category;
            document.getElementById('profile-vendor-place').innerHTML = doc.data().place;
            document.getElementById('profile-vendor-phone').innerHTML = (doc.data().fullPhoneNumber != "" ? doc.data().fullPhoneNumber : "+25670xxxxxxx");
            document.getElementById('profile-vendor-status').innerHTML = (doc.data().status != null ? doc.data().status : "Offline");
            document.getElementById('profile-vendor-check-status').checked = (doc.data().status != null && doc.data().status === "Online" ? true : false);
            document.getElementById('profile-vendor-check-delivery').checked = (doc.data().allowDelivery != null && doc.data().allowDelivery === "Yes" ? true : false);

            if (doc.data().reviews != null) {
                document.getElementById('star-reviews').innerHTML = doc.data().reviews + " Reviews";
            }

            let ratingBar = "";
            if (doc.data().rating != null) {
                if (doc.data().rating == 5) {
                    ratingBar = `
                    <span class="material-icons" style="color: orange; margin-left: 0.2rem; font-size: 19px;">star</span>
                    <span class="material-icons" style="color: orange; margin-left: 0.2rem; font-size: 19px;">star</span>
                    <span class="material-icons" style="color: orange; margin-left: 0.2rem; font-size: 19px;">star</span>
                    <span class="material-icons" style="color: orange; margin-left: 0.2rem; font-size: 19px;">star</span>
                    <span class="material-icons" style="color: orange; margin-left: 0.2rem; font-size: 19px;">star</span>
                    `;
                    document.getElementById('star-rating-bar').innerHTML = ratingBar;
                } else if (doc.data().rating == 4) {
                    ratingBar = `
                    <span class="material-icons" style="color: orange; margin-left: 0.2rem; font-size: 19px;">star</span>
                    <span class="material-icons" style="color: orange; margin-left: 0.2rem; font-size: 19px;">star</span>
                    <span class="material-icons" style="color: orange; margin-left: 0.2rem; font-size: 19px;">star</span>
                    <span class="material-icons" style="color: orange; margin-left: 0.2rem; font-size: 19px;">star</span>
                    <span class="material-icons" style="color: rgb(143, 143, 143); margin-left: 0.2rem; font-size: 19px;">star</span>
                    `;
                    document.getElementById('star-rating-bar').innerHTML = ratingBar;
                } else if (doc.data().rating == 3) {
                    ratingBar = `
                    <span class="material-icons" style="color: orange; margin-left: 0.2rem; font-size: 19px;">star</span>
                    <span class="material-icons" style="color: orange; margin-left: 0.2rem; font-size: 19px;">star</span>
                    <span class="material-icons" style="color: orange; margin-left: 0.2rem; font-size: 19px;">star</span>
                    <span class="material-icons" style="color: rgb(143, 143, 143); margin-left: 0.2rem; font-size: 19px;">star</span>
                    <span class="material-icons" style="color: rgb(143, 143, 143); margin-left: 0.2rem; font-size: 19px;">star</span>
                    `;
                    document.getElementById('star-rating-bar').innerHTML = ratingBar;
                } else if (doc.data().rating == 2) {
                    ratingBar = `
                    <span class="material-icons" style="color: orange; margin-left: 0.2rem; font-size: 19px;">star</span>
                    <span class="material-icons" style="color: orange; margin-left: 0.2rem; font-size: 19px;">star</span>
                    <span class="material-icons" style="color: rgb(143, 143, 143); margin-left: 0.2rem; font-size: 19px;">star</span>
                    <span class="material-icons" style="color: rgb(143, 143, 143); margin-left: 0.2rem; font-size: 19px;">star</span>
                    <span class="material-icons" style="color: rgb(143, 143, 143); margin-left: 0.2rem; font-size: 19px;">star</span>
                    `;
                    document.getElementById('star-rating-bar').innerHTML = ratingBar;
                } else if (doc.data().rating == 1) {
                    ratingBar = `
                    <span class="material-icons" style="color: orange; margin-left: 0.2rem; font-size: 19px;">star</span>
                    <span class="material-icons" style="color: rgb(143, 143, 143); margin-left: 0.2rem; font-size: 19px;">star</span>
                    <span class="material-icons" style="color: rgb(143, 143, 143); margin-left: 0.2rem; font-size: 19px;">star</span>
                    <span class="material-icons" style="color: rgb(143, 143, 143); margin-left: 0.2rem; font-size: 19px;">star</span>
                    <span class="material-icons" style="color: rgb(143, 143, 143); margin-left: 0.2rem; font-size: 19px;">star</span>
                    `;
                    document.getElementById('star-rating-bar').innerHTML = ratingBar;
                }
            } else {
                ratingBar = `
                    <span class="material-icons" style="color: orange; margin-left: 0.2rem; font-size: 19px;">star</span>
                    <span class="material-icons" style="color: rgb(143, 143, 143); margin-left: 0.2rem; font-size: 19px;">star</span>
                    <span class="material-icons" style="color: rgb(143, 143, 143); margin-left: 0.2rem; font-size: 19px;">star</span>
                    <span class="material-icons" style="color: rgb(143, 143, 143); margin-left: 0.2rem; font-size: 19px;">star</span>
                    <span class="material-icons" style="color: rgb(143, 143, 143); margin-left: 0.2rem; font-size: 19px;">star</span>
                    `;
                    document.getElementById('star-rating-bar').innerHTML = ratingBar;
            }
        }
    });
}

document.getElementById('profile-poster').addEventListener('click', function() {
    $('#poster-uri').trigger('click');
});

$("#poster-uri").on("change", function (event) {
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
                    document.getElementById('profile-poster').src = imgdownloadUrl;
                    alert('Poster updated successfully');
                });
            });
        });
});

$('#profile-logo-img').click(function () {
    $('#logo-uri').trigger('click');
});

$("#logo-uri").on("change", function (event) {
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
                    document.getElementById('profile-logo-img').src = imgdownloadUrl;
                    alert('Logo updated successfully');
                });
            });
        });
});

document.getElementById('profile-vendor-check-status').addEventListener('change', function () {
    if (this.checked) {
        var map = { status: "Online" }
        db.collection(colValue).doc(userId).update(map).then(function () {
            alert(userId + " Online")
            document.getElementById('profile-vendor-status').innerHTML = "Online";
        });
    } else {
        var map = { status: "Offline" }
        db.collection(colValue).doc(userId).update(map).then(function () {
            document.getElementById('profile-vendor-status').innerHTML = "Offline";
        });
    }
});

document.getElementById('profile-vendor-check-delivery').addEventListener('change', function () {
    if (this.checked) {
        var map = { allowDelivery: "Yes" }
        db.collection(colValue).doc(userId).update(map);
    } else {
        var map = { allowDelivery: "No" }
        db.collection(colValue).doc(userId).update(map);
    }
});

document.getElementById('edit-name-btn').addEventListener('click', function(e) {
    window.location.assign('editname.html');
});

document.getElementById('edit-place-btn').addEventListener('click', function(e) {
    window.location.assign('editaddress.html');
});

document.getElementById('edit-phone-btn').addEventListener('click', function(e) {
    window.location.assign('editphone.html');
});

// vendor location but still pending!
function getPlace() {
    var API_KEY_CAWINE = "AIzaSyByGzJ_xF3kMCK1JQvEUWvJeBaB-NQkmno";
    var query = `https://www.google.com/maps/embed/v1/place?key=${API_KEY_CAWINE}&q=${"0.3384602"},${"32.625801"}`;
    document.getElementById('map-panel').src = query;
}

getPlace();
// vendor location ends

function getCouriers() {
    let courierItem = "";
    db.collection("Couriers").get().then((snapshot) => {
        snapshot.forEach((doc) => {
            let uid = doc.data().vendorID;
            if (uid === userId) {
                courierItem += `
                <div style="width: 100%; margin-top: 2rem;">
                    <div style="width: 100%; display: flex; align-items: start; justify-content: start; position: relative;">
                        <img id="courier-img" src="${(doc.data().passportUrl != null ? doc.data().passportUrl : 'images/profile_pic.png')}" />
                        <div style="margin-left: 10px;">
                            <span id="courier-name">${doc.data().firstName}</span>
                            <span id="courier-phone">${doc.data().phoneNo}</span>
                            <span id="courier-text">${doc.data().address}</span>
                        </div>
                    </div>
                </div>
                `;
                document.getElementById('couriers-container').innerHTML = courierItem;
            }
        });
    });
}

getCouriers();

function getOffers() {
    let offerItem = "";
    db.collection("Offers").get().then((snapshot) => {
        snapshot.forEach((doc) => {
            let uid = doc.data().vendorID;
            if (uid === userId) {
                console.log(uid);
                db.collection(colValue).doc(userId).collection("Products").get().then((prodshot) => {
                    prodshot.forEach((prodDoc) => {
                        let prodName = prodDoc.data().name;
                        if (prodName === doc.data().name) {
                            console.log(prodName);
                            offerItem += `
                            <div style="margin-top: 1rem; margin-left: 1rem; margin-right: 1rem; border-radius: 10px; box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.16), 0 1px 4px rgba(0, 0, 0, 0.23);">
                    <div style="width: 100%; height: 150px;">
                        <div style="width: 100%; height: 150px; border-radius: 10px;">
                            <img id="offer-img" src="${(prodDoc.data().poster === null ? doc.data().poster : prodDoc.data().poster)}" />
                        </div>
                    </div>
                    <div style="width: 100%; position: relative; margin-top: 1rem;">
                        <span id="offer-prod-price">${"UGX"+parseInt(prodDoc.data().price).toLocaleString()}</span>
                        <span id="offer-txt">${parseInt(doc.data().disc).toLocaleString() + " Off - " + doc.data().name}</span>
                        <span id="offer-title">${doc.data().title}</span>
                        <div style="display: flex; align-items: start; justify-content: start;">
                            <span class="material-icons" style="margin-left: 0.5rem; color: red;">sell</span>
                            <span id="offer-desc">${doc.data().desc}</span>
                        </div>
                    </div>
                    <div style="width: 100%; display: flex; align-items: end; justify-content: end;">
                        <span class="material-icons" style="margin-right: 1rem; color: red; padding-bottom: 1rem;">delete</span>
                    </div>
                </div>
                            `;
                            document.getElementById('offers-container').innerHTML = offerItem;
                        }
                    });
                });
            }
        });
    });
}

getOffers();

function getProducs() {
    let prodItem = "";
    db.collection(colValue).doc(userId).collection("Products").get().then((snapshot) => {
        snapshot.forEach((doc) => {
            prodItem += `
            <div style="margin-top: 1rem; margin-left: 0.4rem; margin-right: 0.4rem; border-radius: 8px; box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.16), 0 1px 4px rgba(0, 0, 0, 0.23);">
                        <div style="width: 100%; height: 200px;">
                            <div style="height: 200px; border-radius: 8px 8px 0px 0px; background-color: rgb(245, 205, 205);">
                                <img id="prod-img" src="${doc.data().poster}" />
                            </div>
                        </div>
                        <div style="width: 100%; position: relative; margin-top: 1rem;">
                            <span id="prod-name">${doc.data().name}</span>
                            <span id="prod-qty">${doc.data().qty}</span>
                            <span id="prod-price">UGX${parseInt(doc.data().price).toLocaleString()}</span>
                            <div style="display: flex; align-items: start; justify-content: start; margin-top: 0.4rem;">
                                <span id="prod-desc">${doc.data().desc}</span>
                            </div>
                        </div>
                    </div>
            `;
        });
        document.getElementById('prod-container').innerHTML = prodItem;
    });
}

getProducs();

function logout() {
    firebase.auth().signOut().then(function () {
        window.location.assign("index.html");
    }, function (error) {
        console.log("Something went wrong!");
    });
}

dlgYesBtn.addEventListener('click', () => {
    logout();
});

document.getElementById('logout-btn').addEventListener('click', () => {
    dlgTxt.innerHTML = "Are you sure you want to logout?";
    alertDlg.showModal();
});

document.getElementById('cust-btn-add-products').addEventListener('click', () => {
    window.location.assign("selproduct.html");
});

document.getElementById('offers-btn').addEventListener('click', () => {
    window.location.assign("addoffer.html");
});