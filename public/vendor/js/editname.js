
let userId = localStorage.getItem('user_id');
console.log(userId);


if (userId != "") {
    db.collection('Vendors').doc(userId).get().then(function(it) {
        if (it.data() != null) {
            if (it.data().name != null) {
                document.getElementById('input-address').value = it.data().name;
            }

            if (it.data().deliveryFee != null) {
                document.getElementById('input-delivery-fee').value = it.data().deliveryFee;
            }

            if (it.data().merchantCode != null) {
                document.getElementById('input-merch-code').value = it.data().merchantCode;
            }
        }
    });
}

document.getElementById('next-btn').addEventListener('click', function(e) {
    let busiName = document.getElementById('input-address').value;
    let busiCur = document.getElementById('select-currency').value;
    let busiDeliv = document.getElementById('input-delivery-fee').value;
    let merchCode = document.getElementById('input-merch-code').value;

    if (busiName === "" || busiCur === "Select currency*" || busiDeliv === "" || merchCode === "") {
        alert('All fields are requiered!');
        return;
    }

    let map = {
        name: busiName,
        currency: busiCur,
        deliveryFee: busiDeliv,
        merchantCode: merchCode,
    }

    db.collection('Vendors').doc(userId).update(map).then(function() {
        alert('Profile updated successfully');
    });
});