import { ReadNotes, ReadNote, CreateNote, UpdateNote } from "./ApiRequester.js";

// We want to display the note after the page is loaded
addEventListener("load", () => {
  console.log(window);
  window.displayNoteNodes = displayNoteNodes;
  window.newNote = newNote;
  window.showNoteDetails = showNoteDetails;
  window.saveAfterTimeout = saveAfterTimeout;
  window.deleteNoteNodes = deleteNoteNodes;
  displayNoteNodes();
});

const deleteNoteNodes = () => {
  let root = document.getElementById("notes");
  while (root.childElementCount > 0) {
    root.removeChild(root.firstChild);
  }
};

const displayNoteNodes = (selectedId) => {
  deleteNoteNodes();
  const sortedNotes = ReadNotes().sort((a, b) => a.id < b.id);
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
  let id = CreateNote();
  displayNoteNodes(id);
  showNoteDetails(id);
};

const showNoteDetails = (id) => {
  let previousSelected = document.querySelector('.note-listitem-selected');
  if (previousSelected !== null) {
    previousSelected.className = 'note-listitem';
  }


  let note = ReadNote(id);
  document.getElementById('note-title').value = note.title;
  document.querySelector('#note-content textarea').value = note.content;

  let $selectedNote = document.getElementById(`note_${id}`)
  $selectedNote.className = 'note-listitem-selected';
  document.querySelectorAll('#note-title, #note-content textarea').forEach(element => {
    // Save 1 sec after the last keyup.
    element.addEventListener('keyup', () => saveAfterTimeout(note.id, $selectedNote, 1000));
    // Immediately save when the change event is triggered.
    // Mandatory to be sure to save when the user select another note.
    element.addEventListener('change', () => saveAfterTimeout(note.id, $selectedNote, 0));
  });
}

/**
 * Save the note after the timeout is triggered.
 * 
 * @param {id} string id of the element in the dom
 * @param {$note} nodeelement reference to the node in the list of notes
 */
const saveAfterTimeout = (id, $note, timeInMs) => {
  if (globalTimeout != null) {
    clearTimeout(globalTimeout);
  }
  let title = document.getElementById('note-title').value;
  globalTimeout = setTimeout(function () {
    globalTimeout = null;
    $note.innerHTML = title;

    UpdateNote({
      title,
      content: document.querySelector('#note-content textarea').value
    });

  }, timeInMs);
}
var globalTimeout = null; // Mandatory for the function above.