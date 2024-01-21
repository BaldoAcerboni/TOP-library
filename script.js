//DOM
const container = document.getElementById("container");
const newBookBtn = document.getElementById("new-book");
const confirmBtn = document.getElementById("confirm-btn");
const newBookForm = document.getElementById("new-book-form");
const newTitle = document.getElementById("new-title");
const newAuthor = document.getElementById("author");
const newPages = document.getElementById("pages");
const newRead = document.getElementById("read");
const newNotRead = document.getElementById("not-read");
const titleElement = document.getElementsByClassName("title");
const authorElement = document.getElementsByClassName("author");
const pagesElement = document.getElementsByClassName("pages");
const readModifier = document.getElementsByClassName("read");
const deleteBtn = document.getElementsByClassName("delete-btn");
const bookElements = document.getElementsByClassName("book");
const tip = document.getElementById("tip");
const editModal = document.getElementById("edit");
const editLabel = document.getElementById("edit-label");
const editInput = document.getElementById("edit-input");
const editBtn = document.getElementById("confirm-edit");

const library = [];

//variable used to store the index of the book being edited
//necessary because the confirm button in the edit modal has no target associated
//with it unlike the delete btn or the read/not-read btn
let bookBeingEdited;

function Book(title, author, pages, read) {
  this.title = title || "Unknown";
  this.author = author || "Unknown";
  this.pages = pages || 0;
  this.read = read;
  this.id = undefined;
}

function addToLibrary() {
  let haveRead;
  if (newRead.checked) {
    haveRead = true;
  } else {
    haveRead = false;
  }
  const newBook = new Book(
    newTitle.value,
    newAuthor.value,
    newPages.value,
    haveRead
  );
  library.push(newBook);
  container.innerHTML = "";

  displayBooks();

  newTitle.value = "";
  newAuthor.value = "";
  newPages.value = "";
  newNotRead.checked = true;
  newBookForm.style.display = "none";

  //even listener located here because in global scope it does not work for dynamically created elements
  bookEventListener();
}

function displayBooks() {
  for (let i = 0; i < library.length; i++) {
    const book = document.createElement("div");
    const bookTitle = document.createElement("div");
    const bookAuthor = document.createElement("div");
    const bookPages = document.createElement("div");
    const bookRead = document.createElement("button");
    const delBtn = document.createElement("button");
    book.className = "book";
    book.dataset.id = i;
    bookTitle.className = "title";
    bookAuthor.className = "author";
    bookPages.className = "pages";
    bookRead.className = "read";
    delBtn.className = "delete-btn";
    bookTitle.textContent = `Title: ${library[i].title}`;
    bookAuthor.textContent = `Author: ${library[i].author}`;
    bookPages.textContent = `Pages: ${library[i].pages}`;
    delBtn.textContent = `DELETE BOOK`;

    container.appendChild(book);
    book.appendChild(bookTitle);
    book.appendChild(bookAuthor);
    book.appendChild(bookPages);
    book.appendChild(bookRead);
    book.appendChild(delBtn);

    library[i].id = i;
    if (library[i].read) {
      bookRead.classList.add("yes");
      bookRead.textContent = "ALREADY READ";
    } else {
      bookRead.classList.add("no");
      bookRead.textContent = "NOT READ YET";
    }
  }
}

function bookEventListener() {
  //TIPS ON HOVER
  Array.from(bookElements).forEach((b) => {
    b.addEventListener("mouseover", () => {
      tip.style.display = "flex";
    });
  });
  Array.from(bookElements).forEach((b) => {
    b.addEventListener("mouseout", () => {
      tip.style.display = "none";
    });
  });
  //EDITS
  Array.from(titleElement).forEach((tE) => {
    tE.addEventListener("click", editTitle);
  });
  Array.from(authorElement).forEach((aE) => {
    aE.addEventListener("click", editAuthor);
  });
  Array.from(pagesElement).forEach((pE) => {
    pE.addEventListener("click", editPages);
  });

  //btns
  Array.from(readModifier).forEach((btn) => {
    btn.addEventListener("click", modifyRead);
  });
  Array.from(deleteBtn).forEach((btn) => {
    btn.addEventListener("click", deleteBook);
  });
}

function editTitle(e) {
  editModal.style.display = "flex";
  editModal.className = "title-edit";
  editLabel.textContent = "Edit the title as necessary";
  editInput.value = library[e.target.parentNode.dataset.id].title;
  bookBeingEdited = library[e.target.parentNode.dataset.id].id;
}

function editAuthor(e) {
  editModal.style.display = "flex";
  editModal.className = "author-edit";
  editLabel.textContent = "Edit the author as necessary";
  editInput.value = library[e.target.parentNode.dataset.id].author;
  bookBeingEdited = library[e.target.parentNode.dataset.id].id;
}

function editPages(e) {
  editModal.style.display = "flex";
  editModal.className = "pages-edit";
  editLabel.textContent = "Edit the pages as necessary";
  editInput.type = "number";
  editInput.value = library[e.target.parentNode.dataset.id].pages;
  bookBeingEdited = library[e.target.parentNode.dataset.id].id;
}

function confirmEdit(id, section, value) {
  if (editModal.className === "title-edit") {
    library[bookBeingEdited].title = editInput.value;
  } else if (editModal.className === "author-edit") {
    library[bookBeingEdited].author = editInput.value;
  } else if (editModal.className === "pages-edit") {
    library[bookBeingEdited].pages = editInput.value;
  }
  editModal.style.display = "none";
  editInput.type = "text";
  container.innerHTML = "";

  displayBooks();
  bookEventListener();
}

function openForm() {
  newBookForm.style.display = "block";
}

function modifyRead(e) {
  if (e.target.classList.contains("yes")) {
    e.target.classList.remove("yes");
    e.target.classList.add("no");
    e.target.textContent = "NOT READ YET";
  } else {
    e.target.classList.remove("no");
    e.target.classList.add("yes");
    e.target.textContent = "ALREADY READ";
  }
  library[e.target.parentNode.dataset.id].read =
    !library[e.target.parentNode.dataset.id].read;
}

function deleteBook(e) {
  e.target.parentNode.remove();

  //code below is to modify the data-id of each book following the deleted element
  //otherwise they'd be messed up after each book deletion and they'd be decoupled
  //from their book obj inside -library-
  const books = document.querySelectorAll(".book");
  Array.from(books).forEach((book) => {
    if (book.dataset.id > e.target.parentNode.dataset.id) {
      book.dataset.id = `${Number(book.dataset.id) - 1}`;
    }
  });
  library.splice(e.target.parentNode.dataset.id, 1);
  for (let i = 0; i < library.length; i++) {
    library[i].id = i;
  }
}

confirmBtn.addEventListener("click", addToLibrary);

newBookBtn.addEventListener("click", openForm);

editBtn.addEventListener("click", confirmEdit);
