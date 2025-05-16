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
}

function createBooksRows(books) {
    let table = document.querySelector("#bookTable-body");
    table.innerHTML = "";

    if (books) {
        for (let i = 0; i < books.length; i++) {
            let tr = document.createElement("tr");

            let br = document.createElement("td");
            br.textContent = books[i].id;

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
document.addEventListener("DOMContentLoaded", intializationBooks())