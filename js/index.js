

// Your web app's Firebase configuration
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

function getNearstVendors() {
    var requestOptions = {
        method: 'GET',
    };

    fetch("https://api.geoapify.com/v1/routing?waypoints=0.3507433%2C32.5852668%7C0.36966509999999997%2C32.528788399999996&mode=drive&apiKey=423dccfcd18849cf8b6bc202bed91e62", requestOptions)
        .then(response => response.json())
        .then(result => {
            let meters = result.features[0].properties.distance
            console.log(meters[0])
            meters.Math.round(meters)
            console.log(meters)
        })
        .catch(error => console.log('error', error)
        );
}

// getNearstVendors();

function openWhatCanWeGetYou() {
    window.location.href = "whatcanwegetyou.html"
}

function openRegister() {
    window.location.href = "register.html"
}

function openLogin() {
    window.location.href = "index.html"
}

function openPasswordReset() {
    window.location.href = "resetPassword.html"
}

function openDrinks() {
    window.location.href = "drinks.html"
}

function openEats() {
    window.location.href = "eats.html"
}

function openOffers() {
    window.location.href = "offers.html"
}

function goHome() {
    window.location.href = "home.html"
}

// const alertMe = "";

function myFunction() {

    // var email = "me@gmail.com";
    // var password = "dhskiio";

    var email = document.getElementById("user-name").value;
    var password = document.getElementById("pass-word").value;

    // var email = $("#email").val();
    // var password = $("#password").val();

    if (email != "" && password != "") {

        var result = firebase.auth().signInWithEmailAndPassword(email, password);
        result.catch(function (error) {

            var errorMessage = error.message;
            window.alert("Error: " + errorMessage);

        });

    }
    else {
        //window.location.href="404.html";
        window.alert("Please all fields are required!");
    }
};

function openNewPlanDlg() {
    var dlgBg = document.getElementById("dlg-background");
    var dlg = document.getElementById("dlg-add-data");

    dlgBg.style.display = "block";
    dlg.style.display = "block";
};

function closeNewPlanDlg() {
    var dlgBg = document.getElementById("dlg-background");
    var dlg = document.getElementById("dlg-add-data");

    dlgBg.style.display = "none";
    dlg.style.display = "none";
};

// show add service dlg
function openNewSvcDlg() {
    var dlgBg = document.getElementById("dlg-background");
    var dlg = document.getElementById("dlg-add-svc");

    dlgBg.style.display = "block";
    dlg.style.display = "block";
};

// close add service dlg
function closeNewSvcDlg() {
    var dlgBg = document.getElementById("dlg-background");
    var dlg = document.getElementById("dlg-add-svc");

    dlgBg.style.display = "none";
    dlg.style.display = "none";
};

function openDelSvcDlg() {
    document.getElementById("dlg-background").style.display = "block";
    document.getElementById("dlg-delete-svc").style.display = "block";
}

function closeDelSvcDlg() {
    document.getElementById("dlg-background").style.display = "none";
    document.getElementById("dlg-delete-svc").style.display = "none";
}

function openSusCompDlg() {
    var menuItem = document.getElementById("inner-btn").innerHTML;
    if (menuItem == "All Vendors") {
        window.alert("Please select vendor you want to suspend from list below!");
        return;
    }
    $("#dlg-background").fadeIn(200);
    $("#dlg-suspend-comp").fadeIn(200);
}

function closeSusCompDlg() {
    $("#dlg-background").fadeOut(200);
    $("#dlg-suspend-comp").fadeOut(200);
}

$("#dlg-exit-new").click(
    function () {
        $("#dlg-background").fadeOut(200);
        $("#dlg-add-comp").fadeOut(200);

        // window.location.href = "comp.html";
    });

function openNewCompDlg() {
    $("#dlg-background").fadeIn(200);
    $("#dlg-add-comp").fadeIn(200);

    // dlgBg.style.display = "block";
    // dlg.style.display = "block";
};

function openPlacesDlg() {
    window.location.href = "places.html";
    // var placeName = document.getElementById("logo-title").innerHTML;
    // var dlgBg = document.getElementById("dlg-background");
    // var dlg = document.getElementById("dlg-add-data");

    // dlgBg.style.display = "block";
    // dlg.style.display = "block";
    // document.getElementById("search-place-input").innerText = placeName;
};

function closePlaceDlg() {
    var dlgBg = document.getElementById("dlg-background");
    var dlg = document.getElementById("dlg-add-data");

    dlgBg.style.display = "none";
    dlg.style.display = "none";
}

function logout() {

    firebase.auth().signOut().then(function () {
        window.alert("You have logged out!");
        window.location.href = "index.html";
    }, function (error) {
        window.alert("Something went wrong!");
    });
};

function openServices() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (!user) {
            window.location.href = "index.html";
        }
        else {
            window.location.href = "work_space.html";
        }
    });
};

function openMaids() {
    //p = document.getElementById("inner-sel-title");
    //txt = document.createTextNode("Maids / Butlers");
    firebase.auth().onAuthStateChanged(function (user) {
        if (!user) {
            window.location.href = "index.html";
        }
        else {
            window.location.href = "butler.html";
        }
    });
};

function openCompanies() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (!user) {
            window.location.href = "index.html";
        }
        else {
            window.location.href = "comp.html";
        }
    });
};

function openStatistics() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (!user) {
            window.location.href = "index.html";
        }
        else {
            window.location.href = "statistics.html";
        }
    });
};

function addDataPlan() {
    var from = document.getElementById("time-from").value;
    var to = document.getElementById("time-to").value;
    var hrs = document.getElementById("hrs").value;
    var low = document.getElementById("low-price").value;
    var high = document.getElementById("high-price").value;
    var svc = document.getElementById("inner-btn").innerHTML;
    var extHigh = "500";
    var extLow = "50";

    var plan = from + " to " + to;
    var database = firebase.database().ref().child("AllServices").child(svc).child(plan);

    if (from != "" && to != "" && hrs != "" && low != "" && high != "") {
        var planData =
        {
            "from": from,
            "to": to,
            "hrs": hrs,
            "lowPrice": low,
            "highPrice": high,
            "extraTimeHigh": extHigh,
            "extraTimeLow": extLow,
            "service": svc,
        };

        database.update(planData, function (error) {
            if (error) {
                var errorMessage = error.message;
                window.alert("Error: " + errorMessage);
            }
            else {
                window.alert("Data plan saved succesfully!");
            }
        });
    }
    else {
        window.alert("Please all fields are required!");
    }
}

function addNewSvc() {

    var from = document.getElementById("time-new-from").value;
    var to = document.getElementById("time-new-to").value;
    var hrs = document.getElementById("new-hrs").value;
    var low = document.getElementById("low-new-price").value;
    var high = document.getElementById("high-new-price").value;
    var svc = document.getElementById("new-svc").value;
    var extHigh = "500";
    var extLow = "50";

    if (svc == "") {
        window.alert("Please enter service name!!!");
    }

    var plan = from + " to " + to;
    var database = firebase.database().ref().child("AllServices").child(svc).child(plan);

    if (from != "" && to != "" && hrs != "" && low != "" && high != "") {

        document.getElementById("new-svc-bar").style.display = "block";

        var planData =
        {
            "from": from,
            "to": to,
            "hrs": hrs,
            "lowPrice": low,
            "highPrice": high,
            "extraTimeHigh": extHigh,
            "extraTimeLow": extLow,
            "service": svc,
        };

        database.update(planData, function (error) {
            if (error) {
                var errorMessage = error.message;
                window.alert("Error: " + errorMessage);
            }
            else {
                var menuDb = firebase.database().ref().child("AllServices").child("Names").child(svc);
                var menuData =
                {
                    "svc": svc,
                };

                menuDb.update(menuData, function (error) {
                    if (error) {
                        var errorMessage = error.message;
                        window.alert("Error: " + errorMessage);
                    }
                    else {
                        document.getElementById("new-svc-bar").style.display = "none";
                        window.alert("Service created succesfully!");
                        closeNewSvcDlg();
                    }
                });
            }
        });
    }
    else {
        window.alert("Please all fields are required!");
    }
}

function deleteSvc() {
    var svc = document.getElementById("inner-btn").innerHTML;
    var database = firebase.database().ref().child("AllServices").child(svc);

    database.remove(function (error) {
        if (error) {
            var errorMessage = error.message;
            window.alert("Error: " + errorMessage);
        }
        else {
            var svc = document.getElementById("inner-btn").innerHTML;
            var database = firebase.database().ref().child("AllServices").child("Names").child(svc);
            database.remove(function (error) {
                if (error) {
                    var errorMessage = error.message;
                    window.alert("Error: " + errorMessage);
                }
                else {
                    window.location.href = "work_space.html";
                }
            });
        }
    });
}

function addNewComp() {

    // var line = 'div id="comp-container"><div id="box-overview-data"></div>';
    var name = document.getElementById("new-comp-name").value;
    var tin = document.getElementById("tin-no").value;
    var area = document.getElementById("comp-area").value;
    var status = "Pending approval";
    var rating = 0.0;
    var numOfMaids = 0;
    var services = 0;
    var time = new Date();

    var options =
    {
        weekday: "long",
        month: "long",
        day: "2-digit",
        year: "numeric",
    };

    // var elem = document.createElement('div');
    // elem.id = 'box-overview-data';
    // document.getElementById("comp-container").appendChild(elem);
    //document.write(line)

    // closeNewCompDlg();

    if (name == "") {
        window.alert("Please enter company name!!!");
    }

    //var plan = from + " to " + to;
    var database = firebase.database().ref().child("Companies").child("Pending(approval)").child(name);

    if (tin != "" && area != "") {

        document.getElementById("new-svc-bar").style.display = "block";

        var planData =
        {
            "companyName": name,
            "tin": tin,
            "locatedAt": area,
            "status": status,
            "rating": rating,
            "numOfMaids": numOfMaids,
            "services": services,
            "time": time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
            "date": time.toLocaleDateString('en-US', options),
        };

        database.update(planData, function (error) {
            if (error) {
                var errorMessage = error.message;
                window.alert("Error: " + errorMessage);
            }
            else {
                document.getElementById("new-svc-bar").style.display = "none";
                //window.alert("Company created succesfully!");
                window.location.href = "comp.html";
            }
        });
    }
    else {
        window.alert("Please all fields are required!");
    }
}

function showEarns() {
    document.getElementById("side-plan-title").style.color = "rgb(155, 153, 153)";
    document.getElementById("side-new-earn").style.color = "rgb(3, 97, 160)";
    document.getElementById("wrapper").style.display = "none";
    document.getElementById("wrapper-earns").style.display = "block";
}

function showPlans() {
    document.getElementById("side-plan-title").style.color = "rgb(3, 97, 160)";
    document.getElementById("side-new-earn").style.color = "rgb(155, 153, 153)";
    document.getElementById("wrapper").style.display = "block";
    document.getElementById("wrapper-earns").style.display = "none";
}

function showOverview() {
    var data = document.getElementById("inner-nav-data");
    var overview = document.getElementById("inner-nav-usage");
    var docs = document.getElementById("inner-nav-docs");

    data.style.color = "rgb(63, 63, 65)";
    data.style.borderBottom = "3px solid rgba(33, 29, 247, 0)";
    docs.style.color = "rgb(63, 63, 65)";
    docs.style.borderBottom = "3px solid rgba(33, 29, 247, 0)";
    overview.style.color = "rgb(33, 29, 247)";
    overview.style.borderBottom = "3px solid rgb(33, 29, 247)";
    // document.getElementById("inner-box-overview").style.display = "block";
    // document.getElementById("inner-box-data").style.display = "none";
    $("#inner-box-data").fadeOut(200);
    $("#inner-box-about").fadeOut(200);
    $("#inner-box-kin").fadeOut(200);
    $("#inner-box-docs").fadeOut(200);
    $("#inner-box-overview").fadeIn(200);
}

function showData() {
    var data = document.getElementById("inner-nav-data");
    var overview = document.getElementById("inner-nav-usage");
    var docs = document.getElementById("inner-nav-docs");

    data.style.color = "rgb(33, 29, 247)";
    data.style.borderBottom = "3px solid rgb(33, 29, 247)";
    docs.style.color = "rgb(63, 63, 65)";
    docs.style.borderBottom = "3px solid rgba(33, 29, 247, 0)";
    overview.style.color = "rgb(63, 63, 65)";
    overview.style.borderBottom = "3px solid rgba(33, 29, 247, 0)";
    // document.getElementById("inner-box-overview").style.display = "none";
    // document.getElementById("inner-box-data").style.display = "block";
    $("#inner-box-data").fadeIn(200);
    $("#inner-box-about").fadeIn(200);
    $("#inner-box-kin").fadeIn(200);
    $("#inner-box-overview").fadeOut(200);
    $("#inner-box-docs").fadeOut(200);
}

function showDocs() {
    var data = document.getElementById("inner-nav-data");
    var overview = document.getElementById("inner-nav-usage");
    var docs = document.getElementById("inner-nav-docs");

    docs.style.color = "rgb(33, 29, 247)";
    docs.style.borderBottom = "3px solid rgba(33, 29, 247)";
    data.style.color = "rgb(63, 63, 65)";
    data.style.borderBottom = "3px solid rgb(33, 29, 247, 0)";
    overview.style.color = "rgb(63, 63, 65)";
    overview.style.borderBottom = "3px solid rgba(33, 29, 247, 0)";
    // document.getElementById("inner-box-overview").style.display = "none";
    // document.getElementById("inner-box-data").style.display = "block";
    $("#inner-box-data").fadeOut(200);
    $("#inner-box-about").fadeOut(200);
    $("#inner-box-kin").fadeOut(200);
    $("#inner-box-overview").fadeOut(200);
    $("#inner-box-docs").fadeIn(200);
}
// event listener for select box
// var selElm = document.getElementById("svc-drop-down");
// selElm.addEventListener("change", function (e) {
//     //setService();
//     if (e) {
//         setService();
//     }
//     else {
//         window.alert("Function not suppoted!");
//     }
// });

function setCompany() {

    var items = document.querySelectorAll("#svc-popup-menu button");
    for (var i = 0; i < items.length; i++) {
        items[i].onclick = function () {
            document.getElementById("inner-btn").innerHTML = this.innerHTML;
            document.getElementById("svc-popup-menu").style.display = "none";
            document.getElementById("popup-bg").style.display = "none";
            document.getElementById("bar").style.display = "block";
            //document.getElementById("svc-popup-menu").style.display = "none";
            var companyName = document.getElementById("inner-btn").innerHTML;
            //var svcMenu = document.getElementById("inner-btn").innerHTML = menuItem;

            if (companyName == "All Companies") {
                var dbMaids = firebase.database().ref().child("Users").child("TrueMukozi").orderByChild("rating");

                dbMaids.on("value", function (snapshort) {
                    if (snapshort.exists()) {
                        var maidItem = "";
                        var compItem = "";
                        snapshort.forEach(function (singleData) {
                            maidItem += "<div id='left-maid-list-item'>";

                            maidItem += "<img id='side-maid-pic' src='" +
                                singleData.val().profilePicUrl;
                            maidItem += "'/>";

                            maidItem += "<p id='side-maid-name'>" +
                                singleData.val().fullName;
                            maidItem += "</p>";

                            maidItem += "</div>";

                            compItem += "<div id='inner-section' onclick='setCompanyName()'>";
                            compItem += "<img style='border-radius: 50%;' src='" + singleData.val().profilePicUrl + "'/>";
                            compItem += "<div id='inner-line'></div>";
                            compItem += "<p id='comp-text'>" + singleData.val().fullName + "</p>";
                            compItem += "</div>";
                        });
                        document.getElementById("bar").style.display = "none";
                        document.getElementById("left-maid-list-holder").innerHTML = maidItem;
                        document.getElementById("comp-container").innerHTML = compItem;
                    }
                    else {
                        window.alert("No data available!");
                    }
                });
            }
            else {
                var dbMaids = firebase.database().ref().child("Vendors").child(companyName);

                dbMaids.on("value", function (snapshort) {
                    if (snapshort.exists()) {
                        var maidItem = "";
                        var compItem = "";
                        snapshort.forEach(function (singleData) {
                            maidItem += "<div id='left-maid-list-item'>";

                            maidItem += "<img id='side-maid-pic' src='" +
                                singleData.val().profilePicUrl;
                            maidItem += "'/>";

                            maidItem += "<p id='side-maid-name'>" +
                                singleData.val().givenName + " " + singleData.val().surName;
                            maidItem += "</p>";

                            maidItem += "</div>";

                            compItem += "<div id='inner-section' onclick='setCompanyName()'>";
                            compItem += "<img style='border-radius: 50%;' src='" + singleData.val().profilePicUrl + "'/>";
                            compItem += "<div id='inner-line'></div>";
                            compItem += "<p id='comp-text'>" + singleData.val().givenName + " " + singleData.val().surName + "</p>";
                            compItem += "</div>";
                        });
                        document.getElementById("bar").style.display = "none";
                        document.getElementById("left-maid-list-holder").innerHTML = maidItem;
                        document.getElementById("comp-container").innerHTML = compItem;
                    }
                    else {
                        window.alert("No data available!");
                    }
                });
            }
        };

    }
}

function setCompanyName() {

    var items = document.querySelector("#comp-container p");
    for (var i = 0; i < items.length; i++) {
        items[i].onclick = function () {
            document.getElementById("inner-btn").innerHTML = this.innerHTML;
            // document.getElementById("svc-popup-menu").style.display = "none";
            // document.getElementById("popup-bg").style.display = "none";
            document.getElementById("bar").style.display = "block";
            //document.getElementById("svc-popup-menu").style.display = "none";
            var companyName = document.getElementById("inner-btn").innerHTML;
            //var svcMenu = document.getElementById("inner-btn").innerHTML = menuItem;

            if (companyName == "All Companies") {
                var dbMaids = firebase.database().ref().child("Users").child("TrueMukozi").orderByChild("rating");

                dbMaids.on("value", function (snapshort) {
                    if (snapshort.exists()) {
                        var maidItem = "";
                        snapshort.forEach(function (singleData) {
                            maidItem += "<div id='left-maid-list-item'>";

                            maidItem += "<img id='side-maid-pic' src='" +
                                singleData.val().profilePicUrl;
                            maidItem += "'/>";

                            maidItem += "<p id='side-maid-name'>" +
                                singleData.val().fullName;
                            maidItem += "</p>";

                            maidItem += "</div>";
                        });
                        document.getElementById("bar").style.display = "none";
                        document.getElementById("left-maid-list-holder").innerHTML = maidItem;
                    }
                    else {
                        window.alert("No data available!");
                    }
                });
            }
            else {
                var dbMaids = firebase.database().ref().child("Companies").child(companyName);

                dbMaids.on("value", function (snapshort) {
                    if (snapshort.exists()) {
                        var maidItem = "";
                        snapshort.forEach(function (singleData) {
                            maidItem += "<div id='left-maid-list-item'>";

                            maidItem += "<img id='side-maid-pic' src='" +
                                singleData.val().profilePicUrl;
                            maidItem += "'/>";

                            maidItem += "<p id='side-maid-name'>" +
                                singleData.val().givenName + " " + singleData.val().surName;
                            maidItem += "</p>";

                            maidItem += "</div>";
                        });
                        document.getElementById("bar").style.display = "none";
                        document.getElementById("left-maid-list-holder").innerHTML = maidItem;
                    }
                    else {
                        window.alert("No data available!");
                    }
                });
            }
        };

    }
}

function setService() {

    var items = document.querySelectorAll("#svc-popup-menu button");
    for (var i = 0; i < items.length; i++) {
        items[i].onclick = function () {
            document.getElementById("inner-btn").innerHTML = this.innerHTML;
            document.getElementById("svc-popup-menu").style.display = "none";
            document.getElementById("popup-bg").style.display = "none";
            document.getElementById("bar").style.display = "block";
            //document.getElementById("svc-popup-menu").style.display = "none";
            var menuItem = document.getElementById("inner-btn").innerHTML;
            //var svcMenu = document.getElementById("inner-btn").innerHTML = menuItem;

            var dbService = firebase.database().ref().child("AllServices").child(menuItem).orderByChild("hrs");

            dbService.on("value", function (snapshort) {
                if (snapshort.exists()) {
                    var svcData = "";
                    var svcNav = "";
                    snapshort.forEach(function (singleData) {

                        svcData += "<div id='data-inner-item'>";
                        svcData += "<button id='data-item-plan'>" +
                            singleData.val().from + " to " + singleData.val().to
                            + "</button>" +
                            "<button id='data-item-hrs'>" +
                            singleData.val().hrs + " hour(s)"
                            + "</button>" +
                            "<button id='data-item-low'>" +
                            "UGX " + singleData.val().lowPrice + ".00"
                            + "</button>" +
                            "<button id='data-item-high'>" +
                            "UGX " + singleData.val().highPrice + ".00"
                            + "</button>";
                        svcData += "</div>";
                    });

                    svcNav += "<div id='data-nav-item'>";
                    svcNav += "<button id='data-nav-title'>" +
                        "Plan"
                        + "</button>" +
                        "<button id='data-nav-title'>" +
                        "Hours"
                        + "</button>" +
                        "<button id='data-nav-title'>" +
                        "Lowest price"
                        + "</button>" +
                        "<button id='data-nav-title'>" +
                        "Highest price"
                        + "</button>";
                    svcNav += "</div>";

                    document.getElementById("bar").style.display = "none";
                    document.getElementById("inner-data-container").innerHTML = svcData;
                    document.getElementById("data-inner-nav").innerHTML = svcNav;
                }
                else {
                    var errorMessage = "No data exists for selected service!!";
                    window.alert("Error: " + errorMessage);
                }
            });
        };

    }
}

function openMenuOpt() {
    document.getElementById("popup-bg").style.display = "block";
    //document.getElementById("svc-popup-menu").style.display = "block";
    $('#svc-popup-menu').fadeIn(200);
}

function openMainMenuOpt() {
    document.getElementById("popup-bg").style.display = "block";
    //document.getElementById("main-popup-menu").style.display = "block";
    $('#main-popup-menu').fadeIn(200);
}

var head = document.getElementById('head');
window.onscroll = function () {
    if (window.pageYOffset > 100) {
        this.head.style.background = "#59ADFF";
        this.head.style.webkitBoxShadow = "0 0 10px rgb(0,0,0)";
        // this.head.style.boxShadow = "-1px 1px #77aaff, -2px 2px #77aaff, -3px 3px #77aaff, 4px 4px #77aaff, -5px 5px #77aaff";
    }
    else {
        this.head.style.background = "rgba(255, 0, 0, 0)";
        this.head.style.boxShadow = "-1px 1px rgba(255, 0, 0, 0), -2px 2px rgba(255, 0, 0, 0), -3px 3px rgba(255, 0, 0, 0), 4px 4px rgba(255, 0, 0, 0), -5px 5px rgba(255, 0, 0, 0)";
    }
}

function closeAllPopup() {
    document.getElementById("popup-bg").style.display = "none";
    document.getElementById("svc-popup-menu").style.display = "none";
    document.getElementById("main-popup-menu").style.display = "none";
    $('#svc-offered').fadeOut(200);
    $('#svc-offered-reg').fadeOut(200);
}

function showNewComp() {
    window.location.href = "verify_comp.html";
}

var svc1 = "- - -"
var svc2 = "- - -"
var svc3 = "- - -"
var svc4 = "- - -"
var services;
var compName;
var compArea;
var tin;
var busiType;
var regNo;
var city;
var mail;
var phone;
var boxNo;
var maids;
var lcUrl;
var certUrl;
function showCompData() {

    var item = document.querySelectorAll("#req-btn span");
    for (var i = 0; i < item.length; i++) {
        item[i].onclick = function () {
            document.getElementById("inner-btn").innerHTML = this.innerHTML;
            $("#svc-popup-menu").fadeOut(200);
            $("#popup-bg").fadeOut(200);
            //document.getElementById("bar").style.display = "block";
            $("#all-companies").fadeOut(200);
            $("#wrapper").fadeIn(200);
            var menuItem = document.getElementById("inner-btn").innerHTML;

            var dbCompany = firebase.database().ref().child("Vendors").child(menuItem);

            dbCompany.on("value", function (snapshort) {
                if (snapshort.exists()) {
                    compName = snapshort.child("name").val();
                    compArea = snapshort.child("addressStreet").val();
                    tin = snapshort.child("tin").val();
                    busiType = snapshort.child("category").val();
                    regNo = snapshort.child("registeredNo").val();
                    city = snapshort.child("addressCity").val();
                    mail = snapshort.child("email").val();
                    phone = snapshort.child("fullPhoneNumber").val();
                    boxNo = snapshort.child("boxNo").val();
                    maids = snapshort.child("numOfMaids").val();
                    lcUrl = snapshort.child("lcUrl").val();
                    certUrl = snapshort.child("certUrl").val();
                    services = snapshort.child("services").val();
                    svc1 = snapshort.child("svc1").val();
                    svc2 = snapshort.child("svc2").val();
                    svc3 = snapshort.child("svc3").val();
                    svc4 = snapshort.child("svc4").val();

                    document.getElementById("new-comp-name").innerHTML = compName;
                    document.getElementById("new-comp-area").innerHTML = compArea;
                    document.getElementById("new-comp-tin").innerHTML = tin;
                    document.getElementById("comp-busi-type").innerHTML = busiType;
                    document.getElementById("new-comp-reg").innerHTML = regNo;
                    document.getElementById("new-comp-maids").innerHTML = maids;
                    document.getElementById("new-comp-phone").innerHTML = phone;
                    document.getElementById("new-comp-mail").innerHTML = mail;
                    document.getElementById("new-comp-city").innerHTML = city;
                    document.getElementById("new-comp-box").innerHTML = boxNo;
                    document.getElementById("view-lc").href = lcUrl;
                    document.getElementById("view-cert").href = certUrl;
                    document.getElementById("svc-1").innerHTML = svc1;
                    document.getElementById("svc-2").innerHTML = svc2;
                    document.getElementById("svc-3").innerHTML = svc3;
                    document.getElementById("svc-4").innerHTML = svc4;
                }
                // else {
                //     var errorMessage = "Action success!";
                //     window.alert(errorMessage);
                // }
            });
        };
    }
}

function selectCompData() {

    var item = document.querySelectorAll("#svc-popup-menu button");
    for (var i = 0; i < item.length; i++) {
        item[i].onclick = function () {
            document.getElementById("inner-btn").innerHTML = this.innerHTML;
            $("#svc-popup-menu").fadeOut(200);
            $("#popup-bg").fadeOut(200);
            //document.getElementById("bar").style.display = "block";
            $("#all-companies").fadeOut(200);
            $("#wrapper").fadeIn(200);
            var menuItem = document.getElementById("inner-btn").innerHTML;

            var dbCompany = firebase.database().ref().child("Vendors").child(menuItem);

            dbCompany.on("value", function (snapshort) {
                if (snapshort.exists()) {
                    compName = snapshort.child("name").val();
                    compArea = snapshort.child("addressStreet").val();
                    tin = snapshort.child("tin").val();
                    busiType = snapshort.child("category").val();
                    regNo = snapshort.child("registeredNo").val();
                    city = snapshort.child("addressCity").val();
                    mail = snapshort.child("email").val();
                    phone = snapshort.child("fullPhoneNumber").val();
                    boxNo = snapshort.child("boxNo").val();
                    maids = snapshort.child("numOfMaids").val();
                    lcUrl = snapshort.child("lcUrl").val();
                    certUrl = snapshort.child("certUrl").val();
                    svc1 = snapshort.child("svc1").val();
                    svc2 = snapshort.child("svc2").val();
                    svc3 = snapshort.child("svc3").val();
                    svc4 = snapshort.child("svc4").val();

                    document.getElementById("new-comp-name").innerHTML = compName;
                    document.getElementById("new-comp-area").innerHTML = compArea;
                    document.getElementById("new-comp-tin").innerHTML = tin;
                    document.getElementById("comp-busi-type").innerHTML = busiType;
                    document.getElementById("new-comp-reg").innerHTML = regNo;
                    document.getElementById("new-comp-maids").innerHTML = maids;
                    document.getElementById("new-comp-phone").innerHTML = phone;
                    document.getElementById("new-comp-mail").innerHTML = mail;
                    document.getElementById("new-comp-city").innerHTML = city;
                    document.getElementById("new-comp-box").innerHTML = boxNo;
                    document.getElementById("view-lc").href = lcUrl;
                    document.getElementById("view-cert").href = certUrl;
                    document.getElementById("svc-1").innerHTML = svc1;
                    document.getElementById("svc-2").innerHTML = svc2;
                    document.getElementById("svc-3").innerHTML = svc3;
                    document.getElementById("svc-4").innerHTML = svc4;
                }
                // else
                // {
                //     var errorMessage = "Action success!";
                //     window.alert(errorMessage);
                // }
            });
        };
    }
}

function showVerifiedComp() {

    var item = document.querySelectorAll("#more-about-comp-btn p");
    for (var i = 0; i < item.length; i++) {
        item[i].onclick = function () {
            document.getElementById("inner-btn").innerHTML = this.innerHTML;
            $("#svc-popup-menu").fadeOut(200);
            $("#popup-bg").fadeOut(200);
            //document.getElementById("bar").style.display = "block";
            $("#all-companies").fadeOut(200);
            $("#wrapper").fadeIn(200);
            var menuItem = document.getElementById("inner-btn").innerHTML;

            var dbCompany = firebase.database().ref().child("Vendors").child(menuItem);

            dbCompany.on("value", function (snapshort) {
                if (snapshort.exists()) {
                    compName = snapshort.child("name").val();
                    compArea = snapshort.child("locatedAt").val();
                    tin = snapshort.child("tin").val();
                    busiType = snapshort.child("business").val();
                    regNo = snapshort.child("registeredNo").val();
                    city = snapshort.child("city").val();
                    mail = snapshort.child("email").val();
                    phone = snapshort.child("contactNo").val();
                    boxNo = snapshort.child("boxNo").val();
                    maids = snapshort.child("numOfMaids").val();
                    lcUrl = snapshort.child("lcUrl").val();
                    certUrl = snapshort.child("certUrl").val();
                    services = snapshort.child("services").val();
                    svc1 = snapshort.child("svc1").val();
                    svc2 = snapshort.child("svc2").val();
                    svc3 = snapshort.child("svc3").val();
                    svc4 = snapshort.child("svc4").val();

                    document.getElementById("new-comp-name").innerHTML = compName;
                    document.getElementById("new-comp-area").innerHTML = compArea;
                    document.getElementById("new-comp-tin").innerHTML = tin;
                    document.getElementById("comp-busi-type").innerHTML = busiType;
                    document.getElementById("new-comp-reg").innerHTML = regNo;
                    document.getElementById("new-comp-maids").innerHTML = maids;
                    document.getElementById("new-comp-phone").innerHTML = phone;
                    document.getElementById("new-comp-mail").innerHTML = mail;
                    document.getElementById("new-comp-city").innerHTML = city;
                    document.getElementById("new-comp-box").innerHTML = boxNo;
                    document.getElementById("view-lc").href = lcUrl;
                    document.getElementById("view-cert").href = certUrl;
                    document.getElementById("svc-1").innerHTML = svc1;
                    document.getElementById("svc-2").innerHTML = svc2;
                    document.getElementById("svc-3").innerHTML = svc3;
                    document.getElementById("svc-4").innerHTML = svc4;
                }
                // else {
                //     var errorMessage = "Action success!";
                //     window.alert(errorMessage);
                // }
            });
        };
    }
}

function selectVerifiedComp() {

    var item = document.querySelectorAll("#svc-popup-menu button");
    for (var i = 0; i < item.length; i++) {
        item[i].onclick = function () {
            document.getElementById("inner-btn").innerHTML = this.innerHTML;
            $("#svc-popup-menu").fadeOut(200);
            $("#popup-bg").fadeOut(200);
            //document.getElementById("bar").style.display = "block";
            $("#all-companies").fadeOut(200);
            $("#wrapper").fadeIn(200);
            var menuItem = document.getElementById("inner-btn").innerHTML;

            var dbCompany = firebase.database().ref().child("Vendors").child(menuItem);

            dbCompany.on("value", function (snapshort) {
                if (snapshort.exists()) {
                    compName = snapshort.child("name").val();
                    compArea = snapshort.child("addressStreet").val();
                    tin = snapshort.child("tin").val();
                    busiType = snapshort.child("category").val();
                    regNo = snapshort.child("registeredNo").val();
                    city = snapshort.child("addressCity").val();
                    mail = snapshort.child("email").val();
                    phone = snapshort.child("fullPhoneNumber").val();
                    boxNo = snapshort.child("boxNo").val();
                    maids = snapshort.child("reviews").val();
                    lcUrl = snapshort.child("legalDocUrl").val();
                    certUrl = snapshort.child("certUrl").val();
                    svc1 = snapshort.child("svc1").val();
                    svc2 = snapshort.child("svc2").val();
                    svc3 = snapshort.child("svc3").val();
                    svc4 = snapshort.child("svc4").val();

                    document.getElementById("new-comp-name").innerHTML = compName;
                    document.getElementById("new-comp-area").innerHTML = compArea;
                    document.getElementById("new-comp-tin").innerHTML = tin;
                    document.getElementById("comp-busi-type").innerHTML = busiType;
                    document.getElementById("new-comp-reg").innerHTML = regNo;
                    document.getElementById("new-comp-maids").innerHTML = maids;
                    document.getElementById("new-comp-phone").innerHTML = phone;
                    document.getElementById("new-comp-mail").innerHTML = mail;
                    document.getElementById("new-comp-city").innerHTML = city;
                    document.getElementById("new-comp-box").innerHTML = boxNo;
                    document.getElementById("view-lc").href = lcUrl;
                    document.getElementById("view-cert").href = certUrl;
                    document.getElementById("svc-1").innerHTML = svc1;
                    document.getElementById("svc-2").innerHTML = svc2;
                    document.getElementById("svc-3").innerHTML = svc3;
                    document.getElementById("svc-4").innerHTML = svc4;
                }
                // else
                // {
                //     var errorMessage = "Action success!";
                //     window.alert(errorMessage);
                // }
            });
        };
    }
}

function selectCompFromList() {

    var item = document.querySelectorAll("#left-maid-list-item p");
    for (var i = 0; i < item.length; i++) {
        item[i].onclick = function () {
            document.getElementById("inner-btn").innerHTML = this.innerHTML;
            $("#svc-popup-menu").fadeOut(200);
            $("#popup-bg").fadeOut(200);
            //document.getElementById("bar").style.display = "block";
            $("#all-companies").fadeOut(200);
            $("#wrapper").fadeIn(200);
            var menuItem = document.getElementById("inner-btn").innerHTML;

            var dbCompany = firebase.database().ref().child("Vendors").child(menuItem);

            dbCompany.on("value", function (snapshort) {
                if (snapshort.exists()) {
                    compName = snapshort.child("name").val();
                    compArea = snapshort.child("addressStreet").val();
                    tin = snapshort.child("tin").val();
                    busiType = snapshort.child("category").val();
                    regNo = snapshort.child("registeredNo").val();
                    city = snapshort.child("addressCity").val();
                    mail = snapshort.child("email").val();
                    phone = snapshort.child("fullPhoneNumber").val();
                    boxNo = snapshort.child("boxNo").val();
                    maids = snapshort.child("reviews").val();
                    lcUrl = snapshort.child("legalDocUrl").val();
                    certUrl = snapshort.child("certUrl").val();
                    svc1 = snapshort.child("svc1").val();
                    svc2 = snapshort.child("svc2").val();
                    svc3 = snapshort.child("svc3").val();
                    svc4 = snapshort.child("svc4").val();

                    document.getElementById("new-comp-name").innerHTML = compName;
                    document.getElementById("new-comp-area").innerHTML = compArea;
                    document.getElementById("new-comp-tin").innerHTML = tin;
                    document.getElementById("comp-busi-type").innerHTML = busiType;
                    document.getElementById("new-comp-reg").innerHTML = regNo;
                    document.getElementById("new-comp-maids").innerHTML = maids;
                    document.getElementById("new-comp-phone").innerHTML = phone;
                    document.getElementById("new-comp-mail").innerHTML = mail;
                    document.getElementById("new-comp-city").innerHTML = city;
                    document.getElementById("new-comp-box").innerHTML = boxNo;
                    document.getElementById("view-lc").href = lcUrl;
                    document.getElementById("view-cert").href = certUrl;
                    document.getElementById("svc-1").innerHTML = svc1;
                    document.getElementById("svc-2").innerHTML = svc2;
                    document.getElementById("svc-3").innerHTML = svc3;
                    document.getElementById("svc-4").innerHTML = svc4;
                }
                // else
                // {
                //     var errorMessage = "Action success!";
                //     window.alert(errorMessage);
                // }
            });
        };
    }
}

function verifyComp() {

    $('#dlg-verify-comp').fadeOut(400);
    $('#upload-bar').fadeIn(400);

    var status = "Verified";
    var rating = 0.0;
    var time = new Date();

    var options =
    {
        weekday: "long",
        month: "long",
        day: "2-digit",
        year: "numeric",
    };

    var database = firebase.database().ref().child("Companies").child("New").child(compName);
    var planData =
    {
        "companyName": compName,
        "tin": tin,
        "locatedAt": compArea,
        "registeredNo": regNo,
        "business": busiType,
        "numOfMaids": maids,
        "contactNo": phone,
        "email": mail,
        "city": city,
        "boxNo": boxNo,
        "lcUrl": lcUrl,
        "certUrl": certUrl,
        "svc1": svc1,
        "svc2": svc2,
        "svc3": svc3,
        "svc4": svc4,
        "status": status,
        "rating": rating,
        "services": services,
        "time": time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
        "date": time.toLocaleDateString('en-US', options),
    };

    database.update(planData, function (error) {
        if (error) {
            var errorMessage = error.message;
            window.alert("Error: " + errorMessage);
        }
        else {
            var delRef = firebase.database().ref().child("Companies").child("Pending(approval)").child(compName);
            delRef.remove(function (error) {
                if (error) {
                    var errorMessage = error.message;
                    window.alert("Error: " + errorMessage);
                }
                else {
                    var delSusRef = firebase.database().ref().child("Companies").child("Suspended").child(compName);
                    if (delSusRef != null) {
                        delSusRef.remove(function (error) {
                            if (error) {
                                var errorMessage = error.message;
                                window.alert("Error: " + errorMessage);
                            }
                            else {
                                window.location.href = "verify_comp.html";
                            }
                        });
                    }
                    else {
                        window.location.href = "verify_comp.html";
                    }
                }
            });
        }
    });
}

function suspendComp() {

    $("#dlg-suspend-comp").fadeOut(400);
    $('#upload-bar').fadeIn(400);

    var sus = compName;
    var approved = "Approved";
    var rating = 0.0;
    var time = new Date();

    var options =
    {
        weekday: "long",
        month: "long",
        day: "2-digit",
        year: "numeric",
    };

    var database = firebase.database().ref().child("Vendors").child(compName);
    var planData =
    {
        "approved": approved,
    };

    database.update(planData, function (error) {
        if (error) {
            var errorMessage = error.message;
            window.alert("Error: " + errorMessage);
        }
        else {
            window.location.href = "comp.html";
        }
    });
}

function showSvcOfferedDlg() {
    $('#popup-bg').fadeIn(200);
    $('#svc-offered').fadeIn(200);
    // var dlgBg = document.getElementById("dlg-background");
}

function showSvcOfferedReg() {
    var panelHeight = parseInt($('.svc-offered-reg').css('max-height'));
    var btn = document.getElementById("btn-svc-offer-reg").innerHTML;
    var expanded = true;

    if (expanded) {
        panelHeight = 430;
        $('.field-section-comp-nature').addClass('field-section-comp-nature-sroll');
        $('.svc-offered-reg').animate({ 'max-height': 270 }, 500);
        $('#svc-wrapper').animate({ 'top': panelHeight }, 500);
        expanded = true;
    }
    else if (!expanded) {
        panelHeight = 32;
        $('.field-section-comp-nature').removeClass('field-section-comp-nature-sroll');
        $('.svc-offered-reg').animate({ 'max-height': 0 }, 500);
        $('#svc-wrapper').animate({ 'top': panelHeight }, 500);
        expanded = false;
    }

    // var btn = document.getElementById("btn-svc-offer");
    // var content = document.getElementsByClassName("svc-offered-reg");

}

function viewLcLetter() {
    //window.location.href = "https://firebasestorage.googleapis.com/v0/b/matsofti-e0da6.appspot.com/o/academic_docs%2FLolita%20Nansamba?alt=media&token=836f585c-aeb3-46f3-a58d-32c7b15bbc7d";
}

function openVerCompDlg() {
    $('#dlg-background').fadeIn(200);
    $('#dlg-verify-comp').fadeIn(200);
}

function closeVerCompDlg() {
    $('#dlg-background').fadeOut(200);
    $('#dlg-verify-comp').fadeOut(200);
}

(function ($) {
    $(document).ready(function () {
        /*-------------------- EXPANDABLE PANELS ----------------------*/
        var panelspeed = 500; //panel animate speed in milliseconds
        var totalpanels = 3; //total number of collapsible panels
        var defaultopenpanel = 0; //leave 0 for no panel open
        var accordian = false; //set panels to behave like an accordian, with one panel only ever open at once      

        var panelheight = new Array();
        var currentpanel = defaultopenpanel;
        var iconheight = parseInt($('.icon-close-open').css('height'));
        var highlightopen = true;

        //Initialise collapsible panels
        function panelinit() {
            for (var i = 1; i <= totalpanels; i++) {
                panelheight[i] = parseInt($('#cp-' + i).find('.expandable-panel-content').css('height'));
                $('#cp-' + i).find('.expandable-panel-content').css('margin-top', -panelheight[i]);
                if (defaultopenpanel == i) {
                    $('#cp-' + i).find('.icon-close-open').css('background-position', '0px -' + iconheight + 'px');
                    $('#cp-' + i).find('.expandable-panel-content').css('margin-top', 0);
                }
            }
        }

        $('.expandable-panel-heading').click(function () {
            var obj = $(this).next();
            var objid = parseInt($(this).parent().attr('ID').substr(3, 2));
            currentpanel = objid;
            if (accordian == true) {
                resetpanels();
            }

            if (parseInt(obj.css('margin-top')) <= (panelheight[objid] * -1)) {
                obj.clearQueue();
                obj.stop();
                obj.prev().find('.icon-close-open').css('background-position', '0px -' + iconheight + 'px');
                obj.animate({ 'margin-top': 0 }, panelspeed);
                if (highlightopen == true) {
                    $('#cp-' + currentpanel + ' .expandable-panel-heading').addClass('header-active');
                }
            } else {
                obj.clearQueue();
                obj.stop();
                obj.prev().find('.icon-close-open').css('background-position', '0px 0px');
                obj.animate({ 'margin-top': (panelheight[objid] * -1) }, panelspeed);
                if (highlightopen == true) {
                    $('#cp-' + currentpanel + ' .expandable-panel-heading').removeClass('header-active');
                }
            }
        });

        function resetpanels() {
            for (var i = 1; i <= totalpanels; i++) {
                if (currentpanel != i) {
                    $('#cp-' + i).find('.icon-close-open').css('background-position', '0px 0px');
                    $('#cp-' + i).find('.expandable-panel-content').animate({ 'margin-top': -panelheight[i] }, panelspeed);
                    if (highlightopen == true) {
                        $('#cp-' + i + ' .expandable-panel-heading').removeClass('header-active');
                    }
                }
            }
        }

        //Uncomment these lines if the expandable panels are not a fixed width and need to resize
        /* $( window ).resize(function() {
           panelinit();
         });*/

        $(window).load(function () {
            panelinit();
        }); //END LOAD
    }); //END READY
})(jQuery);

function refreshPage() {
    window.location.href = "comp_register.html";
}

