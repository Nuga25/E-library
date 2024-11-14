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

// Global flag for tracking edit mode and index of book being edited
let isEditMode = false;
let editIndex = null;

//function to create new book objects and add to array(myLibrary)
function addBookToLibrary(title, author, pages, genre, read, bookCover) {
  const book = new Books(title, author, pages, genre, read, bookCover);
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
    const bookGenre = clone.querySelector(".genre");
    const bookStatus = clone.querySelector(".read-status");
    const bookBookCover = clone.querySelector(".book-cover");

    bookTitle.textContent = book.title;
    bookAuthor.textContent = book.author;
    bookPages.textContent = book.pages;
    bookGenre.textContent = book.genre;
    bookStatus.textContent = book.read;
    bookBookCover.imageData = book.bookCover;

    //update book status to completed if book is marked as read
    const bookCheckbox = clone.querySelector(".read-status");
    book.updateToggle(bookCheckbox);

    //handles book deletion
    const bookDiv = clone.querySelector(".card");
    const deleteButton = clone.querySelector(".delete-book");
    deleteBook(bookDiv, deleteButton, book);

    //handles book edition
    const editButton = clone.querySelector(".edit-book");
    editBook(bookDiv, editButton, book);

    //append clone to the page container
    container.appendChild(clone);
  }
}

//function to edit book
function editBook(bookDiv, editButton, book) {
  // Set the data-index attribute for tracking
  const index = myLibrary.indexOf(book);
  bookDiv.dataset.index = index;

  editButton.addEventListener("click", () => {
    // Always retrieve the latest book values from the library
    const currentBook = myLibrary[index];

    if (isEditMode === true && editIndex === index) {
      //populate the input fields with current value of index
      document.querySelector("#form-title").value = currentBook.title;
      document.querySelector("#form-author").value = currentBook.author;
      document.querySelector("#form-pages").value = currentBook.pages;
      document.querySelector("#form-genre").value = currentBook.genre;
      document.querySelector(".form-read-status").checked = currentBook.read;
      document.querySelector("#form-book-cover").files = currentBook.bookCover;
    }

    document.querySelector("#submit-book-btn").textContent = "Save";

    isEditMode = true;
    editIndex = index;

    dialog.showModal();
  });
}

// Function to update a book's display after editing
function updateBookDisplay(index) {
  const book = myLibrary[index];
  const bookElement = document.querySelector(`.card[data-index="${index}"]`);

  if (bookElement) {
    bookElement.querySelector(".title").textContent = book.title.value;
    bookElement.querySelector(".author").textContent = book.author.value;
    bookElement.querySelector(".pages").textContent = book.pages.value;
    bookElement.querySelector(".genre").textContent = book.genre.value;

    // Update read status display and toggle
    const readStatusElement = bookElement.querySelector(".read-status");
    readStatusElement.textContent = book.read === "yes" ? "Read" : "Not read";
    readStatusElement.checked = book.read === "yes";

    // Toggle read status when checkbox is clicked
    readStatusElement.addEventListener("change", () => {
      book.read = readStatusElement.checked ? "yes" : "no";
      readStatusElement.textContent = book.read === "yes" ? "Read" : "Not read";
    });
  }
}

//function to delete book
function deleteBook(bookDiv, deleteButton, book) {
  // Set the data-index attribute for tracking
  const index = myLibrary.indexOf(book);
  bookDiv.dataset.index = index;

  //add event listner to delete book button to remove book from library and DOM
  deleteButton.addEventListener("click", () => {
    myLibrary.splice(index, 1);
    bookDiv.remove();

    // Update indices for the remaining books
    const bookElements = document.querySelectorAll(".card");
    bookElements.forEach((bookElement, newIndex) => {
      bookElement.dataset.index = newIndex;
    });
  });
}

//add a click event listener on 'add book button' to display a dialog to add books
const dialog = document.querySelector("#dialog");
const addBookButton = document.querySelector("#add-book");
addBookButton.addEventListener("click", () => {
  isEditMode = false; // Reset mode for new entry
  editIndex = null;

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

  const title = document.querySelector("#form-title");
  const author = document.querySelector("#form-author");
  const pages = document.querySelector("#form-pages");
  const genre = document.querySelector("#form-genre");
  const read = document.querySelector("input[name='readStatus']:checked");
  const bookCoverInput = document.querySelector("#form-book-cover");

  let bookCover = null;
  if (bookCoverInput.files.length > 0) {
    bookCover = bookCoverInput.files[0]; // Get the file from the file input
  }

  //check for form validty
  const form = document.querySelector("#form");
  if (form.checkValidity()) {
    if (isEditMode && editIndex !== null) {
      // Edit existing book
      myLibrary[editIndex] = { title, author, pages, genre, read, bookCover };
      updateBookDisplay(editIndex);
    } else {
      addBookToLibrary(
        title.value,
        author.value,
        pages.value,
        genre.value,
        read.value,
        bookCoverInput.files[0]
      );
      displayBook();
    }

    //close dialog
    dialog.close();

    //clear input fields after "Add to library" button is clicked
    document.querySelector("form").reset();
  } else {
    //if from is invalid, trigger built-in validation messages
    form.reportValidity();
  }
});
