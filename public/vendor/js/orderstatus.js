
var timer;
var vendorID = "";
var userName = "";
var vendorItem = "";
var vendorName = "";
var currency = "UGX";
var subTotal = 0;
var productVendor = "";
let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.close-cart');
let openCheckOut = document.querySelector('.closeShopping');
let closeCheckOut = document.querySelector('.close-check-out');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

let products = [];
let count = 0;
var totalPrice = 0;
var cartItemRow = "";
var countryCode = "";
var phoneNo = "";
let clientId = localStorage.getItem('client_id');

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        vendorID = user.uid;
        checkOrder(clientId);
        vendorName = localStorage.getItem("vendor_name");
        getUserInfo(clientId, vendorID);
        document.getElementById('order-status-titel').innerHTML = vendorName;
        startTimer(clientId);
    }
});

function startTimer(userId) {
    var sec = 0;
    timer = setInterval(function () {
        checkOrder(userId)
        // sec++;
        // console.log(sec);
    }, 1000);
}

document.getElementById('contact-vendor-btn').addEventListener('click', (e) => {
    window.open('tel:+' + countryCode + phoneNo, '_self');
});

document.getElementById('order-payment-btn').addEventListener('click', () => {
    window.location.assign('selector.html');
});

document.getElementById('cancel-order-btn').addEventListener('click', () => {
    processOrder();
});

function processOrder() {
    let clientId = localStorage.getItem("client_id");
    let btnText = document.getElementById('cancel-order-btn').innerHTML;
    let map;
    switch (btnText) {
        case "Prepare order":
            map = {order: "preparing"}
            break;
        case "Send order":
            map = {order: "delivering"}
            break;
        case "Deliver order":
            map = {order: "received"}
            break;
        default:
            break;
    }
    db.collection('New orders').doc(clientId).update(map);
}

function checkOrder(uid) {
    db.collection("New orders").doc(uid).get().then(function (userData) {
        if (userData.data() != null) {
            var order = userData.data().order;
            if (order == "preparing") {

                document.getElementById('cancel-order-btn').innerHTML = "Send order";

                body.classList.add('status');
                document.getElementById('prepare-order-dot').style.backgroundColor = "red";
                document.getElementById('prepare-order-text').style.color = "red";
                document.getElementById('prepare-order-line').style.backgroundColor = "red";
            } else if (order == "delivering") {

                document.getElementById('cancel-order-btn').innerHTML = "Deliver order";

                body.classList.add('status');
                document.getElementById('prepare-order-dot').style.backgroundColor = "red";
                document.getElementById('prepare-order-text').style.color = "red";
                document.getElementById('prepare-order-line').style.backgroundColor = "red";
                document.getElementById('oredr-in-transit-dot').style.backgroundColor = "red";
                document.getElementById('order-in-transit-line').style.backgroundColor = "red";
                document.getElementById('order-in-transit-text').style.color = "red";
            } else if (order == "received") {
                document.getElementById('order-payment-amount').innerHTML = subTotal.toLocaleString();
                body.classList.add('payment');
                clearInterval(timer);
            } else if (order == "completed") {
                window.location.assign('selector.html');
            }
        }
    });
}

function getUserInfo(currentUser, currenrVendor) {
    db.collection('Users').doc(currentUser).get().then(function (userData) {
        if (userData.data() != null) {
            userName = userData.data().fName;
            countryCode = userData.data().countryCode;
            phoneNo = userData.data().phoneNumber;
            loadOrderPricing(userData.data().userID, currenrVendor);

            console.log(userName + ", " + phoneNo);
        }
    });
}

function loadOrderPricing(cUser, cVendor) {
    console.log(cUser + ", " + cVendor);
    let count = 0;
    var totalPrice = 0;
    db.collection('Cart').doc(cUser).collection('Items').get().then(function(querySnapshot) {
        querySnapshot.forEach((doc) => {
            let vUid = doc.data().vendorID;
            if (cVendor == vUid) {
                console.log(vUid);
                count += parseInt(doc.data().itemCount);
                console.log(count);
                totalPrice += parseInt(doc.data().orderPrice);
                console.log(totalPrice);
                subTotal = parseInt(totalPrice) + 5000;
                console.log(subTotal);
                document.getElementById('order-payment-amount').innerHTML = subTotal.toLocaleString();
            }
        });
    });
}