const myLibrary = [];

function Book(author, title, pages, read) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(author, title, pages, read) {
  myLibrary.push(new Book(author, title, pages, read));
}

function displayBooks() {
  const display = document.querySelector(".book-list");
  myLibrary.forEach((book) => {
    const item = document.createElement("li");
    const node = document.createTextNode(
      `${book.author}, ${book.title}, ${book.pages}, ${book.read}`
    );
    item.classList.add("book-card");
    item.appendChild(node);
    display.appendChild(item);
  });
}

function addBooks() {
  addBookToLibrary("1", "2", 321, false);
  addBookToLibrary("1", "2", 321, false);
}

addBooks();
displayBooks();
