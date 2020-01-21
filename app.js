
let myLibrary = [];
let operation = null;
const formBtn = document.querySelector('#new-btn');
const submitBook = document.querySelector('.submit-button');
const form = document.querySelector('.input-form');

function render(arr) {
  let html = '';
  arr.forEach((book) => {
    const readingStatus = book.read === 'read' ? 'You have read this book' : "You haven't read this book";
    html += `<div class= "book-card"><h3 class="book-title">${book.title}</h3>
              <p class="author-name">by ${book.author}</p>
              <p class="description">${book.description}</p>
              <div class="book-details">
                <p class="book-pages"><i class="fa fa-chevron-right"></i> No. of Pages: <span>${book.pages}</span></p>
                  <p><i class="fa fa-chevron-right"></i> ${readingStatus}</p>
              </div>
              <div class="btns">
                <button class="btn-read-status book-buttons" onclick="changeStatus('${book.id}')">Read</button>
                <button class="btn-remove book-buttons" onclick="deleteBook('${book.id}')">Delete</button>
                <button class="btn-edit book-buttons" onclick="editBookInfo('${book.id}')">Edit</button>
              </div>
          </div>`;
  });
  document.getElementById('book-list').innerHTML = html;
}

const storedBooks = JSON.parse(localStorage.getItem('myLibrary'));
if (storedBooks) {
  myLibrary = [...storedBooks];
  render(myLibrary);
}

function Book(id, title, author, description, pages, read) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.description = description;
  this.pages = pages;
  this.read = read;
}

function createBook(book) {
  myLibrary.push(book);
  document.querySelector('.input-form').classList.toggle('form-visibility');
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
  render(myLibrary);
}

function readInputValues() {
  return {
    bookTitle: document.getElementById('book-title').value,
    authorName: document.getElementById('author-name').value,
    description: document.getElementById('book-description').value,
    pagesNum: document.getElementById('book-pages').value,
    status: document.querySelector('input[name="read"]:checked').value,
  };
}

function clearForm() {
  form.reset();
  operation = null;
}

function toggleForm(button) {
  button.addEventListener('click', () => {
    form.classList.toggle('form-visibility');
  });
}

toggleForm(formBtn);

function inputValid(a, b, c, d) {
  if (a === '' || b === '' || c === '' || d === '') {
    return false;
  }
  return true;
}

function randomId() {
  return Math.random().toString(36).substr(2, 9);
}

function getIndexofBook(bookId) {
  const ids = myLibrary.map((current) => current.id);
  const index = ids.indexOf(bookId);
  return index;
}

function saveEditedInfo(index) {
  const changedInputs = readInputValues();
  myLibrary[index].title = changedInputs.bookTitle;
  myLibrary[index].author = changedInputs.authorName;
  myLibrary[index].description = changedInputs.description;
  myLibrary[index].pages = changedInputs.pagesNum;
  myLibrary[index].read = changedInputs.status;
  clearForm();
  form.classList.toggle('form-visibility');
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
  render(myLibrary);
}

function sendInfoToForm(bookIndex) {
  operation = bookIndex;
  document.getElementById('book-title').value = myLibrary[bookIndex].title;
  document.getElementById('author-name').value = myLibrary[bookIndex].author;
  document.getElementById('book-description').value = myLibrary[bookIndex].description;
  document.getElementById('book-pages').value = myLibrary[bookIndex].pages;
}

function editBookInfo(bookId) {
  const index = getIndexofBook(bookId);
  const classStatus = form.classList.contains('form-visibility');
  if (classStatus === false) {
    form.classList.add('form-visibility');
  }
  sendInfoToForm(index);
}

function addBookToLibrary() {
  const bookInfo = readInputValues();
  const id = randomId();
  const book = new Book(id, bookInfo.bookTitle, bookInfo.authorName,
    bookInfo.description, bookInfo.pagesNum, bookInfo.status);
  const valid = inputValid(bookInfo.bookTitle, bookInfo.authorName, bookInfo.description,
    bookInfo.pagesNum);

  if (valid === true) { createBook(book); }
  clearForm();
}

function deleteBook(id) {
  const index = getIndexofBook(id);
  myLibrary.splice(index, 1);
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
  render(myLibrary);
}

function changeStatus(id) {
  const index = getIndexofBook(id);
  myLibrary[index].read = myLibrary[index].read === 'read' ? 'unread' : 'read';
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
  render(myLibrary);
}

function selectOperation() {
  if (operation === null) {
    addBookToLibrary();
  } else {
    saveEditedInfo(operation);
  }
}

submitBook.addEventListener('click', selectOperation);
