
let wardrobe = []; 

// Updated Image preview function
function previewImage(event) {
const reader = new FileReader();
reader.onload = function () {
    const output = document.getElementById('image-preview');
    output.src = reader.result;
    output.style.display = 'block';
}
reader.readAsDataURL(event.target.files[0]);
}

// Handle form submission (no changes)
document.getElementById('upload-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const fileInput = document.querySelector('input[type="file"]');
    if (!fileInput.files.length) {
        alert("Please select an image!");
        return;
    }

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    try {
        // Send the image to FastAPI server for prediction
        const response = await fetch("http://127.0.0.1:8000/predict", {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error("Server error: " + response.statusText);
        }

        // Get the response from the server
        const data = await response.json();

        // Create clothing item object with prediction data
        const clothingItem = {
            image: URL.createObjectURL(fileInput.files[0]),
            style: data.style,  // Prediction from the model
            type: data.type,    // Prediction from the model
            color: data.color   // Prediction from the model
        };

        wardrobe.push(clothingItem);  // Add the item to the wardrobe

        // Show the action buttons
        document.getElementById('action-buttons').style.display = 'block';
        
        // Reset the form and hide the preview
        document.getElementById('upload-form').reset();
        document.getElementById('image-preview').style.display = 'none';

    } catch (error) {
        console.error("Error:", error);
        alert("Failed to get predictions. Please try again.");
    }
});


function viewWardrobe() {
    const wardrobeContainer = document.getElementById('wardrobe-container');
    wardrobeContainer.style.display = 'block';

    const wardrobeItems = document.getElementById('wardrobe-items');
    wardrobeItems.innerHTML = '';  // Clear the existing wardrobe

    wardrobe.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${item.image}" alt="Clothing Item" width="50" height="50"></td>
            <td>${item.style}</td> <!-- Display predicted style -->
            <td>${item.type}</td>   <!-- Display predicted type -->
            <td>${item.color}</td>  <!-- Display predicted color -->
            <td>
                <button class="favorite-btn" onclick="toggleFavorite(${index})">
                    <i class="${item.isFavorite ? 'fas fa-heart' : 'far fa-heart'}"></i>
                </button>
            </td>
            <td>
                <button class="delete-btn" onclick="deleteItem(${index})">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </td>
        `;
        wardrobeItems.appendChild(row);
    });
}


// Function to toggle favorite status
function toggleFavorite(index) {
    wardrobe[index].isFavorite = !wardrobe[index].isFavorite;
    viewWardrobe();
}

// Function to delete an item
function deleteItem(index) {
    wardrobe.splice(index, 1); 
    viewWardrobe(); 
}

// Function to reset the form for uploading more clothes
function uploadMore() {
    document.getElementById('upload-form').reset();
    document.getElementById('image-preview').style.display = 'none';
    document.getElementById('action-buttons').style.display = 'none'; 
}

// Function to redirect to the Plan Week page
function setOutfits() {
    window.location.href = 'plan_week.html'; 
}