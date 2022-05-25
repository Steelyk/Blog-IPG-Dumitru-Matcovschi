const firebaseConfig = {
    apiKey: "AIzaSyD8qk34eZsgKLosp6uF1JnwQdHmH1M_Jhk",
    authDomain: "blog-scoala-d5ee4.firebaseapp.com",
    projectId: "blog-scoala-d5ee4",
    storageBucket: "blog-scoala-d5ee4.appspot.com",
    messagingSenderId: "752328059342",
    appId: "1:752328059342:web:b27791b3764e16d89a239f",
    measurementId: "G-08T1MRGHB5"
  };

function mobileMenu() {
    var x = document.getElementById("navbar");
    if (x.className === "") {
        x.className = "mobile";
    } else {
        x.className = "";
    }
}

const yearElement = document.getElementById('year');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const postareBtn = document.getElementById('postare-btn');
const salutare = document.getElementById('username');

let user = null;
let admins = ["1ZH97bqmkuWXGTJH8R9xDKwMsIn93"];

// setăm bazele firebase, ne conectăm la serviciu
firebase.initializeApp(firebaseConfig);

// referința la serviciul de autentificare
const auth = firebase.auth();

// referinta la baza de date
const db = firebase.firestore();

//referinta la colectie de postari din BD
const postariDb = db.collection('postari');

// alegem providerul de logare -> Google
const provider = new firebase.auth.GoogleAuthProvider();

loginBtn.onclick = function() {
    console.log("logare...");
    auth.signInWithPopup(provider).then(function() { window.location.reload(); });
}

logoutBtn.onclick = function() {
    auth.signOut();
    window.location.reload();
}

function isAdmin() {
    let admin;

    if (user == null)
        return false;
    
    admin = admins.includes(user.uid); // true or false

    return admin;
}

function formatDate(time) {
    let date = new Date(time);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    let result = day + "-" + month + "-" + year;

    return result; 
}

auth.onAuthStateChanged(function(fuser) {
    user = fuser;
    console.log(user);
    if (user != null) {
        // logat în sistem
        logoutBtn.style.display = "block";
        loginBtn.style.display = "none";

        salutare.innerHTML = "Salutare, " +  user.displayName;

        if (isAdmin() == true) {
            postareBtn.style.display = 'block';
        }
        else {
            postareBtn.style.display = 'none';
        }
    }
    else {
        // nu e logat în sistem
        logoutBtn.style.display = "none";
        loginBtn.style.display = "block";
        postareBtn.style.display = 'none';
    }

    document.querySelector('body').style.display = "block";
})


if (yearElement) {
    let date = new Date();
    
    yearElement.innerHTML = date.getFullYear() + " ©";
}

