let myLibrary = [];
let operation = null;

const domSelector = {
  formBtn: document.querySelector('#new-btn'),
  submitBook: document.querySelector('.submit-button'),
  form: document.querySelector('.input-form'),
  bookTitle: document.getElementById('book-title'),
  authorName: document.getElementById('author-name'),
  description: document.getElementById('book-description'),
  pagesNum: document.getElementById('book-pages'),
};

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
  domSelector.form.classList.toggle('form-visibility');
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
  render(myLibrary);
}

function readInputValues() {
  return {
    bookTitle: domSelector.bookTitle.value,
    authorName: domSelector.authorName.value,
    description: domSelector.description.value,
    pagesNum: domSelector.pagesNum.value,
    status: document.querySelector('input[name="read"]:checked').value,
  };
}

function clearForm() {
  domSelector.form.reset();
  operation = null;
}

function toggleForm(button) {
  button.addEventListener('click', () => {
    domSelector.form.classList.toggle('form-visibility');
  });
}

toggleForm(domSelector.formBtn);

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
  domSelector.form.classList.toggle('form-visibility');
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
  render(myLibrary);
}

function sendInfoToForm(bookIndex) {
  operation = bookIndex;
  domSelector.bookTitle.value = myLibrary[bookIndex].title;
  domSelector.authorName.value = myLibrary[bookIndex].author;
  domSelector.description.value = myLibrary[bookIndex].description;
  domSelector.pagesNum.value = myLibrary[bookIndex].pages;
}

function editBookInfo(bookId) {
  const index = getIndexofBook(bookId);
  const classStatus = domSelector.form.classList.contains('form-visibility');
  if (classStatus === false) {
    domSelector.form.classList.add('form-visibility');
  }
  sendInfoToForm(index);
}

function addBookToLibrary() {
  const { bookTitle, authorName, description, pagesNum, status } = readInputValues();
  const id = randomId();
  const book = new Book(id, bookTitle, authorName, description, pagesNum, status);
  const valid = inputValid(bookTitle, authorName, description, pagesNum);

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

domSelector.submitBook.addEventListener('click', selectOperation);

export { deleteBook, editBookInfo, changeStatus };
