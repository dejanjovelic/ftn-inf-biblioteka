'use strict'
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

let rented = [];
let available = [];

function createRentedRows() {
    let table = document.querySelector("#rented-body");
    table.innerHTML = "";

    if (rented) {
        for (let i = 0; i < rented.length; i++) {

            let tr = document.createElement("tr");

            let rb = document.createElement("td");
            rb.textContent = i + 1;

            let name = document.createElement("td");
            name.textContent = rented[i].name;

            let button = document.createElement("td");
            let returnBtn = document.createElement("button");
            returnBtn.textContent = "Vrati";
            returnBtn.addEventListener('click', function () {
                rented.splice(i, 1);
                localStorage.setItem("rented", JSON.stringify(rented));
                createRentedRows();
                createAvailableRows();
            })
            button.appendChild(returnBtn);

            tr.appendChild(rb);
            tr.appendChild(name);
            tr.appendChild(button);
            table.appendChild(tr);
        }
    }
}

function intializeRentedTable() {
    let rentedStr = localStorage.getItem("rented");
    if (rentedStr) {
        rented = JSON.parse(rentedStr);
    }
    else {
        rented = [
            new Book(0, "mobilni", "2022", "www.laguna.rs", "bla, bla", 5),
            new Book(1, "Alhemicar", "2023", "www.laguna.rs", "nesto, nesto", 5)
        ]
        localStorage.setItem("rented", JSON.stringify(rented));
    }

    createRentedRows();
    createAvailableRows();
}

document.addEventListener("DOMContentLoaded", intializeRentedTable)