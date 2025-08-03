let cust = document.querySelector(".nav__link--cust");
let msg = document.querySelector(".nav__link--msg");
let fol = document.querySelector(".nav__link--fol");
let cust_tab_view = document.getElementById('cust-tab-view');
let msg_tab_view = document.getElementById('msg-tab-view');
let fol_tab_view = document.getElementById('followers-tab');

cust.addEventListener('click', (e) => {
    cust.classList.add("nav__link--cust--active");
    msg.classList.remove("nav__link--msg--active");
    fol.classList.remove("nav__link--fol--active");
    cust_tab_view.style.display = "block";
    msg_tab_view.style.display = "none"
    fol_tab_view.style.display = "none";
});

msg.addEventListener('click', (e) => {
    msg.classList.add("nav__link--msg--active");
    cust.classList.remove("nav__link--cust--active");
    fol.classList.remove("nav__link--fol--active");
    cust_tab_view.style.display = "none";
    msg_tab_view.style.display = "block"
    fol_tab_view.style.display = "none";
});

fol.addEventListener('click', (e) => {
    fol.classList.add("nav__link--fol--active");
    cust.classList.remove("nav__link--cust--active");
    msg.classList.remove("nav__link--msg--active");
    cust_tab_view.style.display = "none";
    msg_tab_view.style.display = "none"
    fol_tab_view.style.display = "block";
});

if (userId != null) {
    let reviewItem = "";
    db.collection(colValue).doc(userId).collection("Reviews").get().then((snapshot) => {
        snapshot.forEach((doc) => {
            db.collection("Users").doc(doc.data().userID).get().then((it) => {
                if (it.data() != null && it.data().fName != null) {
                    reviewItem += `
                    <div style="width: 100%; margin-top: 2rem;">
                    <div style="width: 100%; display: flex; align-items: start; justify-content: start; position: relative;">
                        <img id="reviwe-img" src="${(it.data().profilePic != null ? it.data().profilePic : 'images/profile_pic.png')}" />
                        <div style="margin-left: 10px;">
                            <span id="review-name">${it.data().fName}</span>
                            <div style="width: 100%; display: flex; align-items: center; justify-content: center;">
                                <span style="color: orange; font-size: 21px; margin-top: 0.3rem;" class="material-icons">star</span>
                                <span style="color: orange; font-size: 21px; margin-top: 0.3rem;" class="material-icons">star</span>
                                <span style="color: orange; font-size: 21px; margin-top: 0.3rem;" class="material-icons">star</span>
                                <span style="color: orange; font-size: 21px; margin-top: 0.3rem;" class="material-icons">star</span>
                                <span style="color: orange; font-size: 21px; margin-top: 0.3rem;" class="material-icons">star</span>
                                <span id="review-rating-txt">5.0</span>
                            </div>
                            <span id="order-currency">${doc.data().review}</span>
                        </div>
                    </div>
                </div>
                    `;
                    document.getElementById('reviews-container').innerHTML = reviewItem;
                }
            });
        });
    });

    db.collection("Welcome SMS").doc(userId).get().then((it) => {
        if (it.data() != null) {
            document.getElementById('input-message').value = it.data().welcomeMessage;
        }
    });

    let smsItem = "";
    db.collection(colValue).doc(userId).collection("Messages").get().then((snapshot) => {
        snapshot.forEach((doc) => {
            db.collection("Users").doc(doc.data().client).get().then((it) => {
                if (it.data() != null && it.data().fName != null) {
                    smsItem += `
                    <div style="width: 100%; margin-top: 2rem;">
                    <div style="width: 100%; display: flex; align-items: start; justify-content: start; position: relative;">
                        <img id="sms-img" src="${(it.data().profilePic != null ? it.data().profilePic : 'images/profile_pic.png')}" />
                        <div style="margin-left: 10px;">
                            <span id="sms-name">${it.data().fName}</span>
                            <span id="sms-text">${doc.data().message}</span>
                        </div>
                    </div>
                </div>
                    `;
                    document.getElementById('sms-container').innerHTML = smsItem;
                }
            });
        });
    });

    let folItem = "";
    db.collection(colValue).doc(userId).collection("Marked").get().then((snapshot) => {
        snapshot.forEach((doc) => {
            db.collection("Users").doc(doc.data().markedBy).get().then((it) => {
                if (it.data() != null && it.data().fName != null) {
                    folItem += `
                    <div style="width: 100%; margin-top: 2rem;">
                    <div style="width: 100%; display: flex; align-items: start; justify-content: start; position: relative;">
                        <img id="followers-img" src="${(it.data().profilePic != null ? it.data().profilePic : 'images/profile_pic.png')}" />
                        <div style="margin-left: 10px;">
                            <span id="followers-name">${it.data().fName}</span>
                            <span id="followers-phone">+${it.data().countryCode + it.data().phoneNumber}</span>
                            <span id="followers-text">${it.data().countryName}</span>
                        </div>
                    </div>
                </div>
                    `;
                    document.getElementById('followers-container').innerHTML = folItem;
                }
            });
        });
    });
}

document.querySelector('#cust-btn-get-reviews')
    .addEventListener('click', event => {

        // Fallback, Tries to use API only
        // if navigator.share function is
        // available
        if (navigator.share) {
            navigator.share({

                // Title that occurs over
                // web share dialog
                title: 'Cawine Vendor',

                // URL to share
                url: 'https://www.cawineapp.com/vendor/index.html'
            }).then(() => {
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

let dlgOkBtn = document.getElementById('dialog-ok-btn');
document.getElementById('save-sms-btn').addEventListener('click', () => {
    let smsVal = document.getElementById('input-message').value;
    if (smsVal != "") {
        var map = { 
            welcomeMessage: smsVal,
            vendorID: userId
        }
        db.collection("Welcome SMS").doc(userId).set(map).then((e) => {
            dlgTxt.innerHTML = "Message saved successfully";
            dlgNoBtn.style.display = "none";
            dlgYesBtn.style.display = "none";
            dlgOkBtn.style.display = "block";
            alertDlg.showModal();
        });
    } else {
        dlgTxt.innerHTML = "Message is requiered!";
        dlgNoBtn.style.display = "none";
        dlgYesBtn.style.display = "none";
        dlgOkBtn.style.display = "block";
        alertDlg.showModal();
    }
});

dlgOkBtn.addEventListener('click', (e) => {
    alertDlg.close();
});

document.getElementById('cust-btn-get-followers').addEventListener('click', () => {
    window.location.assign("addoffer.html");
})