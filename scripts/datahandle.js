const storageKey = "books";
let storageItem = [];

function makeData(data) {
    storageItem.push(data)
    const JSONData = JSON.stringify(storageItem);
    localStorage.setItem(storageKey, JSONData);
    storageItem = localStorage.getItem(storageKey);
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
        makeBook(books.title, books.author, books.year, books.isComplete);
    }
}
//need to figure out how to change isComplete property
function isThisBookRead(book) {

}