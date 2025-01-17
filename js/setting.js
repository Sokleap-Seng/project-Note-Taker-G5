// settings.js

// Get modal element
const modal = document.getElementById("settings-modal");
const settingsLink = document.getElementById("settings-link");
const closeModal = document.getElementsByClassName("close")[0];
const saveButton = document.getElementById("save-settings");
const usernameInput = document.getElementById("username");
const profileImageInput = document.getElementById("profile-image");
const profileImage = document.querySelector(".king-image");

// Open the modal when the settings link is clicked
settingsLink.onclick = function() {
    modal.style.display = "block";
}

// Close the modal when the close button is clicked
closeModal.onclick = function() {
    modal.style.display = "none";
}

// Close the modal when clicking outside of the modal
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Save settings when the save button is clicked
saveButton.onclick = function() {
    const username = usernameInput.value;
    const profileImageFile = profileImageInput.files[0];

    // Update username
    if (username) {
        const usernameLink = document.querySelector(".profile a");
        usernameLink.textContent = username;
    }

    // Update profile image
    if (profileImageFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            profileImage.src = e.target.result;
        }
        reader.readAsDataURL(profileImageFile);
    }

    // Close the modal after saving
    modal.style.display = "none";
}