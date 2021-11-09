const storageKey = "books";
let storageItem = [];


function makeData(data) {
    storageItem.push(data)
    const JSONData = JSON.stringify(storageItem);
    localStorage.setItem(storageKey, JSONData);
}

function retrieveData() {
    const rawData = localStorage.getItem(storageKey)
    const convertedData = JSON.parse(rawData);
    if (convertedData !== null) {
        storageItem = convertedData;
    }
}

document.addEventListener("load", retrieveData())
document.addEventListener("load", displayBooks())

function displayBooks() {
    for (const books of storageItem) {
        makeBook(books.id, books.title, books.author, books.year, books.isComplete);
    }
}

function isThisBookRead(book) {
    const bookId = book.parentElement.children[0].innerText;
    const savedBook = bookSearcher(bookId);
    if (savedBook.isComplete == true) {
        savedBook.isComplete = false;
    } else if (savedBook.isComplete == false) {
        savedBook.isComplete = true;
    }
    localStorage.setItem(storageKey, JSON.stringify(storageItem));
}

function completelyDeleteBook(book) {
    const bookId = book.parentElement.children[0].innerText;
    const savedBook = bookSearcher(bookId);
    const bookIndex = storageItem.indexOf(savedBook)
    storageItem.splice(bookIndex, 1);
    localStorage.setItem(storageKey, JSON.stringify(storageItem))
}

function bookSearcher(bookId) {
    for (let book of storageItem) {
        if (book.id == bookId) {
            return book
        }
    }
}

function editBookData(bookId, newTitle, newAuthor, newYear) {
    const book = bookSearcher(bookId);
    book.title = newTitle;
    book.author = newAuthor;
    book.year = newYear;
    localStorage.setItem(storageKey, JSON.stringify(storageItem))
}

const searchbar = document.getElementById("searchbar");
searchbar.addEventListener("change", function(){
    console.log("input has changed");
    console.log(searchbar.value);
});