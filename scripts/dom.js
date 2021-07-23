const addBookButton = document.getElementById("tambahbuku");
const unfinishedBooks = document.getElementById("unfinishedbooks");
const finishedBooks = document.getElementById("finishedbooks");

function addBook() {
    const bookTitle = document.getElementById("judulbuku").value;
    const bookWriter = document.getElementById("penulisbuku").value;
    const bookReleased = document.getElementById("tahunbukurilis").value;

    const container = document.createElement("div");
    container.classList.add("book")
    const titleOfBook = document.createElement("h3");
    titleOfBook.innerText = bookTitle;
    titleOfBook.classList.add("book-title")
    const authorOfBook = document.createElement("span");
    authorOfBook.innerText = bookWriter;
    authorOfBook.classList.add("book-author")
    const yearOfRelease = document.createElement("p")
    yearOfRelease.innerText = bookReleased;
    yearOfRelease.classList.add("book-year")
    const readButton = buttonMaker("read");
    const deleteButton = buttonMaker("delete");
    container.append(titleOfBook, authorOfBook, yearOfRelease, readButton, deleteButton, /*editButton*/);
    return unfinishedBooks.append(container);
}

function buttonMaker(classList) {
    const button = document.createElement("button")
    button.classList.add(classList);
    if (classList === "read") {
        button.innerText = "Sudah selesai dibaca"
        button.setAttribute("onclick", "console.log('read')")
    } else if (classList === "unread") {
        button.innerText = "Belum selesai dibaca"
    } else if (classList === "delete") {
        button.innerText = "Hapus buku"
        button.setAttribute("onclick", "deleteBook(this)")
    } else if (classList === "edit") {
        button.innerText = "Edit buku"
        button.setAttribute("onclick", "getDataToEditBook(this)")
    }
    return button;
}

function deleteBook(book) {
    return book.parentElement.remove();
}