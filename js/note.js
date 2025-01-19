// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    loadNotes();
});

// Open and Close Modal
function openModal() {
    document.getElementById('modal').style.display = 'block';
    resetModal();

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
    document.getElementById('note-color').value = '#ffffff'; // Default background color
    document.getElementById('note-font-color').value = '#000000'; // Default font color
}

// Save New Note
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
        id: Date.now(), // Unique ID
        title,
        content,
        date,
        bgColor,
        fontColor,
        created: new Date().toISOString(),
        pinned: false,
        deleted: false // Not deleted by default
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

    notes.filter(note => !note.deleted).forEach((note, index) => {
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

// Toggle Options Dropdown
function toggleOptions(index) {
    const options = document.getElementById(`options-${index}`);
    const isVisible = options.style.display === 'block';
    options.style.display = isVisible ? 'none' : 'block';
}

// Delete Note (Move to Trash)
function deleteNote(index) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes[index].deleted = true; // Move to Trash
    localStorage.setItem('notes', JSON.stringify(notes));
    loadNotes(); // Refresh notes
    loadTrashedNotes(); // Update trash
}

// Restore Note
function restoreNote(index) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes[index].deleted = false; // Restore from Trash
    localStorage.setItem('notes', JSON.stringify(notes));
    loadNotes(); // Refresh notes
    loadTrashedNotes(); // Update trash
}

// Permanently Delete Note
function permanentlyDelete(index) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.splice(index, 1); // Remove note permanently
    localStorage.setItem('notes', JSON.stringify(notes));
    loadTrashedNotes(); // Update trash
}

// Export Note
function exportNote(index) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const note = notes[index];
    const fileContent = `Title: ${note.title}\n\nContent: ${note.content}\n\nReminder Date: ${note.date}`;
    const blob = new Blob([fileContent], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${note.title}.txt`;
    link.click();
}

// Load Trashed Notes
function loadTrashedNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const trashedNotesContainer = document.getElementById('my-trashed-notes');
    trashedNotesContainer.innerHTML = '';

    notes.filter(note => note.deleted).forEach((note, index) => {
        const noteElement = document.createElement('div');
        noteElement.className = 'trashed-note';
        noteElement.innerHTML = `
            <h2>${note.title}</h2>
            <div>${note.content}</div>
            <div class="note-actions">
                <button onclick="restoreNote(${index})">Restore</button>
                <button onclick="permanentlyDelete(${index})">Delete Permanently</button>
            </div>
        `;

        trashedNotesContainer.appendChild(noteElement);
    });
}

// Show Trash Section
function showTrash() {
    document.getElementById('my-notes').style.display = 'none';
    document.getElementById('trashed-notes').style.display = 'block';
    loadTrashedNotes();
}

// Show Notes Section
function showNotes() {
    document.getElementById('trashed-notes').style.display = 'none';
    document.getElementById('my-notes').style.display = 'block';
}

// Restore Note from Trash
function restoreNote(index) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes[index].deleted = false;
    localStorage.setItem('notes', JSON.stringify(notes));
    loadTrashedNotes();
    loadNotes();
}

// Permanently Delete Note from Trash
function permanentlyDelete(index) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.splice(index, 1);  // Remove the note permanently from the list
    localStorage.setItem('notes', JSON.stringify(notes));
    loadTrashedNotes();
    loadNotes();
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

    // Track the current line as the user interacts with the textarea
    const textarea = document.getElementById('note-content');
    textarea.addEventListener('click', trackLine); // Update on click
    textarea.addEventListener('keyup', trackLine); // Update on keypress
});

// Change Font Style
function changeFontStyle() {
    const textarea = document.getElementById('note-content');
    const selectedFont = document.getElementById('font-style').value;
    textarea.style.fontFamily = selectedFont;
}

// Track the current line in the textarea
let currentLine = 0;

function trackLine(event) {
    const textarea = event.target;
    const valueBeforeCaret = textarea.value.substring(0, textarea.selectionStart);
    currentLine = valueBeforeCaret.split('\n').length - 1; // Get the current line index
}

// Apply formatting to the current line
function toggleFormat(formatType) {
    const textarea = document.getElementById('note-content');
    const lines = textarea.value.split('\n'); // Split content into lines
    const currentText = lines[currentLine]; // Get the text of the current line
    const isChecked = document.getElementById(`${formatType}-text`).checked; // Check if the checkbox is selected

    // Apply or remove formatting
    let updatedLine = currentText;

    if (formatType === 'bold') {
        // Apply or remove bold font
        updatedLine = isChecked
            ? `<b>${currentText}</b>` // Add bold
            : currentText.replace(/<b>(.*?)<\/b>/g, '$1'); // Remove bold
    } else if (formatType === 'italic') {
        // Apply or remove italic font
        updatedLine = isChecked
            ? `<i>${currentText}</i>` // Add italic
            : currentText.replace(/<i>(.*?)<\/i>/g, '$1'); // Remove italic
    } else if (formatType === 'underline') {
        // Apply or remove underline
        updatedLine = isChecked
            ? `<u>${currentText}</u>` // Add underline
            : currentText.replace(/<u>(.*?)<\/u>/g, '$1'); // Remove underline
    }

    // Update the specific line
    lines[currentLine] = updatedLine;

    // Update the textarea value
    textarea.value = lines.join('\n');
}
