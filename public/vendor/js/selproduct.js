var firebaseConfig = {
    apiKey: "AIzaSyByGzJ_xF3kMCK1JQvEUWvJeBaB-NQkmno",
    authDomain: "cawine-736ac.firebaseapp.com",
    databaseURL: "https://cawine-736ac-default-rtdb.firebaseio.com",
    projectId: "cawine-736ac",
    storageBucket: "cawine-736ac.appspot.com",
    messagingSenderId: "643248682742",
    appId: "1:643248682742:web:c2ae192bf3cfbfe818ded7",
    measurementId: "G-2HEXE80L51"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.auth.Auth.Persistence.LOCAL;
let db = firebase.firestore();
let database = firebase.database();

let fileName = "";
let progress = 0;
let selectedImgUri = "";
let progressbar = document.querySelector('.progressbar');
// document.getElementById('btn-sel-gallery').addEventListener('click', () => {
//     document.getElementById('gallery-existing-container').style.display = "none";
//     document.getElementById('next-btn-container').style.display = "block";
// });

// document.getElementById('btn-sel-existing').addEventListener('click', () => {
//     document.getElementById('gallery-existing-container').style.display = "none";
//     document.getElementById('next-btn-container').style.display = "block";
// });

function enableProgressbar() {
    progressbar.style.display = "none";
    progressbar.setAttribute("role", "progressbar");
    progressbar.setAttribute("aria-valuenow", 0);
    progressbar.setAttribute("aria-live", "polite");
}

enableProgressbar();

function updateProgress(progress) {
    progressbar.setAttribute("aria-valuenow", progress);
    progressbar.style.setProperty("--progress", progress + "%");
}

document.getElementById('btn-sel-next').addEventListener('click', () => {
    window.location.assign("proddetails.html");
});

$('#btn-sel-gallery').click(function () {
    $('#img-uri').trigger('click');
});

$("#img-uri").on("change", function (event) {
    if (!(/\.(jpg)$/i).test(event.target.files[0].name)) {
        window.alert('File not suppoted, upload jpg files only!');
        return;
    }
    changeImage(this);

    selectedImgUri = event.target.files[0];
    fileName = selectedImgUri.name;
    localStorage.setItem("file_name", fileName);

    let storageRef = firebase.storage().ref("Drinks/" + fileName);
    let uploadTask = storageRef.put(selectedImgUri);
    uploadTask.on("state_changed", (snapshot) => {
        console.log(snapshot);
        progressbar.style.display = "grid";
        progress = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        progressbar.setAttribute("aria-busy", "true");
        updateProgress(progress);
        document.getElementById('next-btn-container').style.display = "none";
        console.log(progress);
    }, (error) => {
        console.log("Error is: " + error.message);
        alert("Error: Something went wrong! Try again later.");
    }, () => {
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            console.log("ImageLink: " + url);
            progressbar.style.display = "none";
            document.getElementById('next-btn-container').style.display = "block";
            localStorage.setItem("img_url", url);
        });
    });
});

function changeImage(input) {
    var reader;

    if (input.files && input.files[0]) {
        reader = new FileReader();

        reader.onload = function (e) {
            console.log(input.value);
            document.getElementById('sel-img').src = e.target.result;
            document.getElementById('dummy-img').style.display = "none";

            localStorage.setItem("file_path", e.target.result);

            document.getElementById('gallery-existing-container').style.display = "none";
            // document.getElementById('next-btn-container').style.display = "block";
        }

        reader.readAsDataURL(input.files[0]);
    }
}

function searchProduct() {
    let input = document.getElementById('input-prod-search').value
    input = input.toLowerCase();
    let x = document.getElementsByClassName('exist-item-row');

    for (i = 0; i < x.length; i++) {
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            x[i].style.display = "none";
        }
        else {
            x[i].style.display = "inline-block";
        }
    }
}

let getProducts = () => {
    let existItem = "";
    db.collection('Drinks').get().then(function(snapshot) {
        snapshot.forEach((doc) => {
            existItem += `
               <div class="exist-item-row" id="exist-item-row"><img id="exist-img" 
               data-url="${doc.data().btlUrl}" 
               data-qty="${doc.data().qty}"
               data-cat="${doc.data().category}"
               class="${doc.data().name}" 
               src="${(doc.data().btlUrl != null ? doc.data().btlUrl : 'images/ic_cawine_launcher_icon_round.png')}" />
               </div>
            `;
        });
        document.getElementById('exist-item-view').innerHTML = existItem;
        
    });
}

getProducts();

document.getElementById('exist-item-view').addEventListener('click', function(e) {
    let prodName = e.target.classList.value;
    let prodUrl = e.target.dataset.url;
    let prodQty = e.target.dataset.qty;
    let prodCat = e.target.dataset.cat;

    localStorage.setItem('prod_name', prodName);
    localStorage.setItem('img_url', prodUrl);
    localStorage.setItem('prod_qty', prodQty);
    localStorage.setItem('prod_cat', prodCat);

    document.getElementById('sel-img').src = prodUrl;
    document.getElementById('dummy-img').style.display = "none";
    document.getElementById('exist-container').style.display = "none";
    document.getElementById('next-btn-container').style.display = "block";
    document.getElementById('gallery-existing-container').style.display = "none";
    console.log(prodName, + ", " + prodUrl.replace("NaN", ""));
});

document.getElementById('btn-sel-existing').addEventListener('click', () => {
    document.getElementById('exist-container').style.display = "block";
});

document.getElementById('btn-close-exist').addEventListener('click', () => {
    document.getElementById('exist-container').style.display = "none";
});