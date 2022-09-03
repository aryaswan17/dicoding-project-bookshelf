const addBookButton = document.getElementById("tambahbuku");
const unfinishedBooks = document.getElementById("unfinishedbooks");
const finishedBooks = document.getElementById("finishedbooks");

function makeBook(id, title, author, year, isComplete) {
    const container = document.createElement("div");
    container.classList.add("book")
    const bookId = document.createElement("sup");
    bookId.innerText = id;
    bookId.classList.add("id")
    const titleOfBook = document.createElement("h3");
    titleOfBook.innerText = title;
    titleOfBook.classList.add("book-title")
    const authorOfBook = document.createElement("span");
    authorOfBook.innerText = author;
    authorOfBook.classList.add("book-author")
    const yearOfRelease = document.createElement("p")
    yearOfRelease.innerText = year;
    yearOfRelease.classList.add("book-year")
    container.append(bookId, titleOfBook, authorOfBook, yearOfRelease);
    if (isComplete) {
        container.append(buttonMaker("unread"), buttonMaker("delete"), buttonMaker("edit"));
        return finishedBooks.append(container);
    } else {
        container.append(buttonMaker("read"), buttonMaker("delete"), buttonMaker("edit"));
        return unfinishedBooks.append(container);
    }
}

function addBook() {
    const bookId = +new Date()
    const bookTitle = document.getElementById("judulbuku").value;
    const bookWriter = document.getElementById("penulisbuku").value;
    const bookReleased = document.getElementById("tahunbukurilis").value;
    let bookComplete = false;
    if (bookTitle === "" || bookWriter === "" || bookReleased === "") {
        alert("Semua input harus diisi!!")
    } else {
        makeBook(bookId, bookTitle, bookWriter, bookReleased, bookComplete)
        emptyInput()
        const bookData = {
            id: bookId,
            title: bookTitle,
            author: bookWriter,
            year: bookReleased,
            isComplete: bookComplete,
        }
        makeData(bookData);
    }
}

function emptyInput() {
    document.getElementById("judulbuku").value = "";
    document.getElementById("penulisbuku").value = "";
    document.getElementById("tahunbukurilis").value = ""; 
}

function buttonMaker(classList) {
    const button = document.createElement("button")
    button.classList.add(classList);
    switch (localStorage.getItem(languageKey)) {
        case "id":
            if (classList === "read") {
                button.innerText = "Sudah selesai dibaca"
                button.setAttribute("onclick", "readOrNot(this)")
                button.classList.add("btn")
                button.classList.add("btn-primary")
            } else if (classList === "unread") {
                button.innerText = "Belum selesai dibaca"
                button.setAttribute("onclick", "readOrNot(this)")
                button.classList.add("btn")
                button.classList.add("btn-outline-primary")
            } else if (classList === "delete") {
                button.innerText = "Hapus buku"
                button.setAttribute("onclick", "deleteBook(this)")
                button.classList.add("btn")
                button.classList.add("btn-danger")
            } else if (classList === "edit") {
                button.innerText = "Edit buku"
                button.setAttribute("onclick", "editBook(this)")
                button.classList.add("btn")
                button.classList.add("btn-warning")
                button.setAttribute("data-bs-toggle", "modal")
                button.setAttribute("data-bs-target", "#editTab")
            }
        break;
        default: 
            if (classList === "read") {
                button.innerText = "Have been read"
                button.setAttribute("onclick", "readOrNot(this)")
                button.classList.add("btn")
                button.classList.add("btn-primary")
            } else if (classList === "unread") {
                button.innerText = "Have not been read"
                button.setAttribute("onclick", "readOrNot(this)")
                button.classList.add("btn")
                button.classList.add("btn-outline-primary")
            } else if (classList === "delete") {
                button.innerText = "Delete book"
                button.setAttribute("onclick", "deleteBook(this)")
                button.classList.add("btn")
                button.classList.add("btn-danger")
            } else if (classList === "edit") {
                button.innerText = "Edit book"
                button.setAttribute("onclick", "editBook(this)")
                button.classList.add("btn")
                button.classList.add("btn-warning")
                button.setAttribute("data-bs-toggle", "modal")
                button.setAttribute("data-bs-target", "#editTab")
            }
    }

    return button;
}

function deleteBook(book) {
    switch (localStorage.getItem(languageKey)) {
        case "id":
            if (confirm("Apakah anda yakin menghapus buku ini?")) {
                book.parentElement.remove();
                completelyDeleteBook(book)
            }
        break;
        default:
            if (confirm("Are you sure you want to delete this book?")) {
                book.parentElement.remove();
                completelyDeleteBook(book)
            }
    }

}

function readOrNot(book) {
    const bookId = book.parentElement.children[0].innerText;
    const titleOfBook = book.parentElement.children[1].innerText;
    const authorOfBook = book.parentElement.children[2].innerText;
    const yearOfRelease = book.parentElement.children[3].innerText;
    const currentBook = bookSearcher(bookId);
    if (currentBook.isComplete == true) {
        makeBook(bookId, titleOfBook, authorOfBook, yearOfRelease, false);
    } else {
        makeBook(bookId, titleOfBook, authorOfBook, yearOfRelease, true);
    }
    book.parentElement.remove();
    isThisBookRead(book)
}

function editBook(book) {
    const bookId = book.parentElement.children[0].innerText;
    const oldBookTitle = book.parentElement.children[1];
    const oldBookAuthor = book.parentElement.children[2];
    const oldBookYear = book.parentElement.children[3];
    const confirmEditButton = document.getElementById("editbuku");
    confirmEditButton.addEventListener("click", function() {
        const newBookTitle = document.getElementById("judulbukubaru").value;
        const newBookAuthor = document.getElementById("penulisbukubaru").value;
        const newBookYear = document.getElementById("tahunbukurilisbaru").value;
        if (newBookTitle == "" || newBookAuthor == "" || newBookYear == "") {
            alert("Semua input harus diisi!!")
            bookId = ""
            return;
        } else {
            oldBookTitle.innerText = newBookTitle;
            oldBookAuthor.innerText = newBookAuthor;
            oldBookYear.innerText = newBookYear;
            editBookData(bookId, newBookTitle, newBookAuthor, newBookYear)
            clearEditInput()
            bookId = ""
            return;
        }
    })
}

document.addEventListener("load", emptyInput())
document.addEventListener("load", clearEditInput())

function clearEditInput() {
    document.getElementById("judulbukubaru").value = "";
    document.getElementById("penulisbukubaru").value = "";
    document.getElementById("tahunbukurilisbaru").value = ""; 
}