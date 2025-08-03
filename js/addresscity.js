

let userId = localStorage.getItem("user_id");
let next_btn = document.getElementById('next-btn');

window.console.log(userId);

next_btn.addEventListener('click', (e) => {
    let address_val = document.getElementById('input-address').value;
    let city_value = document.getElementById('input-city').value;
    if (address_val === "" && city_value === "") {
        alert("All fields are requiered!");
        return;
    }
    localStorage.setItem("address", address_val);
    localStorage.setItem("city", city_value);
    localStorage.setItem("user_id", userId);
    window.location.assign("dodelivery.html");
});