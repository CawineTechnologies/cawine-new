let body = document.querySelector('body');


document.querySelector('.menu_btn').addEventListener('click', function () {
    body.classList.add('open');
});

document.getElementById('close_menu').addEventListener('click', function() {
    // document.querySelector('menu').style.display = "block";
    body.classList.remove('open');
});

let openTwitter = () => {
    window.location.assign("https://twitter.com/cawineapp?t=8TQ3fcp1xOhoSzvXXdLowA&s=08");
}

let openFacebook = () => {
    window.location.assign("https://www.facebook.com/cawineapp?mibextid=ZbWKwL");
}

let openInstagram = () => {
    window.location.assign("https://instagram.com/cawineapp?igshid=MzNlNGNkZWQ4Mg==");
}

let openLinkedin = () => {
    window.location.assign("https://www.linkedin.com/company/cawine/");
}

let openTiktok = () => {
    window.location.assign("https://www.tiktok.com/@cawineapp?_t=8cv3lTKFGgn&_r=1");
}

let openYutube = () => {
    window.location.assign("https://youtube.com/@cawineapp");
}

let openPinterest = () => {
    window.location.assign("https://pin.it/2VcvDek");
}

let openUser = () => {
    window.location.assign("https://play.google.com/store/apps/details?id=com.supriminnovations.cawineuser");
}

let openCEO = () => {
    window.location.assign("https://www.linkedin.com/in/ivan-juuko-dip-cii-awb-cpam-f-gafm%C2%AE-dip-iiu-mcmi-91428a110");
}

let openCPO = () => {
    window.location.assign("https://www.linkedin.com/in/christine-nimusiima-msc-fst-669bb3215");
}