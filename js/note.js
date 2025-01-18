// Open and Close Modal
function openModal() {
    document.getElementById('modal').style.display = 'block';
    resetModal();  // Reset the modal inputs for new note

    // Event listeners for Save and Cancel buttons
    document.getElementById('save-note').addEventListener('click', saveNote);
    document.getElementById('cancel-note').addEventListener('click', closeModal);
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

// Reset the modal inputs
function resetModal() {
    document.getElementById('note-title').value = '';
    document.getElementById('note-content').value = '';
    document.getElementById('note-date').value = '';
    document.getElementById('note-color').value = '#ffffff';  // Default color
    document.getElementById('note-font-color').value = '#000000';  // Default font color
}
// Function to apply formatting (Bold, Italic, Underline)
function applyFormat(command) {
    const contentField = document.getElementById('note-content');
    contentField.focus();

    if (command === 'bold') {
        document.execCommand('bold');
    } else if (command === 'italic') {
        document.execCommand('italic');
    } else if (command === 'underline') {
        document.execCommand('underline');
    }
}

// Function to save note
function saveNote() {
    const title = document.getElementById('note-title').value;
    const content = document.getElementById('note-content').value;
    const date = document.getElementById('note-date').value;
    const bgColor = document.getElementById('note-color').value;
    const fontColor = document.getElementById('note-font-color').value;

    if (!title || !content) {
        alert('Please fill out all fields.');
        return;
    }

    const note = {
        title,
        content,
        date,
        bgColor,
        fontColor,
        created: new Date().toISOString(),
        pinned: false,
    };

    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));

    closeModal();
    loadNotes();
}

// Save Note
function saveNote() {
    const title = document.getElementById('note-title').value;
    const content = document.getElementById('note-content').value;
    const date = document.getElementById('note-date').value;
    const bgColor = document.getElementById('note-color').value;
    const fontColor = document.getElementById('note-font-color').value;

    if (!title || !content) {
        alert('Please fill out all fields.');
        return;
    }

    const note = {
        title,
        content,
        date,
        bgColor,
        fontColor,
        created: new Date().toISOString(),
        pinned: false,
    };

    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));

    closeModal();
    loadNotes();
}

// Load Notes
function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const notesContainer = document.querySelector('.notes');
    notesContainer.innerHTML = `
        <div class="note add-note" onclick="openModal()">
            <span class="plus-icon">+</span>
        </div>
    `;

    notes.forEach((note, index) => {
        const noteElement = document.createElement('div');
        noteElement.className = 'note';
        noteElement.style.backgroundColor = note.bgColor;
        noteElement.style.color = note.fontColor;

        noteElement.innerHTML = `
            <h2>${note.title}</h2>
            <div>${note.content}</div>
            <div class="note-date">Reminder: ${note.date}</div>
            <div class="note-actions">
                <button onclick="toggleOptions(${index})" class="more-icon">
                    <i class="fas fa-ellipsis-h"></i> <!-- More Options Icon -->
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

// Toggle options (Edit, Delete, Export)
function toggleOptions(index) {
    const options = document.getElementById(`options-${index}`);
    const isVisible = options.style.display === 'block';
    options.style.display = isVisible ? 'none' : 'block';
}

// Open Modal for Editing
function openModalForEdit(index) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const note = notes[index];

    document.getElementById('note-title').value = note.title;
    document.getElementById('note-content').value = note.content;
    document.getElementById('note-date').value = note.date;
    document.getElementById('note-color').value = note.bgColor;
    document.getElementById('note-font-color').value = note.fontColor;

    document.getElementById('save-note').removeEventListener('click', saveNote);  // Remove existing event listener
    document.getElementById('save-note').addEventListener('click', function () {
        saveEditedNote(index);
    });

    openModal();
}

// Save Edited Note
function saveEditedNote(index) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const note = notes[index];

    note.title = document.getElementById('note-title').value;
    note.content = document.getElementById('note-content').value;
    note.date = document.getElementById('note-date').value;
    note.bgColor = document.getElementById('note-color').value;
    note.fontColor = document.getElementById('note-font-color').value;

    localStorage.setItem('notes', JSON.stringify(notes));
    closeModal();
    loadNotes();
}

// Delete Note
function deleteNote(index) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    loadNotes();
}

// Export Note
function exportNote(index) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const note = notes[index];

    // Create a folder and file (this is just a simulated file export)
    const folderName = `Note_${note.title}`;
    const fileContent = `Title: ${note.title}\n\nContent: ${note.content}\n\nReminder Date: ${note.date}`;
    const blob = new Blob([fileContent], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${folderName}/${note.title}.txt`; // Simulating a folder structure
    link.click();
}

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    loadNotes();
});
