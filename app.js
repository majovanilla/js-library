
let myLibrary = [];

const formBtn = document.querySelector('#new-btn');
const submitBook = document.querySelector('.submit-button');
const changeStatus = document.querySelector('.btn-read-status');
const removeBook = document.querySelector('.btn-remove');
const editBook = document.querySelector('.btn-edit');

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function() {
        var alreadyRead = this.read == true ? "already read" : "not read yet";
        return `${this.title} by ${this.author}, ${this.pages} pages, ${alreadyRead}.`
    }
}

function createBook(book) {
  myLibrary.push(book);
}

function addBookToLibrary() {
  const bookTitle = document.getElementById('book-title').value;
  console.log(bookTitle);
  const authorName = document.getElementById('author-name').value;
  const description = document.getElementById('book-description').value;
  const pagesNum = document.getElementById('book-pages').value;
  const status = document.getElementById('read-status').value;

  createBook(new Book(bookTitle, authorName, description, pagesNum, status));
}


// function for handling click event on New Form.
toggleForm(formBtn);

function toggleForm(button) {
  button.addEventListener('click', function(){
    document.querySelector('.input-form').classList.toggle('form-visibility');
  });
}

// function for handling click event on Submit.
submitForm(submitBook);

function submitForm(button) {
  button.addEventListener('click', addBookToLibrary());
}

console.log(myLibrary);