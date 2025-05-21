const myLibrary = []

function Book(title, author, numberOfPages, isRead) {
  if (!new.target) {
    throw Error("Book instance should be created by 'new' operator");
  }

  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.isRead = isRead;

  this.info = function () {
    let msg = (
      `${title} by ${author}, ${numberOfPages} pages, ` +
      `${isRead ? "read" : "not read"}`
    );

    return msg;
  };
}

function addBookToLibrary(title, author, numberOfPages, isRead) {
  myLibrary.push(new Book(title, author, numberOfPages, isRead));
}

function displayBooks() {
  
}

addBookToLibrary("1984", "George Orwell", 328, true);
addBookToLibrary("Dune", "Frank Herbert", 412, false);
addBookToLibrary("The Little Prince", "Antoine de Saint-Exupéry", 96, true);
addBookToLibrary("War and Peace", "Leo Tolstoy", 1225, false);
