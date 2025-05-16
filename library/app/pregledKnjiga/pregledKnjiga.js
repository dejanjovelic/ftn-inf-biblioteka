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

function addBook() {
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
      let newBook = new Book(id, name, printDate, url, stars);
      books.push(newBook);
    } else {
      alert("Sva polja moraju biti popunjena.");
    }
  });
}

function maxID(books) {
  let id = 1;
  for (let i = 0; i < books.length; i++) {
    if (id <= books[i].id) {
      id++;
    }
  }
  return id;
}
