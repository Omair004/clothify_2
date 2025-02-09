function checkLogin() {
            
    if (localStorage.getItem('loggedIn') == 'true') {
        
        window.location.href = "Start_clothify.html";
    } else {
        
        alert("Please log in first to get started!"); 
        window.location.href = "login_clothify.html"; 
    }
}


function logout() {
    
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('username');
    
    window.location.href = "login_clothify.html";
}