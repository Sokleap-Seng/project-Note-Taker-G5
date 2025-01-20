// DOM Elements
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
const signUpButton_mobile = document.getElementById('signUp_mobile');
const signInButton_mobile = document.getElementById('signIn_mobile');

// Toggle Panels for Desktop
if (signUpButton) {
    signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
    });
}

if (signInButton) {
    signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
    });
}

// Toggle Panels for Mobile
if (signUpButton_mobile) {
    signUpButton_mobile.addEventListener('click', () => {
        container.classList.add("right-panel-active");
    });
}

if (signInButton_mobile) {
    signInButton_mobile.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
    });
}

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyCtsiqP8mIKB-fB96pRS3MV3XZIMIah7dY",
    authDomain: "login-form-f2de3.firebaseapp.com",
    projectId: "login-form-f2de3",
    storageBucket: "login-form-f2de3.appspot.com",
    messagingSenderId: "909128181597",
    appId: "1:909128181597:web:a180c0abccf31e5bd22ab4"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);

// Get reference to the sign-up form
const signUpForm = document.querySelector(".sign-up-container form");

// Listen for the form submit event
if (signUpForm) {
    signUpForm.addEventListener("submit", (event) => {
        event.preventDefault();

        // Get user inputs
        const name = signUpForm.querySelector("input[placeholder='Name']").value;
        const email = signUpForm.querySelector("input[placeholder='Email']").value;
        const password = signUpForm.querySelector("input[placeholder='Password']").value;

        if (name && email && password) {
            // Create a user object
            const user = {
                name: name,
                email: email,
                password: password, // For secure authentication, use Firebase Authentication
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            // Store the user in Firestore
            db.collection("tasks").add(user)
                .then(() => {
                    alert("Account created successfully!");
                    // Redirect to the notes page
                    window.location.href = "/page/note.html";
                })
                .catch((error) => {
                    console.error("Error creating account: ", error);
                    alert("Failed to create account. Please try again.");
                });
        } else {
            alert("All fields are required!");
        }
    });
}
