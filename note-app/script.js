var notes = [
  { title: "My first beautiful note", content: "first hello world" },
  { title: "My second beautiful note", content: "second hello world" }
];

var displayNotes = () => {
  let root = document.getElementById("notes");
  console.log(root);
  let nodeToDelete = root.getElementsByTagName("div");
  while (nodeToDelete.length != 0) {
    root.removeChild(nodeToDelete[0]);
  }
};

displayNotes();
