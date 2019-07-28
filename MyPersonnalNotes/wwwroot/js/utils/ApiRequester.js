// TODO Temporary, use API requests instead.
const notes = [
  { id: 1, title: "My first beautiful note", content: "first hello world" },
  { id: 2, title: "My second beautiful note", content: "second hello world" },
  { id: 3, title: "A very long note", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe ut laboriosam fuga molestiae laborum, aliquid voluptatum necessitatibus temporibus quidem facere nihil ab quo doloribus unde! Inventore, aspernatur. Reprehenderit, magnam incidunt!\nLorem ipsum dolor sit amet consectetur adipisicing elit. Saepe ut laboriosam fuga molestiae laborum, aliquid voluptatum necessitatibus temporibus quidem facere nihil ab quo doloribus unde! Inventore, aspernatur. Reprehenderit, magnam incidunt!\nLorem ipsum dolor sit amet consectetur adipisicing elit. Saepe ut laboriosam fuga molestiae laborum, aliquid voluptatum necessitatibus temporibus quidem facere nihil ab quo doloribus unde! Inventore, aspernatur. Reprehenderit, magnam incidunt!\nLorem ipsum dolor sit amet consectetur adipisicing elit. Saepe ut laboriosam fuga molestiae laborum, aliquid voluptatum necessitatibus temporibus quidem facere nihil ab quo doloribus unde! Inventore, aspernatur. Reprehenderit, magnam incidunt!\n\n\n\nLorem ipsum dolor sit amet consectetur adipisicing elit. Saepe ut laboriosam fuga molestiae laborum, aliquid voluptatum necessitatibus temporibus quidem facere nihil ab quo doloribus unde! Inventore, aspernatur. Reprehenderit, magnam incidunt!\nLorem ipsum dolor sit amet consectetur adipisicing elit. Saepe ut laboriosam fuga molestiae laborum, aliquid voluptatum necessitatibus temporibus quidem facere nihil ab quo doloribus unde! Inventore, aspernatur. Reprehenderit, magnam incidunt!\nLorem ipsum dolor sit amet consectetur adipisicing elit. Saepe ut laboriosam fuga molestiae laborum, aliquid voluptatum necessitatibus temporibus quidem facere nihil ab quo doloribus unde! Inventore, aspernatur. Reprehenderit, magnam incidunt!\nLorem ipsum dolor sit amet consectetur adipisicing elit. Saepe ut laboriosam fuga molestiae laborum, aliquid voluptatum necessitatibus temporibus quidem facere nihil ab quo doloribus unde! Inventore, aspernatur. Reprehenderit, magnam incidunt!\nLorem ipsum dolor sit amet consectetur adipisicing elit. Saepe ut laboriosam fuga molestiae laborum, aliquid voluptatum necessitatibus temporibus quidem facere nihil ab quo doloribus unde! Inventore, aspernatur. Reprehenderit, magnam incidunt!\n\n\n\nLorem ipsum dolor sit amet consectetur adipisicing elit. Saepe ut laboriosam fuga molestiae laborum, aliquid voluptatum necessitatibus temporibus quidem facere nihil ab quo doloribus unde! Inventore, aspernatur. Reprehenderit, magnam incidunt!" }
];

function ReadNotes() {
  return notes.map(n => n);
}

function CreateNote(title = "New note", content = "") {
  let lastId = notes.reduce(
    (acc, current) => (acc < current.id ? current.id : acc),
    0
  );
  let id = ++lastId;
  notes.push({ id, title, content });
  return id;
}

function ReadNote(id) {
  return notes.find(n => n.id === id);
}

function UpdateNote(note) {
  let { id, title, content } = note;

  let i = notes.findIndex(n => n.id === id);
  notes[i].title = title;
  notes[i].content = content;
}
export { ReadNotes, ReadNote, CreateNote, UpdateNote };