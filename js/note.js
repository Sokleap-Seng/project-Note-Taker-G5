const profileImage = document.querySelector('.king-image');
const crown = document.querySelector('.king-crown');

// Add hover effect for the crown visibility
profileImage.addEventListener('mouseenter', () => {
    crown.style.visibility = 'visible';
});

profileImage.addEventListener('mouseleave', () => {
    crown.style.visibility = 'hidden';
});
function openModal() {
    const modal = document.getElementById("new-note-modal");
    modal.style.display = modal.style.display === "none" ? "block" : "none";
}


const notes = JSON.parse(localStorage.getItem('notes')) || [];
const notesContainer = document.querySelector('.notes');
const searchInput = document.getElementById('search');
const modal = document.getElementById('modal');
const noteTitleInput = document.getElementById('note-title');
const noteContentInput = document.getElementById('note-content');
const noteDateInput = document.getElementById('note-date');
const noteColorInput = document.getElementById('note-color');
const noteFontInput = document.getElementById('note-font');
const noteFontColorInput = document.getElementById('note-font-color');
const noteBoldInput = document.getElementById('note-bold');
let currentIndex = null;

function renderNotes(filter = '') {
    notesContainer.innerHTML = `
        <div class="note add-note" onclick="openModal()">
            <p>+ New Note</p>
        </div>
    `;

    const filteredNotes = notes.filter(note => note.title.toLowerCase().includes(filter.toLowerCase()));

    filteredNotes.forEach((note, index) => {
        const noteElement = document.createElement('div');
        noteElement.className = 'note';
        noteElement.style.backgroundColor = note.color || '';
        noteElement.style.fontFamily = note.font || 'inherit';
        noteElement.style.fontWeight = note.bold ? 'bold' : 'normal';
        noteElement.style.color = note.fontColor || 'inherit'; // Apply font color

        const content = note.bullet ?
            `<ul>${note.content.split('\n').map(line => `<li>${line}</li>`).join('')}</ul>` :
            `<p>${note.content}</p>`;

        noteElement.innerHTML = `
            <h3>${note.title}</h3>
            ${content}
            <time>${note.time}</time>
            <div class="note-icons">
                <i class="fas fa-ellipsis-h" onclick="showOptions(${index})"></i>
                <div class="options" id="options-${index}" style="display: none;">
                    <div class="option" onclick="openModal(${index})">Edit</div>
                    <div class="option" onclick="moveToTrash(${index})">Delete</div>
                </div>
            </div>
        `;
        notesContainer.appendChild(noteElement);
    });
}

function showOptions(index) {
    const options = document.getElementById(`options-${index}`);
    options.style.display = options.style.display === 'block' ? 'none' : 'block';
}

function openModal(index = null) {
    currentIndex = index;
    if (index !== null) {
        const note = notes[index];
        noteTitleInput.value = note.title;
        noteContentInput.value = note.content;
        noteDateInput.value = note.date || '';
        noteColorInput.value = note.color || '#ffffff';
        noteFontInput.value = note.font || 'Arial';
        noteFontColorInput.value = note.fontColor || '#000000'; // Set font color
        noteBoldInput.checked = note.bold || false;
    }
    modal.style.display = 'flex';
}

function closeModal() {
    modal.style.display = 'none';
    noteTitleInput.value = '';
    noteContentInput.value = '';
    noteDateInput.value = '';
    noteColorInput.value = '#ffffff';
    noteFontInput.value = 'Arial';
    noteFontColorInput.value = '#000000'; // Reset font color
    noteBoldInput.checked = false;

    currentIndex = null;
}

function saveNote() {
    const title = noteTitleInput.value;
    const content = noteContentInput.value;
    const date = noteDateInput.value;
    const color = noteColorInput.value;
    const font = noteFontInput.value;
    const fontColor = noteFontColorInput.value;
    const bold = noteBoldInput.checked;

    if (title && content) {
        const newNote = {
            title,
            content,
            time: new Date().toLocaleString(),
            date,
            color: color === '#ffffff' ? null : color,
            font,
            fontColor,  // Store font color
            bold
        };

        if (currentIndex !== null) {
            notes[currentIndex] = newNote;
        } else {
            notes.push(newNote);
        }
        localStorage.setItem('notes', JSON.stringify(notes));
        renderNotes();
        closeModal();
    } else {
        alert("Please provide both title and content for the note.");
    }
}

function moveToTrash(index) {
    if (index !== null) {
        const trashedNote = notes.splice(index, 1)[0];
        localStorage.setItem('notes', JSON.stringify(notes));

        let trash = JSON.parse(localStorage.getItem('trash')) || [];
        trash.push(trashedNote);
        localStorage.setItem('trash', JSON.stringify(trash));

        renderNotes();
        closeModal();
    }
}

searchInput.addEventListener('input', (e) => {
    renderNotes(e.target.value);
});

renderNotes();

