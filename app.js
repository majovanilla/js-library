
let myLibrary = [];
let operation = null;
const formBtn = document.querySelector('#new-btn');
const submitBook = document.querySelector('.submit-button');
// const readStatus = document.querySelector('.btn-read-status');
const removeBook = document.querySelector('.btn-remove');
//const editBook = document.querySelector('.btn-edit');
const form = document.querySelector('.input-form');

// for the local storage
let storedBooks = JSON.parse(localStorage.getItem("myLibrary"));
if(storedBooks)
  {
    myLibrary = [...storedBooks];
    render(myLibrary);
  }

function selectOperation(){
  operation == null ? addBookToLibrary() : saveEditedInfo(operation);
}

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
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
  render(myLibrary);
}

// Reads input values from the form.
function readInputValues(){
  return {
  bookTitle: document.getElementById("book-title").value,
  authorName: document.getElementById("author-name").value,
  description: document.getElementById("book-description").value,
  pagesNum: document.getElementById("book-pages").value,
  status: document.querySelector('input[name="read"]:checked').value
  }
}
function addBookToLibrary() {
  let bookInfo = readInputValues();
  const id = randomId();
  let book =new Book(id, bookInfo.bookTitle, bookInfo.authorName, bookInfo.description, bookInfo.pagesNum, bookInfo.status);
  let valid = inputValid(bookInfo.bookTitle, bookInfo.authorName, bookInfo.description, bookInfo.pagesNum);

  if (valid == true) {createBook(book);}
  clearForm();
}


function clearForm()
{
  form.reset();
  operation = null;
}
// function for handling click event on New Form.
toggleForm(formBtn);

function toggleForm(button) {
  button.addEventListener('click', function(){
    form.classList.toggle('form-visibility');
  });
}

// function for handling click event on Submit.
submitBook.addEventListener("click", selectOperation);

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
                <button class="btn-edit book-buttons" onclick="editBookInfo('${book.id}')">Edit</button>
              </div>
          </div>`;
    }
    // document.querySelector('#book-list').insertAdjacentHTML('beforeend', html);
    document.getElementById('book-list').innerHTML = html;
}

// Validates the input form.
function inputValid(a, b, c, d) {
  if (a == "" || b == "" || c == "" || d == "") {
    alert('You need to fill all the form');
    return false;
  }
  return true;
}
// Generate random IDs for books.
function randomId() {
  return '_' + Math.random().toString(36).substr(2, 9);
};
//Delete book from the array.
function deleteBook(id) {
  let index = getIndexofBook(id);
  myLibrary.splice(index, 1);
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
  render(myLibrary);
}
// Changes the reading status.
function changeStatus(id){
  let index = getIndexofBook(id);
  myLibrary[index].read = myLibrary[index].read == 'read' ? 'unread' : 'read';
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
  render(myLibrary);
}

// Finds the index of book in myLibrary array.
function getIndexofBook(bookId) {
  let ids = myLibrary.map(current => current.id);
  let index = ids.indexOf(bookId);
  return index;
}

// Main function to edit the book info.
function editBookInfo(bookId){
  let index = getIndexofBook(bookId);
  let classStatus = form.classList.contains('form-visibility');
  if(classStatus == false);
  {
    form.classList.add('form-visibility');
  }
  sendInfoToForm(index);
}

function saveEditedInfo(index){
  let changedInputs = readInputValues();
  myLibrary[index].title = changedInputs.bookTitle;
  myLibrary[index].author = changedInputs.authorName;
  myLibrary[index].description = changedInputs.description;
  myLibrary[index].pages = changedInputs.pagesNum;
  myLibrary[index].read = changedInputs.status;
  clearForm();
  form.classList.toggle('form-visibility');
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
  render(myLibrary);
}

// sends the existing book info to the form for editing.
function sendInfoToForm(bookIndex){
  operation = bookIndex;
  document.getElementById('book-title').value = myLibrary[bookIndex].title;
  document.getElementById('author-name').value = myLibrary[bookIndex].author;
  document.getElementById('book-description').value = myLibrary[bookIndex].description;
  document.getElementById('book-pages').value = myLibrary[bookIndex].pages;
  //document.querySelector('input[name="read"]:checked').value = myLibrary[bookIndex].read;

}

