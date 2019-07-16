// We want to display the note after the page is loaded
addEventListener("load", () => {
  displayNoteNodes();
});

const notes = [
  { id: 1, title: "My first beautiful note", content: "first hello world" },
  { id: 2, title: "My second beautiful note", content: "second hello world" }
];

const deleteNoteNodes = () => {
  let root = document.getElementById("notes");
  while (root.childElementCount > 0) {
    root.removeChild(root.firstChild);
  }
};

const displayNoteNodes = () => {
  deleteNoteNodes();
  const sortedNotes = notes.sort((a, b) => a.id < b.id);
  let root = document.getElementById("notes");
  for (let i = 0; i < sortedNotes.length; i++) {
    const noteDiv = document.createElement("div");
    noteDiv.innerHTML = `
      <p class="note-listitem" id="note_${sortedNotes[i].id}" onclick="showNoteDetails(${sortedNotes[i].id})">${sortedNotes[i].title}</p>
    `;
    root.appendChild(noteDiv);
  }
};

const newNote = () => {
  let last = notes.reduce(
    (acc, current) => (acc < current.id ? current.id : acc),
    0
  );
  notes.push({ id: ++last, title: "New note", content: "" });
  displayNoteNodes();
  console.log(notes);
};

const showNoteDetails = (id) => {
  let previousSelected = document.querySelector('note-listitem-seleted');
  console.log(previousSelected)
  if (previousSelected !== null) {
    previousSelected.className = 'note-listitem';
  }

  document.getElementById(`note_${id}`).className = 'note-listitem-selected';
  let note = notes.find(n => n.id === id);
  document.getElementById('note-title').value = note.title;
  document.getElementById('note-content').value = note.content;
  let saveDiv = document.getElementById('save-note');
  saveDiv.innerHTML = `<button>Save</button>`;
  saveDiv.querySelector('button').addEventListener('click', () => saveNote(note.id));
  document.getElementById('details').style.display = '';
}

const saveNote = (id) => {
  console.log(`id = ${id}`);
  let i = notes.findIndex(n => n.id === id);
  console.log(`i = ${i}`);
  notes[i].title = document.getElementById('note-title').value;
  notes[i].content = document.getElementById('note-content').value;
  document.getElementById('details').style.display = 'none';
  console.log(notes);
  displayNoteNodes();
}