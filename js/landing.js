import { initializeApp } from "firebase/app";
import { useNavigate } from "react-router-dom";

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
initializeApp(firebaseConfig);


const navbar = document.getElementById('landing-nav-bar');

export const ScrollPage = () => {
    window.onscroll = function () {
    if (window.scrollY > 600) {
        navbar.style.display = "flex";
    } else {
        navbar.style.display = "none";
    }
  }
}

export const initLocation = () => {
    let user_location = localStorage.getItem("user_location");
    if (user_location != null && user_location != "") {
        document.getElementById('landing-location').innerHTML = user_location;
        console.log(user_location);
    } else {
        var latitude = 0;
        var longitude = 0;
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
                        console.log(placeName);
                        document.getElementById('landing-location').innerHTML = placeName;
                    }).catch(error => console.error('Error: ', error));
            });
        }
    }
}

initLocation();

export const OpenMaps = () => {
    const navigate = useNavigate();
    localStorage.setItem("bundle", "landing");
    navigate('/places');
}

export const OpenLogin = () => {
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/login');
    }
    return handleLogin;
}

export const OpenRegister = () => {
    const navigate = useNavigate();
    navigate('/register');
}

export const OpenClab = () => {
    const navigate = useNavigate();
    let vendorId = "vIvr0QCBFfPXUhLcP4DRHsWs4jZ2";
    localStorage.setItem("vendor_id", vendorId);
    navigate('/demo');
}

export const OpenRoof = () => {
    const navigate = useNavigate();
    let vendorId = "kc2ddjgVT0efzPaVFUZkbwKQM6h1";
    localStorage.setItem("vendor_id", vendorId);
    navigate('/demo');
}

export const OpenWise = () => {
    const navigate = useNavigate();
    let vendorId = "iu6NGAQdmvRZChAPj6nsIKIjZh52";
    localStorage.setItem("vendor_id", vendorId);
    navigate('/demo');
}

export const OpenEandD = () => {
    const navigate = useNavigate();
    let vendorId = "mgEzfpeos7VIe2cx0v6Qkav8KQL2";
    localStorage.setItem("vendor_id", vendorId);
    navigate('/demo');
}

export const OpenVendorApp = () => {
    const navigate = useNavigate();
    navigate("https://play.google.com/store/apps/details?id=com.supriminnovations.cawin");
}

export const OpencourierApp = () => {
    const navigate = useNavigate();
    navigate("https://play.google.com/store/apps/details?id=com.supriminnovations.cawinecourier");
}

export const OpenUser = () => {
    const navigate = useNavigate();
    navigate("https://play.google.com/store/apps/details?id=com.supriminnovations.cawineuser");
}
// socials
export const OpenTwiter = () => {
    const navigate = useNavigate();
    navigate("https://twitter.com/cawineapp?t=8TQ3fcp1xOhoSzvXXdLowA&s=08");
}

export const OpenFacebook = () => {
    const navigate = useNavigate();
    navigate("https://www.facebook.com/cawineapp?mibextid=ZbWKwL");
}

export const OpenIntagram = () => {
    const navigate = useNavigate();
    navigate("https://instagram.com/cawineapp?igshid=MzNlNGNkZWQ4Mg==");
}

export const OpenLinkedin = () => {
    const navigate = useNavigate();
    navigate("https://www.linkedin.com/company/cawine/");
}

export const OpenTiktok = () => {
    const navigate = useNavigate();
    navigate("https://www.tiktok.com/@cawineapp?_t=8cv3lTKFGgn&_r=1");
}

export const OpenYutube = () => {
    const navigate = useNavigate();
    navigate("https://youtube.com/@cawineapp");
}

export const OpenPinterest = () => {
    const navigate = useNavigate();
    navigate("https://pin.it/2VcvDek");
}