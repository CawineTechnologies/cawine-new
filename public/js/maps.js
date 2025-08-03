let userId = "";
let deliverTo = "";
let currLocation = "";
let latitude = 0;
let longitude = 0;
let savedLocation = localStorage.getItem("place_name");
var closeMaps = document.getElementById('close-maps');
var input = document.getElementById('search-place-input');

// firebase.auth().onAuthStateChanged(function (user) {
//     if (user) {
//         userId = user.uid;
//         getCurrentLocation(userId);
//     }
// });

function initMap() {
    var map = new google.maps.Map(document.getElementById('search-place-result'), {
        center: { lat: 0.3244032, lng: 32.571392 },
        zoom: 13,
        disableDefaultUI: true
    });
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(closeMaps);

    input.value = deliverTo;

    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);

    var infowindow = new google.maps.InfoWindow();
    var marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
    });

    autocomplete.addListener('place_changed', function () {
        infowindow.close();
        marker.setVisible(false);
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            window.alert("No geometry ruslts found!");
            return;
        }

        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
        }
        marker.setIcon(({
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(35, 35)
        }));
        marker.setPosition(place.geometry.location);
        marker.setVisible(true)

        var address = '';
        if (place.address_components) {
            address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
        }
        currLocation = `${place.name}, ${address}`;
        console.log(currLocation);

        input.value = currLocation;

        infowindow.setContent('<div><strong>' + place.name + '</strong></br>' + address);
        infowindow.open(map, marker);

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                var userId = user.uid;
                var map = {
                    deliverTo: place.name,
                    lat: "" + place.geometry.location.lat(),
                    lng: `${place.geometry.location.lng()}`
                }
                var db = firebase.firestore();
                db.collection("Users").doc(userId).update(map).then(function (e) {
                    window.alert(`Deliver to: ${place.name}, ${address}`);
                    let bundle = localStorage.getItem("bundle");
                    if (bundle != null && bundle === "landing") {
                        window.location.assign("index.html");
                    } else {
                        window.location.assign("home.html");
                    }
                });
            } else {
                localStorage.setItem("user_location", place.name);
                window.alert(`Deliver to: ${place.name}, ${address}`);
                window.location.assign("landing.html");
            }
        });
    });
}

function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

            var API_KEY_CAWINE = "AIzaSyByGzJ_xF3kMCK1JQvEUWvJeBaB-NQkmno";

            fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY_CAWINE}`)
                .then(response => response.json())
                .then(data => {
                    const placeName = data.results[0].formatted_address;
                    currLocation = placeName;
                    input.value = currLocation;
                    console.log(placeName);
                }).catch(error => console.error('Error: ', error));
        });
    } else {
        console.log("Geolocation is not supported by this browser,");
    }
}

getCurrentLocation();

function saveCurrLocation() {
    localStorage.setItem("user_location", currLocation);
    if (userId != "") {
        var map = {
            deliverTo: currLocation,
            lat: "" + latitude,
            lng: `${longitude}`
        }
        var db = firebase.firestore();
        db.collection("Users").doc(userId).update(map).then(function (e) {
            alert(`Deliver to: ${currLocation}`);
            let bundle = localStorage.getItem("bundle");
            if (bundle != null && bundle === "landing") {
                window.location.assign("index.html");
            } else {
                window.location.assign("home.html");
            }
        });
    } else {
        localStorage.setItem("user_location", currLocation);
        window.alert(`Deliver to: ${currLocation}`);
        window.location.assign("index.html");
    }
}

document.getElementById('close-maps').addEventListener('click', (e) => {
    let bundle = localStorage.getItem("bundle");
    if (bundle != null && bundle === "landing") {
        window.location.assign("landing.html");
    } else {
        window.location.assign("home.html");
    }
});