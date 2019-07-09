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
      <p id="note_${notes[i].id}">${notes[i].title}</p>
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
