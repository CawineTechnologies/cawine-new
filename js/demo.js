// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
// import { getFirestore, doc, getDocs, collection, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// const app = initializeApp(firebaseConfig);
const db = firebase.firestore();

var userId = "";
var vendorID = "";
var userName = "";
var vendorItem = "";
var vendorName = "";
var currency = "";
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

document.getElementById('close').addEventListener('click', (e) => {
    let bundle = localStorage.getItem("bundle");
    if (bundle == "offers") {
        window.location.href = "offers.html";
    } else if (bundle == "eats") {
        window.location.href = "eats.html";
    } else if (bundle == "drinks") {
        window.location.href = "drinks.html";
    } else {
        window.location.href = "home.html";
    }
});

vendorID = localStorage.getItem('vendor_id');
getVendorProducts(vendorID);

async function getVendorProducts(vendorUid) {
    db.collection("Vendors").doc(vendorUid).get().then(function (it) {
        if (it.data() != null) {
            currency = it.data().currency;
            vendorName = it.data().name;
            document.getElementById('poster-vendor').src = it.data().poster;
            document.getElementById('vendor-title').innerHTML = it.data().name;
            document.getElementById('cart-vendor-name').innerHTML = it.data().name;

            loadProducts(it.data().vendorID);
        }
    });
}

async function loadProducts(vendor) {
    db.collection("Products").get().then(function (snapshot) {
        snapshot.forEach((doc) => {
            var vUid = doc.data().vendorID;

            if (vUid == vendor) {

                productVendor += "<div id='item-vendor-product'>";
                productVendor += "<img id='item-img-vendor-product' src='" + doc.data().poster + "'/>";
                productVendor += "<p id='item-name-vendor-product'>" + doc.data().name + "</p>";
                productVendor += "<p id='item-qty-vendor-product'>" + doc.data().qty + "</p>";
                productVendor += "<p id='item-price-vendor-product'>UGX<strong>" + parseInt(doc.data().price).toLocaleString() + "</strong></p>";
                productVendor += "<span id='item-add-to-cart-btn'>+</span>";
                productVendor += "<span id='vendor-uid-prod'>" + doc.data().name + "</span>";
                productVendor += "</div>";

                console.log(doc.data().name);
            }
        });
        document.getElementById('product-list-vendor').innerHTML = productVendor;

        var loadingBar = document.getElementById('loading-bar');
        loadingBar.style.display = "none";

        var dlg = document.getElementById("vendor-products-view");
        dlg.style.display = "block";

        var uidItem = document.querySelectorAll("#item-vendor-product span");
        for (var i = 0; i < uidItem.length; i++) {
            uidItem[i].onclick = function () {
                var uid = this.innerHTML;
                localStorage.setItem("name", uid);
                localStorage.setItem("bundle", "products");
                window.location.href = "addtocartdemo.html";
                // getVendorProdInfo(uid);
            }
        }
    });
}

async function getVendorProdInfo(itemId) {
    db.collection("Products").doc(itemId).get().then(function (it) {

    });
    const docRef = doc(db, "Products", itemId);
    const docData = await getDoc(docRef);
    if (docData.exists()) {
        console.log(docData.data());
        const vendorInfoRef = doc(db, "Vendors", docData.data().vendorID);
        const vendorData = await getDoc(vendorInfoRef);
        if (vendorData.exists()) {
            document.getElementById("detail-img-vendor").src = docData.data().poster;
            document.getElementById("item-detail-name-vendor").innerHTML = docData.data().name;
            document.getElementById("item-detail-qty-vendor").innerHTML = docData.data().qty;
            document.getElementById("item-detail-price-vendor").innerHTML = vendorData.data().currency +
                "<strong id='strong-price-vendor'>" + parseInt(docData.data().price).toLocaleString() + "</strong>";
            document.getElementById('item-detail-desc-vendor').innerHTML = docData.data().desc;

            document.getElementById('item-detail-vendor-prod').innerHTML = "Delivers in 30 - 60 min";
            document.getElementById('item-detail-place-vendor').innerHTML = `Delivery fee: ${vendorData.data().currency}`
                + parseInt(vendorData.data().deliveryFee).toLocaleString();

            var dlg = document.getElementById("vendor-footer");
            dlg.style.display = "block";
            body.classList.remove('active');

            var itemCount = 1;
            document.getElementById('increas-cart-items-btn-vendor').addEventListener('click', function (evt) {
                itemCount++;
                if (itemCount == 50) {
                    itemCount = 50;
                }
                document.getElementById("strong-price-vendor").innerHTML = parseInt(docData.data().price) * itemCount;
                document.getElementById("cart-item-count-vendor").innerHTML = itemCount;
                reloadCard(doc.data().userID, docData.data().vendorID);
            });
            document.getElementById('decreas-cart-items-btn-vendor').addEventListener('click', function (evt) {
                itemCount--;
                if (itemCount == 1) {
                    itemCount = 1;
                }
                document.getElementById("strong-price-vendor").innerHTML = parseInt(docData.data().price) * itemCount;
                document.getElementById("cart-item-count-vendor").innerHTML = itemCount;
                reloadCard(doc.data().userID, docData.data().vendorID);
            });

            document.getElementById('btn-add-to-cart-vendor').addEventListener('click', function (evt) {
                // window.alert("UserId: " + userId);
                var map = {
                    poster: docData.data().poster,
                    name: docData.data().name,
                    desc: docData.data().desc,
                    orderPrice: "" + docData.data().price * itemCount,
                    category: docData.data().category,
                    itemCount: "" + itemCount,
                    price: docData.data().price,
                    qty: docData.data().qty,
                    userID: userId,
                    vendorID: docData.data().vendorID
                }

                var db = firebase.firestore();
                db.collection("Cart").doc(userId).collection("Items")
                    .doc(docData.data().name).set(map);
                reloadCard(userId, docData.data().vendorID);
                window.alert(`Item added to cart`);
            });
        }
    }
}

document.getElementById('cart-close-btn').addEventListener('click', () => {
    body.classList.remove('active');
});

async function reloadCard(userId, vendorid) {
    // let listCard = document.getElementById('cart-list-view').innerHTML = '';
    const querySnapshot = await getDocs(collection(db, "Cart", userId, "Items"));
    querySnapshot.forEach((doc) => {
        var vUid = doc.data().vendorID;
        if (doc.data() != null && vendorid == vUid) {
            products = doc;
            totalPrice += parseInt(doc.data().orderPrice);
            count += parseInt(doc.data().itemCount);
            document.getElementById('cart-selected-qty').innerHTML = count + " items selected - cawine";
            var showCartBtn = document.getElementById('show-cart-btn');
            showCartBtn.style.display = "flex";

            cartItemRow += `<div id="cart-item-row">
                       <img id="cart-img-row" src="${doc.data().poster}"/>
                       <p id="cart-name-row">${doc.data().name}</p>
                       <p id="cart-price-row">UGX<strong>${parseInt(doc.data().orderPrice).toLocaleString()}</strong></p>
                       <div id="cart-btn-container">
                          <li id="cart-minus-btn" class="fa fa-minus" onclick="changeQuantity(${doc.id}, ${count - 1})"></li>
                          <p id="cart-qty-row">${parseInt(doc.data().itemCount)}</p>
                          <li id="cart-plus-btn" class="fa fa-plus" onclick="changeQuantity(${doc.id}, ${count + 1})"></li>
                        </div>
                        <span id="cart-sel-item-btn">${doc.data().vendorID}</span>
                    </div>`;
        }
        // var listVendors = document.getElementById('product-list-vendor');
        // listVendors.style.bottom = "3rem";
    });
    document.getElementById('cart-list-view').innerHTML = cartItemRow;

    var qty = "ORDER " + count + " FOR UGX";
    document.getElementById('btn-cart-qty').innerHTML = qty + "<strong>" + totalPrice.toLocaleString() + "</strong>";

    document.getElementById('show-cart-btn').addEventListener('click', (e) => {
        checkOrder();
    });

    document.getElementById('proceed-to-cart-btm')
        .addEventListener('click', (e) => {
            body.classList.remove('active');
            body.classList.add('open');
        });
}

async function changeQuantity(key, quantity) {

    if (quantity == 0) {
        return;
    } else {
        var map = {
            itemCount: quantity
        }
        var db = firebase.firestore();
        db.collection("Cart").doc(userId).collection("Items")
            .doc(products[key].data().name).update(map).then((e) => {
                reloadCard(userId, products[key].data().vendorID);
            });
    }
    // reloadCard();
}

async function getUserInfo(currentUser, currenrVendor) {
    const userRef = doc(db, "Users", currentUser);
    const userData = await getDoc(userRef);
    if (userData.exists()) {
        userName = userData.data().fName;
        // document.getElementById('deliver-to').innerHTML = userData.data().deliverTo;
        // document.getElementById('phone-no').innerHTML = "+" +
        //     userData.data().countryCode + userData.data().phoneNumber;
        loadOrderPricing(userData.data().userID, currenrVendor);
    }
}

async function loadOrderPricing(cUser, cVendor) {
    let count = 0;
    var totalPrice = 0;
    var allDocData;
    const querySnapshot = await getDocs(collection(db, "Cart", cUser, "Items"));
    querySnapshot.forEach((doc) => {
        var vUid = doc.data().vendorID;
        if (cVendor == vUid) {
            count += parseInt(doc.data().itemCount);
            allDocData = doc;
            totalPrice += parseInt(doc.data().orderPrice);
            subTotal = parseInt(totalPrice) + 5000;
        }
    });
    // checkOrder();
    quantity.innerHTML = count;
    quantity.addEventListener('click', (e) => {
        checkOrder();
    });
    // document.getElementById('total').innerHTML = totalPrice.toLocaleString();
    // document.getElementById('sub-total').innerHTML = subTotal.toLocaleString();

    document.getElementById('place-order-btn').addEventListener('click', (evn) => {
        body.classList.remove('open');
        body.classList.add('warn');
    });

    document.getElementById('proceed-dlg-btn').addEventListener('click', (evn) => {
        var d = new Date()
        var month = String(d.getMonth() + 1).padStart(2, '0');
        var date = d.getDate() + " " + month + " " + d.getFullYear();
        var time = moment().format('hh:mm');
        var deliverTo = document.getElementById('deliver-to').innerHTML;
        var phoneNumber = document.getElementById('phone-no').innerHTML;
        var deliveryNotes = document.getElementById('order-notes').value;
        var map = {
            dest: deliverTo,
            phone: phoneNumber,
            vendorTitle: vendorName,
            orderTime: "Placed at: " + time,
            orderDate: date,
            vendorID: vendorID,
            client: userId,
            name: userName,
            order: "pending",
            price: "" + subTotal,
            deliveryFee: "5000",
            paymentType: "Cash",
            currency: currency,
            deliveryNotes: deliveryNotes
        }
        var db = firebase.firestore();
        db.collection("New orders").doc(userId).set(map);
        // window.alert(`Deliver to: ${place.name}, ${address}`);
        body.classList.remove('warn');
        body.classList.add('status');
    });

    document.getElementById('cancel-order-dlg-btn').addEventListener('click', (evn) => {
        body.classList.remove('warn');
    });

    document.getElementById('cancel-order-btn').addEventListener('click', (evn) => {
        body.classList.remove('status');
    });
}

async function checkOrder() {
    const userRef = doc(db, "New orders", userId);
    const userData = await getDoc(userRef);
    if (userData.exists()) {

        var order = userData.data().order;
        if (order == "preparing") {

            body.classList.add('status');
            document.getElementById('prepare-order-dot').style.backgroundColor = "limegreen";
            document.getElementById('prepare-order-text').style.color = "limegreen";
            document.getElementById('prepare-order-line').style.backgroundColor = "limegreen";
            document.getElementById('cancel-order-btn').style.display = "none";
        } else if (order == "delivering") {
            body.classList.add('status');
            document.getElementById('prepare-order-dot').style.backgroundColor = "limegreen";
            document.getElementById('prepare-order-text').style.color = "limegreen";
            document.getElementById('prepare-order-line').style.backgroundColor = "limegreen";
            document.getElementById('oredr-in-transit-dot').style.backgroundColor = "limegreen";
            document.getElementById('order-in-transit-text').style.color = "limegreen";
            document.getElementById('cancel-order-btn').style.display = "none";
        } else if (order == "received") {
            document.getElementById('order-payment-amount').innerHTML = subTotal.toLocaleString();
            body.classList.add('payment');
            document.getElementById('order-payment-btn').addEventListener('click', (evn) => {
                var map = {
                    order: "completed"
                }
                var db = firebase.firestore();
                db.collection("New orders").doc(userId).update(map).then(function (e) {
                    window.alert('Order completed');
                    window.location.href = "home.html";
                });
            });
        } else {
            localStorage.setItem("vendor_id", vendorID);
            window.location.href = "cart.html";
        }
    }
}

closeCheckOut.addEventListener('click', () => {
    body.classList.remove('open');
});

openCheckOut.addEventListener('click', () => {
    body.classList.remove('active');
    body.classList.add('open');
});