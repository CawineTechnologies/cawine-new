
let btnText = "";
let clientPhone = "";
let clientId = localStorage.getItem('client_id');
let body = document.querySelector('body');
let btn_arrow = document.getElementById('order-prof-btn-arrow');

document.getElementById('btn-hide-show-order').addEventListener('click', () => {
    if (btn_arrow.innerHTML === "keyboard_arrow_down") {
        btn_arrow.innerHTML = "keyboard_arrow_up";
    } else {
        btn_arrow.innerHTML = "keyboard_arrow_down";
    }

    document.getElementById('order-prof-img-view')
        .style.display = (btn_arrow.innerHTML === "keyboard_arrow_up" ? "none" : "block");

    document.getElementById('order-prof-name-view')
        .style.display = (btn_arrow.innerHTML === "keyboard_arrow_up" ? "none" : "block");

    document.getElementById('order-prof-from-view')
        .style.display = (btn_arrow.innerHTML === "keyboard_arrow_up" ? "none" : "block");

    document.getElementById('order-prof-sch-view')
        .style.display = (btn_arrow.innerHTML === "keyboard_arrow_up" ? "none" : "block");

    document.getElementById('order-prof-phone-view')
        .style.display = (btn_arrow.innerHTML === "keyboard_arrow_up" ? "none" : "block");

    document.getElementById('order-prof-notes-view')
        .style.display = (btn_arrow.innerHTML === "keyboard_arrow_up" ? "none" : "block");

    document.getElementById('order-prof-pay-meth-view')
        .style.display = (btn_arrow.innerHTML === "keyboard_arrow_up" ? "none" : "block");

    document.getElementById('btn-show-order-prof')
        .style.display = (btn_arrow.innerHTML === "keyboard_arrow_up" ? "none" : "block");
});

document.getElementById('btn-sel-next').addEventListener('click', () => {
    window.location.assign('orderstatus.html');
});

function checkOrder(client) {
    db.collection("New orders").doc(client).get().then((it) => {
        if (it.data() != null) {
            clientPhone = it.data().phone;

            document.getElementById('order-data-name').innerHTML = it.data().name;
            document.getElementById('order-data-place').innerHTML = it.data().dest;
            document.getElementById('order-data-date').innerHTML = it.data().orderDate;
            document.getElementById('order-data-phone').innerHTML = it.data().phone;
            document.getElementById('order-data-notes').innerHTML =
                (it.data().notes != null && it.data().notes != "" ? it.data().notes : "No special delivery notes");
            document.getElementById('order-data-pay-meth').innerHTML = it.data().paymentType;

            db.collection("Users").doc(client).get().then((it) => {
                if (it.data() != null) {
                    console.log(it.data());
                    document.getElementById('order-data-pic').src =
                        (it.data().profilePic != null ? it.data().profilePic : 'images/profile_pic.png');
                }
            });

            let orderStatus = it.data().order;
            if (orderStatus != null && orderStatus === "completed"
                || orderStatus === "cancelled"
                || orderStatus === "received") {
                btnText = "Exit"
                document.getElementById('btn-sel-next').style.display = "none";
            } else {
                btnText = "Proceed with order";
                document.getElementById('btn-sel-next').innerHTML = btnText;
            }
            loadOrder(btnText);
        }
    });

    document.getElementById('order-prof-phone-view').addEventListener('click', () => {
        window.open('tel:' + clientPhone, '_self');
    });
}

function loadOrder(btnTxt) {
    let orderItem = "";
    if (btnTxt === "Exit") {
        db.collection("Order History").get().then(function (snapshot) {
            snapshot.forEach((doc) => {
                let uid = doc.data().vendorID;
                let client_id = doc.data().userID;
                if (uid === userId && client_id === clientId) {
                    orderItem += `
                        <div style="margin-top: 1rem; margin-left: 0.4rem; margin-right: 0.4rem; border-radius: 8px; box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.16), 0 1px 4px rgba(0, 0, 0, 0.23);">
                            <div style="width: 100%; height: 200px;">
                                <div style="height: 200px; border-radius: 8px 8px 0px 0px; background-color: rgb(245, 205, 205); text-align: center;">
                                    <img id="prod-img" src="${doc.data().poster}" />
                                </div>
                            </div>
                            <div style="width: 100%; position: relative; margin-top: 1rem;">
                                <span id="prod-name">${doc.data().name}</span>
                                <span id="prod-qty">${doc.data().qty}</span>
                                <span id="prod-price">${doc.data().currency + parseInt(doc.data().orderPrice).toLocaleString()}</span>
                                <span id="prod-delivery-price">${doc.data().currency + parseInt(doc.data().deliveryFee).toLocaleString()} (Delivery fee)</span>
                                <div style="display: flex; align-items: start; justify-content: start; margin-top: 0.4rem;">
                                    <span id="prod-desc">${doc.data().desc}</span>
                                </div>
                            </div>
                        </div>
                    `;
                    document.getElementById('order-history-view').innerHTML = orderItem;
                    document.getElementById('order-title').innerHTML = "Oredr History";
                }
            });
        });
    } else {
        db.collection("Cart").doc(clientId).collection('Items').get().then(function(snapshot) {
            snapshot.forEach((doc) => {
                let uid = doc.data().vendorID;
                let client_id = doc.data().userID;
                if (uid === userId && client_id === clientId) {
                    db.collection('Vendors').doc(uid).get().then((it) => {
                        if (it.data() != null) {
                            orderItem += `
                        <div style="margin-top: 1rem; margin-left: 0.4rem; margin-right: 0.4rem; border-radius: 8px; box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.16), 0 1px 4px rgba(0, 0, 0, 0.23);">
                            <div style="width: 100%; height: 200px;">
                                <div style="height: 200px; border-radius: 8px 8px 0px 0px; background-color: rgb(245, 205, 205); text-align: center;">
                                    <img id="prod-img" src="${doc.data().poster}" />
                                </div>
                            </div>
                            <div style="width: 100%; position: relative; margin-top: 1rem;">
                                <span id="prod-name">${doc.data().name}</span>
                                <span id="prod-qty">${doc.data().qty}</span>
                                <span id="prod-price">${it.data().currency + parseInt(doc.data().orderPrice).toLocaleString()}</span>
                                <span id="prod-delivery-price">${it.data().currency + parseInt(it.data().deliveryFee).toLocaleString()} (Delivery fee)</span>
                                <div style="display: flex; align-items: start; justify-content: start; margin-top: 0.4rem;">
                                    <span id="prod-desc">${doc.data().desc}</span>
                                </div>
                            </div>
                        </div>
                    `;
                    document.getElementById('order-history-view').innerHTML = orderItem;
                    document.getElementById('order-title').innerHTML = "New Order"
                        }
                    });
                }
            });
        });
    }
}

checkOrder(clientId);