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
const readModifier = document.getElementsByClassName("read");
const deleteBtn = document.getElementsByClassName("delete-btn");

const library = [];

function Book(title, author, pages, read) {
  this.title = title || "Unknown";
  this.author = author || "Unknown";
  this.pages = pages || 0;
  this.read = read;
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
  for (let i = 0; i < library.length; i++) {
    const book = document.createElement("div");
    const bookTitle = document.createElement("div");
    const bookAuthor = document.createElement("div");
    const bookPages = document.createElement("div");
    const bookRead = document.createElement("button");
    const delBtn = document.createElement("button");
    book.className = "book";
    //Thank god for TOP advice
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

    if (library[i].read) {
      bookRead.classList.add("yes");
      bookRead.textContent = "ALREADY READ";
    } else {
      bookRead.classList.add("no");
      bookRead.textContent = "NOT READ YET";
    }
    container.appendChild(book);
    book.appendChild(bookTitle);
    book.appendChild(bookAuthor);
    book.appendChild(bookPages);
    book.appendChild(bookRead);
    book.appendChild(delBtn);
  }
  newTitle.value = "";
  newAuthor.value = "";
  newPages.value = "";
  newNotRead.checked = true;
  newBookForm.style.display = "none";

  //even listener located here because in global scope it does not work for dynamically created elements
  Array.from(readModifier).forEach((btn) => {
    btn.addEventListener("click", modifyRead);
  });
  Array.from(deleteBtn).forEach((btn) => {
    btn.addEventListener("click", deleteBook);
  });
}

function openForm() {
  newBookForm.style.display = "block";
}

function modifyRead(e) {
  library[e.target.parentNode.dataset.id].read =
    !library[e.target.parentNode.dataset.id].read;
  if (e.target.classList.contains("yes")) {
    e.target.classList.remove("yes");
    e.target.classList.add("no");
    e.target.textContent = "NOT READ YET";
  } else {
    e.target.classList.remove("no");
    e.target.classList.add("yes");
    e.target.textContent = "ALREADY READ";
  }
}

function deleteBook(e) {
  library.splice(e.target.dataset.id, 1);
  e.target.parentNode.remove();
}

confirmBtn.addEventListener("click", addToLibrary);

newBookBtn.addEventListener("click", openForm);
