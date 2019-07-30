async function ReadNotes() {
  const response = await fetch("/api/notes");
  return await response.json();
}

async function CreateNote(title = "New note", content = "") {
  const response = await fetch("/api/notes", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ Title: title, Content: content })
  });
  return await response.json();
}

async function ReadNote(id) {
  const response = await fetch(`/api/notes/${id}`);
  return await response.json();
}

async function UpdateNote(note) {
  let { id, title, content } = note;

  const response = await fetch("/api/notes", {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ Id: id, Title: title, Content: content })
  });
  return response.ok;
}
export { ReadNotes, ReadNote, CreateNote, UpdateNote };