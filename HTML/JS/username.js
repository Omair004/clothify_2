
// Function to get user data from the Python script
async function fetchUserData() {
    console.log("fetchUserData function is triggered"); // Debugging log
    
    const storedUsername = "omair.m2004@gmail.com"; // Replace with dynamic value if needed
    const url = `http://localhost:8000/cgi-bin/fetch_data.py?username=${storedUsername}`;

    try {
        console.log("Sending fetch request to Python..."); // Debugging log

        const response = await fetch(url); // Wait for the fetch request to complete
        const data = await response.json(); // Wait for the JSON data

        console.log("Fetched Data:", data); // Check if data is fetched correctly

        const usernameElement = document.getElementById("username");
        usernameElement.textContent = data.name || "Guest";  // Update name element with user’s name (or "Guest")
    } catch (error) {
        console.error("Error fetching user data:", error);
        const usernameElement = document.getElementById("username");
        usernameElement.textContent = "Guest";  // Fallback to "Guest" if the fetch fails
    }
}

window.addEventListener('DOMContentLoaded', () => {
    console.log("Page loaded. Ready to fetch user data."); // Debugging log
    fetchUserData();
});
