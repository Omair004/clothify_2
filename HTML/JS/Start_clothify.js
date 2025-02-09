
// This is an example, adjust depending on how you store the username
let username = localStorage.getItem('username') || 'Guest'; 

// Display the username in the placeholder
document.getElementById('username-placeholder').innerText = username;