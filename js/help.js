document.getElementById("help-link").onclick = function (event) {
    event.preventDefault(); // Prevent default navigation

    // Toggle the visibility of the dropdown menu
    const helpMenu = document.getElementById("help-menu");
    helpMenu.style.display = (helpMenu.style.display === "block") ? "none" : "block";
};

// Close the dropdown menu when clicking outside
document.addEventListener("click", function (event) {
    const helpMenu = document.getElementById("help-menu");
    const helpLink = document.getElementById("help-link");

    if (!helpMenu.contains(event.target) && !helpLink.contains(event.target)) {
        helpMenu.style.display = "none";
    }
});