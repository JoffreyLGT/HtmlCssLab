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
      <p class="note-listitem" id="note_${notes[i].id}" onclick="showNoteDetails(${notes[i].id})">${notes[i].title}</p>
    `;
    root.appendChild(noteDiv);
  }
};

const newNote = () => {
  let last = notes.reduce(
    (acc, current) => (acc < current.id ? current.id : acc),
    0
  );
  notes.push({ id: ++last, title: "New note" });
  displayNoteNodes();
};

const showNoteDetails = (id) => {
  let note = notes.find(n => n.id === id);
  document.getElementById('note-title').innerHTML = `<input type="text" value="${note.title}"></input>`;
  document.getElementById('note-content').innerHTML = `<p>${note.content}</p>`;
  document.getElementById('note-controls').innerHTML = `<button onclick="saveNote(${note.id})">Save</button>`;
}

const saveNote = (id) => {
  let i = notes.findIndex(n => n.id === id);
  notes[i] = { id: id, title: document.getElementById('note-title').value, content: document.getElementById('note-content').value };
  displayNoteNodes();
}