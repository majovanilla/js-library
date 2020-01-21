
let myLibrary = [];

const formBtn = document.querySelector('#new-btn');
const submitBook = document.querySelector('.submit-button');
// const readStatus = document.querySelector('.btn-read-status');
const removeBook = document.querySelector('.btn-remove');
const editBook = document.querySelector('.btn-edit');
const form = document.querySelector('.input-form');

createBook(new Book('123ser', 'test book', 'test author', 'test book description', 1234, 'unread'));
createBook(new Book('123r', 'test book 2', 'test author random', 'test book description 2', 134, 'unread'));

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
  render(myLibrary);
}

function addBookToLibrary() {
  const bookTitle =  document.getElementById("book-title").value;
  const authorName = document.getElementById("author-name").value;
  const description = document.getElementById("book-description").value;
  const pagesNum = document.getElementById("book-pages").value;
  const status = document.querySelector('input[name="read"]:checked').value;
  const id = randomId();
  let book =new Book(id, bookTitle, authorName, description, pagesNum, status);
  let valid = inputValid(bookTitle, authorName, description, pagesNum);

  if (valid == true) {createBook(book);}
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

  function render(arr){
    let html = "";
    for (let book of arr) {
      let readingStatus = book.read == "read" ? "You have read this book" : "You haven't read this book";
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
                <button class="btn-edit book-buttons">Edit</button>
              </div>
          </div>`;
    }  
    // document.querySelector('#book-list').insertAdjacentHTML('beforeend', html);
    document.getElementById('book-list').innerHTML = html;
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

function deleteBook(id) {
  let index = getIndexofBook(id);
  myLibrary.splice(index, 1);
  render(myLibrary);
}

function changeStatus(id){
  let index = getIndexofBook(id);
  myLibrary[index].read = myLibrary[index].read == 'read' ? 'unread' : 'read';
  render(myLibrary);
}

function getIndexofBook(bookId) {
  let ids = myLibrary.map(current => current.id);
  let index = ids.indexOf(bookId);
  return index;
}