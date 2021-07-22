const storageKey = "books";

function checkAvailableStorage() {
    if (typeof(Storage) !== undefined) {
        return true;
    } else {
        alert("Browser tidak mendukung storage. Mohon berganti browser.")
        return false;
    }
}

function makeData() {
    if (checkAvailableStorage()) {

    }
}