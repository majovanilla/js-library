
let myLibrary = [];

const formBtn = document.querySelector('#new-btn');
const submitBook = document.querySelector('.submit-button');
const changeStatus = document.querySelector('.btn-read-status');
const removeBook = document.querySelector('.btn-remove');
const editBook = document.querySelector('.btn-edit');
const form = document.querySelector('.input-form');

function Book(id, title, author, description, pages, read) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.description = description;
    this.pages = pages;
    this.read = read;

    this.info = function() {
        var alreadyRead = this.read == true ? "already read" : "not read yet";
        return `${this.title} by ${this.author}, ${this.pages} pages, ${alreadyRead}.`
    }
}

function createBook(book) {
  myLibrary.push(book);
  document.querySelector('.input-form').classList.toggle('form-visibility');
}

function addBookToLibrary() {
  const bookTitle =  document.getElementById("book-title").value;
  const authorName = document.getElementById("author-name").value;
  const description = document.getElementById("book-description").value;
  const pagesNum = document.getElementById("book-pages").value;
  const status = document.getElementById("read-status").value;
  const id = randomId();
  let book =new Book(id, bookTitle, authorName, description, pagesNum, status);
  let valid = inputValid(bookTitle, authorName, description, pagesNum);

  if (valid == true) {createBook(book)};
  render(id, bookTitle, authorName, description, pagesNum, status);
  form.reset();
}

// function for handling click event on New Form.
toggleForm(formBtn);

function toggleForm(button) {
  button.addEventListener('click', function(){
    form.classList.toggle('form-visibility');
  });
}

// function for handling click event on Submit.
submitBook.addEventListener("click", addBookToLibrary);

function render(id, title, author, description, pages, status){
    let readingStatus, parentElement, html;
    readingStatus = status === "read" ? "You have read this book" : "you haven't read this book";
    bookStatus = status === "read" ? "Unread" : "Read";
    html = `<div class= "book-card" id="${id}"><h3 class="book-title">${title}</h3>
            <p class="author-name">by ${author}</p>
            <p class="description">${description}</p>
            <div class="book-details">
               <p class="book-pages"><i class="fa fa-chevron-right"></i> No. of Pages: <span>${pages}</span></p>
                <p><i class="fa fa-chevron-right"></i> ${readingStatus}</p>
            </div>
            <div class="btns">
              <button class="btn-read-status book-buttons">${bookStatus}</button>
              <button class="btn-remove book-buttons">Delete</button>
              <button class="btn-edit book-buttons">Edit</button>
            </div>
        </div>`;
    
    parentElement = document.querySelector('#book-list').insertAdjacentHTML('beforeend', html); 
}

function modifyStatus(book) {
  changeStatus.addEventListener('click', function() {
    document.getElementById(`"${book.id}"`)
  })
}

function inputValid(a, b, c, d) {
  if (a == "" || b == "" || c == "" || d == "") {
    alert('You need to fill all the form');
    return false;
  }
  return true;
}

function randomId() {
  return '_' + Math.random().toString(36).substr(2, 9);
};

console.log(myLibrary);