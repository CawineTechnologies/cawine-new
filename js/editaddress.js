
let userId = localStorage.getItem('user_id');
console.log(userId);

// var geocoder = new google.maps.Geocoder();
// geocoder.geocode({
//     "address": "Kyebando, Kisalosalo"
// }, function(results) {
//     console.log(results[0].geometry.location); //LatLng
// });

// var requestOptions = {
//     method: 'GET',
// };

// let address = "Kyebando, Kisalosalo";
// fetch("https://api.geoapify.com/v1/geocode/search?text=38%20Upper%20Montagu%20Street%2C%20Westminster%20W1H%201LJ%2C%20United%20Kingdom&apiKey=423dccfcd18849cf8b6bc202bed91e62", requestOptions)
//     .then(response => response.json())
//     .then(result => console.log(result))
//     .catch(error => console.log('error', error));

// var requestOptions = {
//     method: 'GET',
//   };
  
//   fetch("https://api.geoapify.com/v1/geocode/autocomplete?text=Mosco&apiKey=423dccfcd18849cf8b6bc202bed91e62", requestOptions)
//     .then(response => response.json())
//     .then(result => console.log(result))
//     .catch(error => console.log('error', error));


if (userId != "") {
    db.collection('Vendors').doc(userId).get().then(function (it) {
        if (it.data() != null) {
            if (it.data().addressStreet != null) {
                document.getElementById('input-address').value = it.data().addressStreet;
            }

            if (it.data().addressCity != null) {
                document.getElementById('input-delivery-fee').value = it.data().addressCity;
            }
        }
    });
}

document.getElementById('next-btn').addEventListener('click', function (e) {
    let busiAdd = document.getElementById('input-address').value;
    let busiCity = document.getElementById('input-delivery-fee').value;

    if (busiAdd === "" || busiCity === "") {
        alert('All fields are reqiered!');
        return;
    }

    let map = {
        addressStreet: busiAdd,
        addressCity: busiCity
    }

    db.collection('Vendors').doc(userId).update(map).then(function () {
        alert('Profile updated successfully');
    });
});