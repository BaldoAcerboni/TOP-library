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

function addBookToLibrabry(title, author, pages, read) {
  const id = crypto.randomUUID();
  myLibrary.push(new Book(title, author, pages, read, id));
  container.innerHTML = "";

  makeDOMLibrary();
}

function makeDOMLibrary() {
  for (let i = 0; i < myLibrary.length; i++) {
    const book = document.createElement("div");
    book.className = "book";

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
  titleCont.appendChild(titleLabel);
  titleCont.appendChild(titleInput);

  const authorCont = document.createElement("div");
  const authorLabel = document.createElement("label");
  const authorInput = document.createElement("input");
  authorLabel.setAttribute("for", "author-input");
  authorLabel.textContent = "Book author: ";
  authorInput.id = "author-input";
  authorInput.type = "text";
  authorCont.appendChild(authorLabel);
  authorCont.appendChild(authorInput);

  const pagesCont = document.createElement("div");
  const pagesLabel = document.createElement("label");
  const pagesInput = document.createElement("input");
  pagesLabel.setAttribute("for", "pages-input");
  pagesLabel.textContent = "Number of pages: ";
  pagesInput.id = "pages-input";
  pagesInput.type = "number";
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
  btnCont.appendChild(confirmBtn);

  modal.appendChild(titleCont);
  modal.appendChild(authorCont);
  modal.appendChild(pagesCont);
  modal.appendChild(readCont);
  modal.appendChild(btnCont);

  document.body.appendChild(modal);
  // console.log(!!titleInput.value); //false if empty
  // console.log(!!authorInput.value); //false if empty
  // console.log(!!pagesInput.value); //false if empty
}

// addBookToLibrabry("bubi of the baba of the bobo", "baba", 77, "already read");
addBookToLibrabry("title", "author", 29, "not read yet");

newBookBtn.addEventListener("click", createNewBookModal);
