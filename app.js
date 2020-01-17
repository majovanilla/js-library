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

myBook = new Book('Lord of the Rings', 'Tolkien', 365, true);

console.log(myBook.info());