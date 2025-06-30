const myLibrary = [];
const container = document.querySelector(".container");
const newBookBtn = document.querySelector(".new-book");
const bookDOM = document.querySelectorAll(".book");

function Book(title, author, pages, read, id) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = id;
}

Book.prototype.setRead = function () {
  if (this.read === "Arleady read") {
    this.read = "Not read yet";
  } else {
    this.read = "Arleady read";
  }
};

function addBookToLibrabry(title, author, pages, read) {
  const id = crypto.randomUUID();
  myLibrary.push(new Book(title, author, pages, read, id));

  makeDOMLibrary();
}

function deleteBook(e) {
  const bookId = e.target.parentNode.id;
  for (let i = 0; i < myLibrary.length; i++) {
    if (myLibrary[i].id === bookId) {
      myLibrary.splice(i, 1);
      break;
    }
  }
  makeDOMLibrary();
}

function changeReadStatus(e) {
  const bookId = e.target.parentNode.id;
  for (let i = 0; i < myLibrary.length; i++) {
    if (myLibrary[i].id === bookId) {
      myLibrary[i].setRead();
      break;
    }
  }
  makeDOMLibrary();
}

function makeDOMLibrary() {
  container.innerHTML = "";
  for (let i = 0; i < myLibrary.length; i++) {
    const book = document.createElement("div");
    book.className = "book";
    book.id = myLibrary[i].id;

    const titleSection = document.createElement("div");
    titleSection.className = "title";
    titleSection.textContent = `Title: ${myLibrary[i].title}`;

    const authorSection = document.createElement("div");
    authorSection.className = "author";
    authorSection.textContent = `Author: ${myLibrary[i].author}`;

    const pagesSection = document.createElement("div");
    pagesSection.className = "pages";
    pagesSection.textContent = `Pages: ${myLibrary[i].pages}`;

    const readSection = document.createElement("div");
    readSection.className = "read";
    readSection.textContent = myLibrary[i].read;

    const delBtn = document.createElement("div");
    delBtn.className = "delete-book";
    delBtn.textContent = "DELETE BOOK";

    book.appendChild(titleSection);
    book.appendChild(authorSection);
    book.appendChild(pagesSection);
    book.appendChild(readSection);
    book.appendChild(delBtn);
    container.appendChild(book);
  }
  //variables and eventListener here because they get messed up in global scope
  const deleteBtn = document.querySelectorAll(".delete-book");
  const readBtn = document.querySelectorAll(".read");

  Array.from(deleteBtn).forEach((btn) => {
    btn.addEventListener("click", deleteBook);
  });

  Array.from(readBtn).forEach((btn) => {
    btn.addEventListener("click", changeReadStatus);
  });
}

function createNewBookModal() {
  const modal = document.createElement("div");
  modal.className = "new-book-modal";

  const titleCont = document.createElement("div");
  const titleLabel = document.createElement("label");
  const titleInput = document.createElement("input");
  titleLabel.setAttribute("for", "title-input");
  titleLabel.textContent = "Book title: ";
  titleInput.id = "title-input";
  titleInput.type = "text";
  titleInput.required = "true";
  titleCont.appendChild(titleLabel);
  titleCont.appendChild(titleInput);

  const authorCont = document.createElement("div");
  const authorLabel = document.createElement("label");
  const authorInput = document.createElement("input");
  authorLabel.setAttribute("for", "author-input");
  authorLabel.textContent = "Book author: ";
  authorInput.id = "author-input";
  authorInput.type = "text";
  authorInput.required = "true";
  authorCont.appendChild(authorLabel);
  authorCont.appendChild(authorInput);

  const pagesCont = document.createElement("div");
  const pagesLabel = document.createElement("label");
  const pagesInput = document.createElement("input");
  pagesLabel.setAttribute("for", "pages-input");
  pagesLabel.textContent = "Number of pages: ";
  pagesInput.id = "pages-input";
  pagesInput.type = "number";
  pagesInput.min = 1;
  pagesInput.required = "true";
  pagesCont.appendChild(pagesLabel);
  pagesCont.appendChild(pagesInput);

  const readCont = document.createElement("div");
  const readLabel = document.createElement("label");
  const readInput = document.createElement("input");
  readLabel.setAttribute("for", "read-input");
  readLabel.textContent = "I have already read this book.";
  readInput.id = "read-input";
  readInput.type = "checkbox";
  readCont.appendChild(readLabel);
  readCont.appendChild(readInput);

  const btnCont = document.createElement("div");
  const confirmBtn = document.createElement("button");
  confirmBtn.type = "button";
  confirmBtn.textContent = "CONFIRM BOOK";
  confirmBtn.id = "confirm-btn";
  btnCont.appendChild(confirmBtn);

  modal.appendChild(titleCont);
  modal.appendChild(authorCont);
  modal.appendChild(pagesCont);
  modal.appendChild(readCont);
  modal.appendChild(btnCont);

  document.body.appendChild(modal);
  //event listener put inside here because otherwise dynamically generated content
  //would not be found by document.querySelector() from global scope
  confirmBtn.addEventListener("click", () => {
    if (
      titleInput.value &&
      authorInput.value &&
      (+pagesInput.value > 0 || Number.isInteger(+pagesInput.value))
    ) {
      let isRead;
      if (readInput.checked) {
        isRead = "Arleady read";
      } else {
        isRead = "Not read yet";
      }

      addBookToLibrabry(
        titleInput.value,
        authorInput.value,
        +pagesInput.value,
        isRead
      );
      modal.remove();
      return;
    }
    if (!titleInput.value) {
      console.log("please write a title for the book");
    }
    if (!authorInput.value) {
      console.log("please write an author for the book");
    }
    if (+pagesInput.value <= 0 || Number.isInteger(+pagesInput.value)) {
      console.log("The number of pages needs to be an integer greater than 0");
    }
  });
}

newBookBtn.addEventListener("click", createNewBookModal);
