import { ReadNotes, ReadNote, CreateNote, UpdateNote } from "./utils/ApiRequester.js";

/**
 * Register all the functions in the window object to make them usable.
 * Trigger displayNoteNodes().
 */
addEventListener("load", () => {
  window.displayNoteNodes = displayNoteNodes;
  window.newNote = newNote;
  window.showNoteDetails = showNoteDetails;
  window.saveAfterTimeout = saveAfterTimeout;
  window.deleteNoteNodes = deleteNoteNodes;
  displayNoteNodes();
});

/**
 * Delete all the note elements in the list.
 */
const deleteNoteNodes = () => {
  let root = document.getElementById("notes");
  while (root.childElementCount > 0) {
    root.removeChild(root.firstChild);
  }
};

/**
 * Fetch all the notes and display them in the list.
 * @param {int} selectedId id of the note to set as selected.
 */
const displayNoteNodes = async (selectedId) => {
  deleteNoteNodes();
  const notes = await ReadNotes()
  const sortedNotes = notes.sort((a, b) => a.id < b.id);
  let root = document.getElementById("notes");
  for (let i = 0; i < sortedNotes.length; i++) {
    const noteDiv = document.createElement("div");
    noteDiv.innerHTML = `
      <p class="${sortedNotes[i].id === selectedId ? 'note-listitem-selected' : 'note-listitem'}" id="note_${sortedNotes[i].id}" onclick="showNoteDetails(${sortedNotes[i].id})">${sortedNotes[i].title}</p>
    `;
    root.appendChild(noteDiv);
  }
  showNoteDetails(sortedNotes[0].id);
};

/**
 * Create a new empty note and rerender the page.
 */
const newNote = () => {
  let id = CreateNote();
  displayNoteNodes(id);
  showNoteDetails(id);
};

/**
 * Display the details of selected note.
 * @param {int} id of the note to display.
 */
const showNoteDetails = async (id) => {
  let previousSelected = document.querySelector('.note-listitem-selected');
  if (previousSelected !== null) {
    previousSelected.className = 'note-listitem';
  }

  let note = await ReadNote(id);
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

  document.getElementById('delete').addEventListener('click', () => deleteNote(id));
  document.getElementById('favorite').addEventListener('click', () => setFavorite(id));
}

/**
 * Save the note after the timeout is triggered.
 * 
 * @param {id} string id of the element in the dom
 * @param {$note} nodeelement reference to the node in the list of notes
 * @param {timeInMs} int time to wait before saving the note
 */
const saveAfterTimeout = (id, $note, timeInMs = 1000) => {
  if (globalTimeout != null) {
    clearTimeout(globalTimeout);
  }
  let title = document.getElementById('note-title').value;
  globalTimeout = setTimeout(async function () {
    globalTimeout = null;
    const response = await UpdateNote({
      id,
      title,
      content: document.querySelector('#note-content textarea').value
    });
    if (response) {
      $note.innerHTML = title;
    } else {
      console.error("An error occured while saving the note.");
    }
  }, timeInMs);
}
var globalTimeout = null; // Mandatory for the function above.

const deleteNote = (id) => {
  console.log('Delete button clicked');
}

const setFavorite = (id) => {
  console.log('Favorite button clicked');
}