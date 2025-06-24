const myLibrary = []

function Book(title, author, numberOfPages, status) {
  if (!new.target) {
    throw Error("Book instance should be created by 'new' operator");
  }

  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.status = status;

  this.info = function () {
    let msg = (
      `${title} by ${author}, ${numberOfPages} pages, ` +
      `${status ? "read" : "not read"}`
    );

    return msg;
  };
  this.changeStatus = function () {
    this.status = !this.status; 
  };
}

function addBookToLibrary(title, author, numberOfPages, status) {
  myLibrary.push(new Book(title, author, numberOfPages, status));
}

function removeBookFromLibrary(id) {
  const index = myLibrary.findIndex((el) => el["id"] === id);
  if (index != -1) myLibrary.splice(index, 1);
}

function createBookNode(book) {
    const node = document.createElement("tr");
    let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 23"><title>close-circle</title><path d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z" /></svg>`
    node.innerHTML = `
        <td>${book.id}</td>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.numberOfPages}</td>
        <td>${book.status ? "Read" : "In Progress"}</td>
        <td><button class="removeBtn">${svg}</button></td>
    `;
    node.children.item(4).addEventListener("click",
      e => {
        e.target.innerText = e.target.innerText === "Read" ? "In Progress" : "Read";
        book.changeStatus();
        updateStatistics();
      }
    )

    return node;
}

function addBookToPage(book) {
  let table = document.querySelector("tbody");
  let node = createBookNode(book);
  node.querySelector("button").addEventListener("click", 
    e => {
      const tr = e.currentTarget.parentElement.parentElement;
      const id = tr.children[0].innerText;
      removeBookFromLibrary(id);
      tr.remove();
      updateStatistics()
    }
  )
  table.appendChild(node);
  updateStatistics();
}

function displayBooks() {
  for (book of myLibrary) {
    addBookToPage(book);
  }
}

function updateStatistics() {
  const totalNumberOfBooks = myLibrary.length;
  const numberOfReadBooks = myLibrary.filter(book => book.status).length;
  const stats = document.querySelector(".statistics").children
  stats.item(0).innerText = "Total: " + totalNumberOfBooks;
  stats.item(1).innerText = "You read: " + numberOfReadBooks;
}

function parseBook(form) {
  const pages = form.querySelector('input[name="numberOfPages"');
  if (!pages.checkValidity()) {
    pages.setCustomValidity("Enter correct number of pages");
  }

  if (!form.checkValidity()) {
    form.reportValidity();
    return null;
  }

  let title = document.querySelector('form [name="title"]').value;
  let author = document.querySelector('form [name="author"]').value;
  let numberOfPages = document.querySelector('form [name="numberOfPages"]').value;
  let status = document.querySelector('form [name="status"]').checked;

  return [title, author, numberOfPages, status]
}

addBookToLibrary("1984", "George Orwell", 328, true);
addBookToLibrary("Dune", "Frank Herbert", 412, false);
addBookToLibrary("The Little Prince", "Antoine de Saint-Exupéry", 96, true);
addBookToLibrary("War and Peace", "Leo Tolstoy", 1225, false);

displayBooks()

document.querySelector("form button").addEventListener("click", 
  function (e) {
    const form = e.target.form;
    const data = parseBook(form);
    if (!data) return;

    addBookToLibrary(...data);
    addBookToPage(myLibrary.at(-1));
    form.reset();
    e.preventDefault();
  }
)

document.querySelector('form input[name="numberOfPages"]').addEventListener(
  "input",
  (e) => {
    e.target.setCustomValidity("");
    if (!e.target.checkValidity()) {
      e.target.setCustomValidity("Enter correct number of pages");
      e.target.reportValidity();
    }
  }
)