let vendorName = "";

let getProducts = (userId) => {
    let prodItem = "";
    db.collection("Products").get().then(function(snapshot) {
        snapshot.forEach((doc) => {
            let uid = doc.data().vendorID;
            if (uid === userId) {
                prodItem += `
               <option 
               class="${doc.data().poster}"
               value="${doc.data().name}" label="${doc.data().name}">${doc.data().name}</option>
            `;
            }
        });
        document.getElementById('attach-product').innerHTML = prodItem;
    });
}

getProducts(userId);

let getUserInfor = (userId) => {
    db.collection('Vendors').doc(userId).get().then(function(it) {
        if (it.data() != null) {
            vendorName = it.data().name;
        }
    });
}

getUserInfor(userId);

document.getElementById('btn-sel-next').addEventListener('click', () => {
    let offerTitle = document.getElementById("input-offer-title").value;
    let attachedProd = document.getElementById("attach-product").value;
    let offerDisc = document.getElementById("input-offer-disc").value;
    let offerDesc = document.getElementById("input-offer-desc").value;
    let checkAttach = document.getElementById('check-attach');
    let selItem = document.getElementById("attach-product");

    if (checkAttach.checked === true && offerDisc === "") {
        alert('Add offer discount!');
        return;
    }

    if (offerTitle === "" || offerDesc === "") {
        alert('Offer title and description are requiered!');
        return;
    }
    document.getElementById('confirm-btn-container').style.display = "none";

    db.collection("Vendors").doc(userId).collection("Products").doc(attachedProd).get().then((it) => {
        if (it.data() != null) {
            console.log(it.data().poster);
            let map = {
                attachedToProduct: (checkAttach.checked === true ? true : false),
                disc: (checkAttach.checked === true ? offerDisc : "0"),
                desc: offerDesc,
                name: (checkAttach.checked === true ? attachedProd : null),
                poster: it.data().poster,
                title: offerTitle,
                vendorID: userId,
                vendorName: vendorName
            }

            db.collection('Offers').doc().set(map).then(function() {
                alert('Offer saved successfully');
                document.getElementById('confirm-btn-container').style.display = "block";
            });
        }
    });
});