
let myLibrary = [];

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



function addBookToLibrary() {
const formBtn = document.querySelector('#new-btn');
  const bookTitle = document.querySelector('#book-title');
  const authorName = document.querySelector('#author-name');
  const description = document.querySelector('#book-description');
  const pagesNum = document.querySelector('#book-pages');
  const status = document.querySelector('#read-status');
  const submitBook = document.querySelector('.submit-button');
  const changeStatus = document.querySelector('.btn-read-status');
  const removeBook = document.querySelector('.btn-remove');
  const editBook = document.querySelector('.btn-edit');

  clickEventHandler(formBtn);
  let inputs = submitBook.addEventListener('click', readInputs(5, authorName, description, pagesNum, status));
  console.log(inputs);
}

// function for handling click event.
function clickEventHandler(button) {
  button.addEventListener('click', function(){
    document.querySelector('.input-form').classList.toggle('form-visibility');

  });
}



function readInputs(bookTit, author, descrip, pages, status){
  return {
    title: bookTit.value,
    authorName: author.value,
    bookDescription: descrip.value,
    noOfPages: pages.value,
    readStatus: status.value

  };
}
addBookToLibrary();
