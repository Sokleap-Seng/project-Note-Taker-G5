// Initialization
const noteTitleInput = document.getElementById('note-title');
const addNoteButton = document.getElementById('addNote');
const notesContainer = document.getElementById('notes-container');
const noteColor = document.getElementById('note-color');
const noteEmoji = document.getElementById('note-emoji');
const reminderInput = document.getElementById('note-reminder');
const savePdfButton = document.getElementById('save-pdf');
const modal = document.getElementById('note-modal');

// Initialize notes and trash
const notes = JSON.parse(localStorage.getItem('notes')) || [];
const trash = JSON.parse(localStorage.getItem('trash')) || [];

// Render Notes on Page Load
renderNotes();



// Show Modal
function showModal() {
    modal.style.display = 'block';
}

// Hide Modal
function hideModal() {
    modal.style.display = 'none';
}

// Render Notes
function renderNotes() {
    notesContainer.innerHTML = '';
    notes.forEach((note, index) => {
        const noteCard = document.createElement('div');
        noteCard.className = 'note-card p-4 rounded shadow';

        noteCard.innerHTML = `
            <h2 class="text-xl font-bold mb-2">${note.emoji || ''} ${note.title}</h2>
            <div class="mb-4">${note.content}</div>
            <p class="text-gray-500 text-sm">Created: ${moment(note.timestamp).format('LLL')}</p>
            <div class="flex space-x-2 mt-4">
                <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 edit-note">Edit</button>
                <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 pin-note">Archive</button>
                <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 delete-note">Delete</button>
            </div>
        `;

        // Handle Delete
        noteCard.querySelector('.delete-note').addEventListener('click', () => deleteNoteToTrash(index));

        // Handle Archive
        noteCard.querySelector('.pin-note').addEventListener('click', () => archiveNote(index));

        // Handle Edit
        noteCard.querySelector('.edit-note').addEventListener('click', () => editNote(index));

        notesContainer.appendChild(noteCard);
    });
}
const quill = new Quill('#note-content', {
    theme: 'snow',
    placeholder: 'Write your note here...',
    modules: {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }], // H1 to H6 headers
            [{ 'font': [] }], // Font selection
            [{ 'list': 'ordered' }, { 'list': 'bullet' }], // Lists
            [{ 'align': [] }], // Text alignment
            ['bold', 'italic', 'underline', 'strike'], // Basic formatting
            ['subscript', 'superscript'], // Subscript and superscript
            [{ 'color': [] }, { 'background': [] }], // Text color and background
            ['link', 'image', 'video'], // Media options
            ['blockquote', 'code-block'], // Blockquote and code blocks
            ['clean'], // Clear formatting
        ]
    }
});
// Add a custom dropdown for font sizes (1px to 20px)
const fontSelector = document.createElement('select');
fontSelector.className = 'ql-font-size';
fontSizes.forEach(size => {
    const option = document.createElement('option');
    option.value = size;
    option.text = size;
    fontSelector.appendChild(option);
});

// Update toolbar to handle custom font size
const toolbar = quill.getModule('toolbar');
fontSelector.addEventListener('change', () => {
    const selectedFontSize = fontSelector.value;
    quill.format('size', selectedFontSize);
});

// Add font size dropdown to the toolbar
const toolbarContainer = document.querySelector('.ql-toolbar');
toolbarContainer.appendChild(fontSelector);

// Enhanced bullet list handling (if necessary)
toolbar.addHandler('list', function (value) {
    if (value === 'ordered' || value === 'bullet') {
        quill.format('list', value);
    }
});

// Optional: Add tooltip for better usability
fontSelector.setAttribute('title', 'Font Size');


// Custom Print Button Handler
toolbar.addHandler('print', () => {
    const content = quill.root.innerHTML;
    const newWindow = window.open();
    newWindow.document.write(content);
    newWindow.print();
});
// Render Trash
function renderTrash() {
    notesContainer.innerHTML = ""; // Clear current notes container
    trash.forEach(function(note, index) {
        const noteElement = document.createElement("div");
        noteElement.className = "note-card p-4 rounded shadow"; // Same class as note cards

        noteElement.innerHTML = `
            <h2 class="text-xl font-bold mb-2">${note.emoji || ''} ${note.title}</h2>
            <div class="mb-4">${note.content}</div>
            <p class="text-gray-500 text-sm">Deleted on: ${moment(note.timestamp).format('LLL')}</p>
            <div class="flex space-x-2 mt-4">
                <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 restore-note">Restore</button>
                <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 delete-note-permanently">Delete Permanently</button>
            </div>
        `;

        // Handle Restore
        noteElement.querySelector('.restore-note').addEventListener('click', () => restoreNote(index));

        // Handle Permanent Delete
        noteElement.querySelector('.delete-note-permanently').addEventListener('click', () => permanentlyDelete(index));

        notesContainer.appendChild(noteElement);
    });
}
// Search notes including trash
function searchNotes() {
    const query = document.getElementById("search-input").value.toLowerCase();
    notesContainer.innerHTML = "";

    // Check if the note is in trash or normal notes
    const allNotes = [...notes, ...trash];
    allNotes.forEach(function(note, index) {
                if (note.title.toLowerCase().includes(query) || note.content.toLowerCase().includes(query)) {
                    const noteElement = document.createElement("div");
                    noteElement.className = "note-card p-4 rounded shadow"; // Apply the same style

                    noteElement.innerHTML = `
                <h2 class="text-xl font-bold mb-2">${note.emoji || ''} ${note.title}</h2>
                <div class="mb-4">${note.content}</div>
                <div class="text-gray-500 text-sm">${note.timestamp ? moment(note.timestamp).format('LLL') : 'Deleted on: ' + moment(note.timestamp).format('LLL')}</div>
                <div class="flex space-x-2 mt-4">
                    ${trash.includes(note) ? 
                        `<button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 restore-note">Restore</button>
                         <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 delete-note-permanently">Delete Permanently</button>` : 
                        `<button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 edit-note">Edit</button>
                         <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 pin-note">Archive</button>
                         <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 delete-note">Delete</button>`
                    }
                </div>
            `;

            // Handle Restore for trash
            if (trash.includes(note)) {
                noteElement.querySelector('.restore-note').addEventListener('click', () => restoreNote(index));
                noteElement.querySelector('.delete-note-permanently').addEventListener('click', () => permanentlyDelete(index));
            } else {
                noteElement.querySelector('.edit-note').addEventListener('click', () => editNote(index));
                noteElement.querySelector('.delete-note').addEventListener('click', () => deleteNoteToTrash(index));
                noteElement.querySelector('.pin-note').addEventListener('click', () => archiveNote(index));
            }

            notesContainer.appendChild(noteElement);
        }
    });
}
// Add event listener to the search input
document.getElementById("search-input").addEventListener("input", searchNotes);

// Add Note
function addNote() {
    const title = noteTitleInput.value.trim();
    const content = quill.root.innerHTML;
    const color = noteColor.value;
    const emoji = noteEmoji.value;
    const reminder = reminderInput.value;

    if (!title || !content.trim()) {
        Swal.fire('Error', 'Both title and content are required!', 'error');
        return;
    } else {
        Swal.fire({
            title: "The note has already been saved",
            icon: "success",
            draggable: true
          });
    }

    const newNote = {
        title,
        content,
        color,
        emoji,
        timestamp: new Date().toISOString(),
        archived: false,
    };

    notes.push(newNote);
    localStorage.setItem('notes', JSON.stringify(notes));
    clearInputs();
    renderNotes();
    setReminder(title, reminder);
    hideModal();
}

// Edit Note
function editNote(index) {
    const note = notes[index];
    noteTitleInput.value = note.title;
    quill.root.innerHTML = note.content;
    noteColor.value = note.color;
    noteEmoji.value = note.emoji;

    // Remove the note to avoid duplication
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    renderNotes();
    showModal();
}

// Clear Input Fields
function clearInputs() {
    noteTitleInput.value = '';
    quill.root.innerHTML = '';
    noteColor.value = 'bg-white';
    noteEmoji.value = '';
    reminderInput.value = '';
}

/*-------------------------------------------------Delete note-------------------------------------------------- */

// Move note to trash
function deleteNoteToTrash(index) {
    const deletedNote = notes.splice(index, 1)[0];
    trash.push(deletedNote);
    localStorage.setItem("notes", JSON.stringify(notes));
    localStorage.setItem("trash", JSON.stringify(trash));
    renderNotes();
}

// Restore note from trash
function restoreNote(index) {
    const restoredNote = trash.splice(index, 1)[0];
    notes.push(restoredNote);
    localStorage.setItem("notes", JSON.stringify(notes));
    localStorage.setItem("trash", JSON.stringify(trash));
    renderTrash();
}

// Permanently delete note
function permanentlyDelete(index) {
    trash.splice(index, 1);
    localStorage.setItem("trash", JSON.stringify(trash));
    renderTrash();
}


// Render Archive
function renderArchive() {
    const archiveContainer = document.getElementById('archive-container');
    archiveContainer.innerHTML = '';

    if (archive.length === 0) {
        archiveContainer.innerHTML = '<p>No archived notes available.</p>';
        return;
    }

    archive.forEach(function(note, index) {
        const noteElement = document.createElement('div');
        noteElement.className = 'note-card p-4 rounded shadow';

        noteElement.innerHTML = `
            <h2 class="text-xl font-bold mb-2">${note.emoji || ''} ${note.title}</h2>
            <div class="mb-4">${note.content}</div>
            <p class="text-gray-500 text-sm">Archived on: ${moment(note.timestamp).format('LLL')}</p>
            <div class="flex space-x-2 mt-4">
                <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 restore-note">Restore</button>
                <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 delete-note-permanently">Delete Permanently</button>
            </div>
        `;

        // Handle Restore from Archive
        noteElement.querySelector('.restore-note').addEventListener('click', () => restoreNoteFromArchive(index));

        // Handle Permanent Delete from Archive
        noteElement.querySelector('.delete-note-permanently').addEventListener('click', () => permanentlyDeleteFromArchive(index));

        archiveContainer.appendChild(noteElement);
    });
}

// Restore Note from Archive
function restoreNoteFromArchive(index) {
    const restoredNote = archive.splice(index, 1)[0];
    notes.push(restoredNote);
    localStorage.setItem('notes', JSON.stringify(notes));
    localStorage.setItem('archive', JSON.stringify(archive));
    renderNotes();
    renderArchive();
}

// Permanently Delete from Archive
function permanentlyDeleteFromArchive(index) {
    archive.splice(index, 1);
    localStorage.setItem('archive', JSON.stringify(archive));
    renderArchive();
}

// Update Sidebar to Include Archive
function showArchive() {
    document.getElementById('archive-container').style.display = 'block';
    renderArchive();
}

// Add to Sidebar - Show Archive
document.querySelector('a[href="#"]').addEventListener('click', showArchive);


// // Render Notes
// function renderNotes() {
//     notesContainer.innerHTML = '';
//     notes.forEach((note, index) => {
//         const noteCard = document.createElement('div');
//         noteCard.className = `note-card p-4 rounded shadow ${note.color || 'bg-white'}`;
//         noteCard.innerHTML = `
//             <h2 class="text-xl font-bold mb-2">${note.emoji || ''} ${note.title}</h2>
//             <div class="mb-4">${note.content}</div>
//             <p class="text-gray-500 text-sm">Created: ${moment(note.timestamp).format('LLL')}</p>
//             <div class="flex space-x-2 mt-4">
//                 <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 edit-note">Edit</button>
//                 <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 pin-note">Archive</button>
//                 <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 delete-note">Delete</button>
//             </div>
//         `;

//         // Handle delete
//         // noteCard.querySelector('.delete-note').addEventListener('click', () => deleteNote(index));
//         noteCard.querySelector('.delete-note').addEventListener('click', () => deleteNoteToTrash(index));

//         // Handle pin
//         noteCard.querySelector('.pin-note').addEventListener('click', () => archiveNote(index));

//         // Handle edit
//         noteCard.querySelector('.edit-note').addEventListener('click', () => editNote(index));


//         // Handle Archive
//         noteCard.querySelector('.pin-note').addEventListener('click', () => archiveNote(index));

//         // Handle save as PDF
//         noteCard.querySelector('.save-note').addEventListener('click', () => saveNoteAsPDF(note));

//         notesContainer.appendChild(noteCard);
//     });
// } 
  
// Render Notes
function renderNotes() {
    notesContainer.innerHTML = '';
    notes.forEach((note, index) => {
        const noteCard = document.createElement('div');
        noteCard.className = `note-card ${note.color} p-4 rounded shadow`; 

        noteCard.innerHTML = `
            <h2 class="text-xl font-bold mb-2">${note.emoji || ''} ${note.title}</h2>
            <div class="mb-4">${note.content}</div>
            <p class="text-gray-500 text-sm">Created: ${moment(note.timestamp).format('LLL')}</p>
            <div class="flex space-x-2 mt-4">
                <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 edit-note">Edit</button>
                <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 pin-note">Archive</button>
                <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 delete-note">Delete</button>
            </div>
        `;

        // Handle Delete
        noteCard.querySelector('.delete-note').addEventListener('click', () => deleteNoteToTrash(index));

        // Handle Archive
        noteCard.querySelector('.pin-note').addEventListener('click', () => archiveNote(index));

        // Handle Edit
        noteCard.querySelector('.edit-note').addEventListener('click', () => editNote(index));

        notesContainer.appendChild(noteCard);
    });
}

/*--------------------------Save note as PDF-------------------------------*/

// Save Note as PDF
function saveNoteAsPDF() {
    const title = document.getElementById('note-title').value.trim();
    const content = document.getElementById('note-content').innerText.trim();

    if (!title && !content) {
        Swal.fire('Error', 'Please fill in the note title or content before saving as PDF.', 'error');
        return;
    }

    // Create a new jsPDF instance
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    // Add title to the PDF
    pdf.setFontSize(18);
    pdf.text(title || 'Untitled Note', 10, 20);

    // Add content to the PDF
    pdf.setFontSize(12);
    const lines = pdf.splitTextToSize(content, 180);
    pdf.text(lines, 10, 30);

    // Save the PDF
    const fileName = `${title || 'Untitled_Note'}.pdf`;
    pdf.save(fileName);
}

// Function to show the note modal
function showModal() {
    const noteModal = document.getElementById('note-modal');
    noteModal.style.display = 'block'; // Show the form
}

// Function to hide the note modal
function cancelAction() {
    const noteModal = document.getElementById('note-modal');
    noteModal.style.display = 'none'; // Hide the form
}


// Attach the function to the button
document.getElementById('save-pdf').addEventListener('click', saveNoteAsPDF);

function filterNotes(searchText) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const notesContainer = document.querySelector('.notes');
    notesContainer.innerHTML = `
        <div class="note add-note" onclick="openModal()">
            <span class="plus-icon">+</span>
        </div>
    `;

    const filteredNotes = notes.filter(note => {
        return note.title.toLowerCase().includes(searchText.toLowerCase());
    });

    filteredNotes.filter(note => !note.deleted).forEach((note, index) => {
        const noteElement = document.createElement('div');
        noteElement.className = 'note';
        noteElement.style.backgroundColor = note.bgColor;
        noteElement.style.color = note.fontColor;

        noteElement.innerHTML = `
            <h1>${note.title}</h1>
            <div>${note.content}</div>
            <div class="note-date">Reminder: ${note.date}</div>
            <div class="note-actions">
                <button onclick="toggleOptions(${index})" class="more-icon">
                    <i class="fas fa-ellipsis-h"></i>
                </button>
                <div id="options-${index}" class="options-dropdown" style="display: none;">
                    <button onclick="openModalForEdit(${index})"><i class="fas fa-edit"></i> Edit</button>
                    <button onclick="deleteNote(${index})"><i class="fas fa-trash"></i> Delete</button>
                    <button onclick="exportNote(${index})"><i class="fas fa-download"></i> Export</button>
                </div>
            </div>
        `;

        notesContainer.appendChild(noteElement);
    });
}
document.getElementById('search').addEventListener('input', (e) => {
    filterNotes(e.target.value);
});
function toggleMobileMenu() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('active');
}
window.onbeforeunload = function() {
    return "Are you sure you want to leave this page?";
};
