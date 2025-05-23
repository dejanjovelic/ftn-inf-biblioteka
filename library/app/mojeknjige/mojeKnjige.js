"use strict";
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

function createAvailableRows() {
  let availableTable = document.querySelector("#available-body");
  availableTable.innerHTML = "";
  available = JSON.parse(localStorage.getItem("books"));
  if (available) {
    for (let i = 0; i < rented.length; i++) {
      for (let j = 0; j < available.length; j++) {
        if (JSON.stringify(available[j]) == JSON.stringify(rented[i])) {
          available.splice(j, 1);
        }
      }
    }
  }
  for (let i = 0; i < available.length; i++) {
    let tr = document.createElement("tr");

    let id = document.createElement("td");
    id.textContent = i + 1;

    let name = document.createElement("td");
    name.textContent = available[i].name;

    let button = document.createElement("td");
    let rentButton = document.createElement("button");
    rentButton.textContent = "Iznajmi";
    rentButton.addEventListener("click", function () {
      rented.push(available[i]);
      available.splice(i, 1)
      createRentedRows();
      createAvailableRows();
      localStorage.setItem("rented", JSON.stringify(rented));
    });
    tr.appendChild(id);
    tr.appendChild(name);
    button.appendChild(rentButton)
    tr.appendChild(button)
    availableTable.appendChild(tr);
  }
}
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

    createRentedRows();
    createAvailableRows();
}

document.addEventListener("DOMContentLoaded", intializeRentedTable)