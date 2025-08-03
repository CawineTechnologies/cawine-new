

if (userId != null) {
    let orderItem = "";
    let orderName = "";
    let profilePicUrl = ""
    db.collection("New orders").get().then((snapshot) => {
        snapshot.forEach((doc) => {
            let uid = doc.data().vendorID;
            if (uid === userId) {
                db.collection("Users").doc(doc.data().client).get().then((it) => {
                    if (it.data() != null && it.data().fName != null) {
                        orderName = it.data().fName;
                        profilePicUrl = it.data().profilePic;

                        orderItem += `<div style="width: 100%; margin-top: 2rem;">
                <div style="width: 100%; display: flex; align-items: start; justify-content: start; position: relative;">
                    <img id="order-img" data-uid="${it.data().userID}" src="${(it.data().profilePic != null ? it.data().profilePic : 'images/profile_pic.png')}" />
                    <div id="order-txt-item-view">
                        <span id="order-name" data-uid="${it.data().userID}">${(orderName != "" ? orderName : "Client")}</span>
                        <span id="order-place" data-uid="${it.data().userID}">${doc.data().dest}</span>
                        <span id="order-currency" data-uid="${it.data().userID}">${doc.data().currency}<span id="order-price">${parseInt(doc.data().price).toLocaleString()}</span></span>
                        <span id="order-status" data-uid="${it.data().userID}">${doc.data().order}</span>
                    </div>
                </div>
                <div style="width: 100%; height: 1px; position: relative; margin-top: 0.3rem; background-color: rgb(232, 232, 232);"></div>
            </div>`;
                        console.log(orderName);
                        document.getElementById('order-container').innerHTML = orderItem;
                    }
                });
                // getClientInfo(doc.data().client, clientName);

            }
        });
        document.getElementById('dummy-order').style.display = "none";
    });
}

document.getElementById('order-container').addEventListener('click', function(e) {
    let clientID = e.target.dataset.uid;
    console.log(clientID);
    localStorage.setItem('client_id', clientID);
    window.location.assign('orderhistory.html');
});

