

let userId = localStorage.getItem("user_id");
let join_btn = document.getElementById('join-btn');
let alread_have_btn = document.getElementById('alread-have-acc-btn');

// console.log(userId);

join_btn.addEventListener('click', (e) => {
    window.location.assign("signup.html");
});

alread_have_btn.addEventListener('click', (e) => {
    window.location.assign("signin.html");
});