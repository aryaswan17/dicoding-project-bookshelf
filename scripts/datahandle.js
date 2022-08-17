const storageKey = "books";
let storageItem = [];
const languageKey = "language";
let languageSetting = navigator.language;
if (localStorage.getItem(languageKey) === null) {
    localStorage.setItem(languageKey, languageSetting);
}

function loadLanguage() {
    switch (localStorage.getItem(languageKey)) {
        case "id":
            window.location.replace("/lang/id.html")
            break;
        default:
            window.location.replace("/lang/en.html");
    }
}

const switcher = document.getElementById("switcher");

switcher.addEventListener("click", languageSwitch);

function languageSwitch() {
    if (localStorage.getItem(languageKey) == 'id') {
        localStorage.setItem(languageKey, "en-US")
    } else {
        localStorage.setItem(languageKey, 'id')
    }
}

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