function showSignup() { 
    document.getElementById("signup-form").style.display = "flex";  // Show Sign-Up
    document.getElementById("login-form").style.display = "none";   // Hide Login
    document.getElementById("signup-tab").classList.add("active");
    document.getElementById("login-tab").classList.remove("active");
}

function showLogin() { 
    document.getElementById("login-form").style.display = "flex";  // Show Login
    document.getElementById("signup-form").style.display = "none"; // Hide Sign-Up
    document.getElementById("login-tab").classList.add("active");
    document.getElementById("signup-tab").classList.remove("active");
}

function togglePassword(inputId, button) { 
    const input = document.getElementById(inputId);
    if (input.type === 'password') {
        input.type = 'text';
        button.textContent = 'Hide';
    } else {
        input.type = 'password';
        button.textContent = 'Show';
    }
}

// ✅ FIX: Initialize Google Sign-In Properly
function handleGoogleSignIn() {  
    gapi.load('auth2', function() {
        const auth2 = gapi.auth2.getAuthInstance();
        if (auth2) {
            auth2.signIn().then(function (user) {
                console.log("User signed in:", user);
            }).catch(function (error) {
                console.error("Google Sign-In Error:", error);
            });
        } else {
            console.error("Google Auth2 not initialized.");
        }
    });
}

// ✅ FIX: Corrected Fetch URL for Register
document.querySelector('#signup-form form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username-signup').value;
    const email = document.getElementById('email-signup').value;
    const password = document.getElementById('password-signup').value;

    fetch('/cgi-bin/register_user.py', {  // Updated path to the correct CGI bin
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            username: username,
            email: email,
            password: password
        })
    })
    .then(response => response.text())
    .then(data => {
        console.log('Server response:', data);  // Debugging server response
        if (data.includes('Registration Successful')) {
            alert('User registered successfully! Please log in.');
            showLogin();
        } else {
            alert('Error registering user.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while registering.');
    });
});

// ✅ FIX: Corrected Fetch URL for Login
document.querySelector('#login-form form').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email-login').value;
    const password = document.getElementById('password-login').value;

    fetch('/cgi-bin/Login_user.py', {  // Corrected URL
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({  // Fixed request formatting
            email: email,
            password: password
        })
    })
    .then(response => response.text())
    .then(data => {
        console.log('Login response:', data);  // Debugging
        if (data.includes("Login Successful")) {
            alert('Login successful!');
            window.location.href = "home_clothify.html"; // Redirect to home
        } else {
            alert('Invalid email or password');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while logging in.');
    });
});
