// JavaScript for managing Trash functionality with delete and restore options using LocalStorage

document.addEventListener("DOMContentLoaded", () => {
    const trashList = document.getElementById("trash-list");

    // Load trash items from LocalStorage
    function loadTrash() {
        const trashItems = JSON.parse(localStorage.getItem("trash")) || [];
        trashList.innerHTML = "";
        trashItems.forEach((item, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <input type="checkbox">
                <span>Name: ${item}</span>
                <button class="restore-btn" data-index="${index}">↩</button>
                <button class="delete-btn" data-index="${index}">🗑</button>
            `;
            trashList.appendChild(li);
        });
    }

    // Save trash items to LocalStorage
    function saveTrash(items) {
        localStorage.setItem("trash", JSON.stringify(items));
    }

    // Restore item from trash
    trashList.addEventListener("click", (e) => {
        if (e.target.classList.contains("restore-btn")) {
            const index = e.target.getAttribute("data-index");
            let trashItems = JSON.parse(localStorage.getItem("trash")) || [];
            let restoredItem = trashItems.splice(index, 1)[0];
            saveTrash(trashItems);
            alert(`Restored: ${restoredItem}`);
            loadTrash();
        }
    });

    // Permanently delete item from trash
    trashList.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-btn")) {
            const index = e.target.getAttribute("data-index");
            let trashItems = JSON.parse(localStorage.getItem("trash")) || [];
            let deletedItem = trashItems.splice(index, 1)[0];
            saveTrash(trashItems);
            alert(`Deleted permanently: ${deletedItem}`);
            loadTrash();
        }
    });

    // Delete all items in trash
    const deleteAllBtn = document.createElement("button");
    deleteAllBtn.textContent = "Delete All";
    deleteAllBtn.addEventListener("click", () => {
        if (confirm("Are you sure you want to delete all items permanently?")) {
            localStorage.removeItem("trash");
            loadTrash();
            alert("All items have been deleted.");
        }
    });
    document.querySelector(".trash-container").appendChild(deleteAllBtn);

    // Initialize Trash list on page load
    loadTrash();
});
