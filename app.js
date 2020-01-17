
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
  document.querySelector('.input-form').classList.toggle('form-visibility');
  render(myLibrary);
}

function addBookToLibrary() {
  var bookTitle =  document.getElementById("book-title").value;
  const authorName = document.getElementById("author-name").value;
  const description = document.getElementById("book-description").value;
  const pagesNum = document.getElementById("book-pages").value;
  const status = document.getElementById("read-status").value;
  let book1 =new Book(bookTitle, authorName, description, pagesNum, status);
  createBook(book1);
}


// function for handling click event on New Form.
toggleForm(formBtn);

function toggleForm(button) {
  button.addEventListener('click', function(){
    document.querySelector('.input-form').classList.toggle('form-visibility');
  });
}

// function for handling click event on Submit.
submitBook.addEventListener("click", addBookToLibrary);
function render(arr){
   for (let book of arr) {
    let readingStatus, parentElement, html;
    readingStatus = book.status === "read" ? "You have read this book" : "you haven't read this book";
    html = `<div class= "book-card"><h3 class="book-title">${book.title}</h3>
            <p class="author-name">by ${book.author}</p>
            <p class="description">${book.description}</p>
            <div class="book-details">
               <p class="book-pages"><i class="fa fa-chevron-right"></i> No. of Pages: <span>${book.pages}</span></p>
                <p><i class="fa fa-chevron-right"></i> ${readingStatus}</p>
            </div>
            <div class="btns">
              <button class="btn-read-status book-buttons">Read</button>
              <button class="btn-remove book-buttons">Delete</button>
              <button class="btn-edit book-buttons">Edit</button>
            </div>
        </div>`;
    parentElement = document.querySelector('#book-list');
    parentElement.insertAdjacentHTML('beforeend', html);


   }

}

