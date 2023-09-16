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

function createCard(book) {
  let card = document.createElement("li");
  let title = document.createElement("p");
  title.textContent = `"${book.title}"`;
  card.appendChild(title);
  let author = document.createElement("p");
  author.textContent = `${book.author}`;
  card.appendChild(author);
  let pages = document.createElement("p");
  pages.textContent = `${book.pages} pages`;
  card.appendChild(pages);
  let readStatus = document.createElement("button");
  let readButtonPara = document.createElement("p");
  readStatus.textContent = book.read ? "Read" : "Not read";
  readStatus.classList.add(book.read ? "read" : "not-read");
  readButtonPara.appendChild(readStatus);
  card.appendChild(readButtonPara);
  
  let removeButtonPara = document.createElement("p");
  let removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButtonPara.appendChild(removeButton);
  card.appendChild(removeButtonPara);
  
  card.classList.add("book-card");
  console.log(title);
  return card;
}

function displayBooks() {
  const display = document.querySelector(".book-list");
  myLibrary.forEach((book) => {
    display.appendChild(createCard(book));
  });
}

function addBooks() {
  addBookToLibrary("1", "2", 321, false);
  addBookToLibrary("1", "2", 321, false);
}

addBooks();
displayBooks();
