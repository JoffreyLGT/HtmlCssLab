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

const displayNoteNodes = (selectedId) => {
  deleteNoteNodes();
  const sortedNotes = notes.sort((a, b) => a.id < b.id);
  let root = document.getElementById("notes");
  for (let i = 0; i < sortedNotes.length; i++) {
    const noteDiv = document.createElement("div");
    noteDiv.innerHTML = `
      <p class="${sortedNotes[i].id === selectedId ? 'note-listitem-selected' : 'note-listitem'}" id="note_${sortedNotes[i].id}" onclick="showNoteDetails(${sortedNotes[i].id})">${sortedNotes[i].title}</p>
    `;
    root.appendChild(noteDiv);
  }
};

const newNote = () => {
  let last = notes.reduce(
    (acc, current) => (acc < current.id ? current.id : acc),
    0
  );
  let id = ++last;
  notes.push({ id, title: "New note", content: "" });
  displayNoteNodes(id);
  showNoteDetails(id);
  console.log(notes);
};

const showNoteDetails = (id) => {
  let previousSelected = document.querySelector('.note-listitem-selected');
  if (previousSelected !== null) {
    previousSelected.className = 'note-listitem';
  }

  document.getElementById(`note_${id}`).className = 'note-listitem-selected';
  let note = notes.find(n => n.id === id);
  document.getElementById('note-title').value = note.title;
  document.querySelector('#note-content textarea').value = note.content;
  let saveDiv = document.getElementById('save-note');
  saveDiv.innerHTML = `<button>Save</button>`;
  saveDiv.querySelector('button').addEventListener('click', () => saveNote(note.id));
}

const saveNote = (id) => {
  let i = notes.findIndex(n => n.id === id);
  notes[i].title = document.getElementById('note-title').value;
  notes[i].content = document.getElementById('#note-content textarea').value;
  displayNoteNodes(id);
}