const myLibrary = new Map();

const addBookButton = document.getElementById("add-button");
const addBookDialog = document.getElementById("add-book-dialog");
const submitDialogButton = document.getElementById("submit-dialog");
let lastID = 0;

addBookButton.addEventListener("click", () => {
  addBookDialog.showModal();
});

submitDialogButton.addEventListener("click", (e) => {
  e.preventDefault();
  const title = document.getElementById("title-input").value;
  const author = document.getElementById("author-input").value;
  const pages = document.getElementById("pages-input").value;
  const readCheck = document.getElementById("read-checkbox").checked;
  addBookToLibrary(author, title, pages, readCheck);
  displayBooks();
  addBookDialog.close();
});

function Book(author, title, pages, read) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
}

function toggleReadStatus(bookID) {
  const currBook = myLibrary.get(bookID);
  currBook.read = !currBook.read;
  myLibrary.set(bookID, currBook);
}

function updateUI(e, bookID) {
  const target = e.target;
  const isRead = myLibrary.get(bookID).read;

  // Toggle CSS classes based on the read status
  target.classList.toggle("read", isRead);
  target.classList.toggle("not-read", !isRead);

  // Use a CSS class to control the text content
  target.textContent = isRead ? "Read" : "Not read";
}

function addBookToLibrary(author, title, pages, read) {
  myLibrary.set(lastID++, new Book(author, title, pages, read));
}

function createCard(book) {
  const card = document.createElement("li");

  // Create and set title element
  const title = document.createElement("p");
  title.textContent = `"${book.title}"`;
  card.appendChild(title);

  // Create and set author element
  const author = document.createElement("p");
  author.textContent = book.author;
  card.appendChild(author);

  // Create and set pages element
  const pages = document.createElement("p");
  pages.textContent = `${book.pages} pages`;
  card.appendChild(pages);

  // Create and set readStatus element (button)
  const readButtonPara = document.createElement("p");
  const readStatus = document.createElement("button");
  readStatus.textContent = book.read ? "Read" : "Not read";
  readStatus.classList.add("read-button");
  readStatus.classList.add(book.read ? "read" : "not-read");
  readStatus.addEventListener("click", (e) => {
    const bookID = Number(
      e.target.parentElement.parentElement.getAttribute("data-index")
    );
    toggleReadStatus(bookID);
    updateUI(e, bookID);
  });
  readButtonPara.appendChild(readStatus);
  card.appendChild(readButtonPara);

  // Create and set removeButton element (button)
  const removeButtonPara = document.createElement("p");
  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.classList.add("remove-button");

  removeButton.addEventListener("click", (e) => {
    const targetID = Number(
      e.target.parentElement.parentElement.getAttribute("data-index")
    );
    if (myLibrary.has(targetID)) {
      myLibrary.delete(targetID);
    }
    displayBooks();
  });
  removeButtonPara.appendChild(removeButton);
  card.appendChild(removeButtonPara);
  card.classList.add("book-card");
  return card;
}

function displayBooks() {
  const display = document.querySelector(".book-list");
  display.innerHTML = "";
  for (const [key, book] of myLibrary) {
    const card = createCard(book);
    card.setAttribute("data-index", key);
    display.appendChild(card);
  }
  console.log(myLibrary);
}

function addBooks() {
  addBookToLibrary("1", "2", 321, false);
  addBookToLibrary("1", "2", 321, false);
  addBookToLibrary("1", "2", 321, true);
  addBookToLibrary("1", "2", 321, false);
}

addBooks();
displayBooks();
