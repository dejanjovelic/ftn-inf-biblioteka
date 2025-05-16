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
