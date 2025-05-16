class Book {
    constructor(id, name, printDate, url, description, popularity) {
        this.id = id;
        this.name = name;
        this.printDate = printDate;
        this.url = url;
        this.description = description;
        this.popularity = popularity;
    }
}


function intializationBooks() {
    let books = [];
    booksString = localStorage.getItem("books");
    if (booksString) {
        books = JSON.parse(booksString)
    }
    localStorage.setItem("books", JSON.stringify(books))

    createBooksRows(books); 
    addBook(books);
}

function createBooksRows(books) {
    let table = document.querySelector("#bookTable-body");
    table.innerHTML = "";

    if (books) {
        for (let i = 0; i < books.length; i++) {
            let tr = document.createElement("tr");

            let br = document.createElement("td");
            br.textContent = i+1;

            let name = document.createElement("td");
            name.textContent = books[i].name;

            let erase = document.createElement("td");
            let eraseBtn = document.createElement("button");
            eraseBtn.textContent = "Obriši";
            eraseBtn.addEventListener('click', function () {
                books.splice(i, 1);
                localStorage.setItem("books", JSON.stringify(books))
                createBooksRows(books)
            })
            erase.appendChild(eraseBtn);
            tr.appendChild(br);
            tr.appendChild(name);
            tr.appendChild(erase);
            table.appendChild(tr);

        }
    }

}

function addBook(books) {
  let button = document.querySelector("#button");
  button.addEventListener("click", function () {
    let form = document.querySelector("#bookForm");
    const formData = new FormData(form);

    const name = formData.get("name");
    const description = formData.get("description");
    const printDate = formData.get("printDate");
    const url = formData.get("image");
    const stars = formData.get("stars");
    const id = maxID(books);

    if (name && description && printDate && url && stars && id) {
      let newBook = new Book(id, name, printDate, url, description, stars);
      books.push(newBook);
      localStorage.setItem("books", JSON.stringify(books));
      createBooksRows(books);
    } else {
      alert("Sva polja moraju biti popunjena.");
    }
  });
}

function maxID(books) {
  let id = 0;
  for (let i = 0; i < books.length; i++) {
    if (id < books[i].id) {
      id++;
    }
  }
  return id;
}
document.addEventListener("DOMContentLoaded", intializationBooks())
