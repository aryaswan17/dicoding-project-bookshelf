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
    const editButton = buttonMaker("edit")
    container.append(titleOfBook, authorOfBook, yearOfRelease, readButton, deleteButton, editButton);
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
        button.setAttribute("onclick", "editBook(this)")
    }
    return button;
}

function deleteBook(book) {
    return book.parentElement.remove();
}
//need to fix editbook
function editBook(book) {
    const oldBookTitle = book.parentElement.getElementsByClassName("book-title");
    console.log(oldBookTitle)
    const newBookTitle = prompt("Masukkan nama buku...");
    const newBookAuthor = prompt("Masukkan penulis buku...");
    const newBookYear = prompt("Masukkan tahun buku rilis...");

 
    const oldBookAuthor = book.getElementsByClassName("book-author");
    const oldBookYear = book.getElementsByClassName("book-year");

    console.log(newBookTitle)

    oldBookTitle.innerText = newBookTitle;
    oldBookAuthor.innerText = newBookAuthor;
    oldBookYear.innerText = newBookYear;
}