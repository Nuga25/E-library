//array to store books
const myLibrary = [];

//constructor
function Books(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

//function to create new book objects and add to array
function addBookToLibrary(title, author, pages, read) {
  const book = new Books(title, author, pages, read);
  myLibrary.push(book);
  return book;
}

//manually added books to library to test
let book1 = addBookToLibrary("hello world", "ifeoluwa", 200, "yes");
let book3 = addBookToLibrary("hey pookie", "tiktok", 280, "yes");
let book2 = addBookToLibrary("Dark Vanessa", "Nuga", 150, "not read");

//function to display each book
function displayEachBook() {
  myLibrary.forEach((book) => {
    const container = document.querySelector("#container");
    const card = document.querySelector(".card-template");
    const clone = document.importNode(card.content, true);
    const bookTitle = clone.querySelector(".title");
    const bookAuthor = clone.querySelector(".author");
    const bookPages = clone.querySelector(".pages");
    const bookStatus = clone.querySelector(".read-status");

    bookTitle.textContent = book.title;
    bookAuthor.textContent = book.author;
    bookPages.textContent = book.pages;
    bookStatus.textContent = book.read;

    container.appendChild(clone);
  });
}
displayEachBook();
