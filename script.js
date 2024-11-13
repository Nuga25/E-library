//array to store books
const myLibrary = [];

//constructor
function Books(title, author, pages, genre, read, bookCover) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.genre = genre;
  this.read = read;
  this.bookCover = bookCover;
}
Books.prototype.updateToggle = function (checkbox) {
  if (this.read === "yes") {
    checkbox.checked = true;
  }
};

//function to create new book objects and add to array(myLibrary)
function addBookToLibrary(title, author, pages, genre, read, bookCover) {
  const book = new Books(title, author, pages, genre, read, bookCover);
  myLibrary.push(book);
  return book;
}

addBookToLibrary(
  "Broken: Not a halal love story",
  "Fatima Bala",
  298,
  "romance",
  "yes"
);
displayBook();

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
    const bookGenre = clone.querySelector(".genre");
    const bookStatus = clone.querySelector(".read-status");
    const bookBookCover = clone.querySelector(".book-cover");

    bookTitle.textContent = book.title;
    bookAuthor.textContent = book.author;
    bookPages.textContent = book.pages;
    bookGenre.textContent = book.genre;
    bookStatus.textContent = book.read;
    bookBookCover.textContent = book.bookCover;

    //update book status to completed if book is marked as read
    const bookCheckbox = clone.querySelector(".read-status");
    book.updateToggle(bookCheckbox);

    //append clone to the page container
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

//edit dialog
// const editDialog = document.querySelector(".edit-dialog");
// editDialog.addEventListener("click", () => {
//   dialog.showModal();
// });

//button that submits form and adds book to library
const submitFormButton = document.querySelector("#submit-book-btn");
submitFormButton.addEventListener("click", (e) => {
  e.preventDefault(); //to prevent default behaviour of submit button

  const title = document.querySelector("#form-title");
  const author = document.querySelector("#form-author");
  const pages = document.querySelector("#form-pages");
  const genre = document.querySelector("#form-genre");
  const read = document.querySelector("input[name='readStatus']:checked");
  const bookCover = document.querySelector("#form-book-cover");

  //check for form validty
  const form = document.querySelector("#form");
  if (form.checkValidity()) {
    addBookToLibrary(
      title.value,
      author.value,
      pages.value,
      genre.value,
      read.value,
      bookCover.files[0]
    );
    displayBook();
    //close dialog
    dialog.close();

    //clear input fields after "Add to library" button is clicked
    document.querySelector("form").reset();
  } else {
    //if from is invalid, trigger built-in validation messages
    form.reportValidity();
  }
});
