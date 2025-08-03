
let already_btn = document.getElementById('alread-have-acc-btn');
let continue_btn = document.getElementById('continue-btn');
let input_email = document.getElementById('input-email');
let input_password = document.getElementById('input-password');
let input_ppromo = document.getElementById('input-business-name');
let check_terms = document.getElementById('check-terms');

already_btn.addEventListener('click', (e) => {
    window.location.assign('signin.html');
});

continue_btn.addEventListener('click', (e) => {
    if (input_email.value != "" && input_password.value != "" && check_terms.checked === true) {
        localStorage.setItem("email", input_email.value);
        localStorage.setItem("password", input_password.value);
        localStorage.setItem('promo_code', input_ppromo.value);
        window.location.assign('namecat.html');
    } else {
        alert("All fields are requiered!");
    }
});