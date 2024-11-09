//array to store books
const myLibrary = [];

//constructor
function Books(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

//function to create new book objects and add to array(myLibrary)
function addBookToLibrary(title, author, pages, read) {
  const book = new Books(title, author, pages, read);
  myLibrary.push(book);
  return book;
}

//function to display last book entered
function displayBook() {
  const container = document.querySelector("#container");
  const card = document.querySelector(".card-template");

  //get the last book from myLibrary
  const book = myLibrary[myLibrary.length - 1];

  /*check if there is a book to display*/
  if (book) {
    const clone = document.importNode(card.content, true); //clone template
    const bookTitle = clone.querySelector(".title");
    const bookAuthor = clone.querySelector(".author");
    const bookPages = clone.querySelector(".pages");
    const bookStatus = clone.querySelector(".read-status");

    bookTitle.textContent = book.title;
    bookAuthor.textContent = book.author;
    bookPages.textContent = book.pages;
    bookStatus.textContent = book.read;

    container.appendChild(clone);
  }
}

//add a click event listener on 'add book button' to display a dialog to add books
const dialog = document.querySelector("#dialog");
const addBookButton = document.querySelector("#add-book");
addBookButton.addEventListener("click", () => {
  dialog.showModal();
});

//close dialog
const closeDialog = document.querySelector(".close-dialog");
closeDialog.addEventListener("click", () => {
  dialog.close();
});

//button that submits form and adds book to library
const submitFormButton = document.querySelector("#submit-book-btn");
submitFormButton.addEventListener("click", (e) => {
  e.preventDefault(); //to prevent default behaviour of submit button
  dialog.close();

  const title = document.querySelector("#form-title");
  const author = document.querySelector("#form-author");
  const pages = document.querySelector("#form-pages");
  const read = document.querySelector("#form-read-status");

  addBookToLibrary(title.value, author.value, pages.value, read.value);
  displayBook();

  //clear input fields after "Add to library" button is clicked
  title.value = "";
  author.value = "";
  pages.value = "";
  read.value = "";
});
