//trash
document.addEventListener("DOMContentLoaded", () => {
    const trashList = document.getElementById("trash-list");
    const deleteAllButton = document.createElement("button");
    deleteAllButton.textContent = "Delete All";
    deleteAllButton.style.padding = "9px";
    deleteAllButton.style.background = "red";
    deleteAllButton.style.border = "none";
    deleteAllButton.style.color = "white";
    deleteAllButton.classList.add("delete-all-btn");
    document.querySelector(".trash-container").appendChild(deleteAllButton);

    function loadTrash() {
        const trashItems = JSON.parse(localStorage.getItem("trash")) || [];
        trashList.innerHTML = "";
        trashItems.forEach((item, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <input type="checkbox" />
                <span>Name: ${item.title}</span> <!-- Show the title here -->
                <button class="restore-btn" data-index="${index}">↩</button>
                <button class="delete-btn" data-index="${index}">🗑</button>
            `;
            trashList.appendChild(li);
        });
    }
    
    function saveTrash(items) {
        localStorage.setItem("trash", JSON.stringify(items));
    }
    function restoreItem(index) {
        let trashItems = JSON.parse(localStorage.getItem("trash")) || [];
        const restoredItem = trashItems.splice(index, 1)[0];
        saveTrash(trashItems);
        Swal.fire({
            icon: 'success',
            title: 'File Restored!',
            text: `${restoredItem.title} has been restored!`,
            showCancelButton: true,
            confirmButtonText: 'Undo',
            cancelButtonText: 'Close'
        }).then((result) => {
            if (result.isConfirmed) {
                trashItems.push(restoredItem);
                saveTrash(trashItems);
                loadTrash();
                Swal.fire('Undone!', `${restoredItem.title} has been moved back to Trash.`, 'info');
            }
        });
        loadTrash();
    }
    

    function deleteItem(index) {
        let trashItems = JSON.parse(localStorage.getItem("trash")) || [];
        const deletedItem = trashItems[index];
        Swal.fire({
            title: 'Are you sure?',
            text: `You are about to permanently delete ${deletedItem.title}.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                trashItems.splice(index, 1);
                saveTrash(trashItems);
                loadTrash();
                Swal.fire('Deleted!', `${deletedItem.title} has been permanently deleted.`, 'success');
            }
        });
    }
    

    function deleteAllItems() {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to permanently delete all items in the trash.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete all!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("trash");
                loadTrash();
                Swal.fire('Deleted!', 'All items have been permanently deleted.', 'success');
            }
        });
    }

    function searchTrashItems(searchTerm) {
        const items = document.querySelectorAll('#trash-list li');
        items.forEach(item => {
            const text = item.querySelector('span').textContent.toLowerCase();
            item.style.display = text.includes(searchTerm) ? 'flex' : 'none';
        });
    }

    document.getElementById('search').addEventListener('input', (e) => {
        searchTrashItems(e.target.value.toLowerCase());
    });

    trashList.addEventListener("click", (e) => {
        if (e.target.classList.contains("restore-btn")) {
            const index = e.target.getAttribute("data-index");
            restoreItem(index);
        } else if (e.target.classList.contains("delete-btn")) {
            const index = e.target.getAttribute("data-index");
            deleteItem(index);
        }
    });

    deleteAllButton.addEventListener("click", deleteAllItems);

    loadTrash();
});


