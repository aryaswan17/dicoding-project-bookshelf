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
        const unreadButton = buttonMaker("unread");
        const deleteButton = buttonMaker("delete");
        container.append(unreadButton, deleteButton);
        return finishedBooks.append(container);
    } else {
        const readButton = buttonMaker("read");
        const deleteButton = buttonMaker("delete");
        container.append(readButton, deleteButton);
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
        document.getElementById("judulbuku").value = "";
        document.getElementById("penulisbuku").value = "";
        document.getElementById("tahunbukurilis").value = "";
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


function buttonMaker(classList) {
    const button = document.createElement("button")
    button.classList.add(classList);
    if (classList === "read") {
        button.innerText = "Sudah selesai dibaca"
        button.setAttribute("onclick", "readBook(this)")
    } else if (classList === "unread") {
        button.innerText = "Belum selesai dibaca"
        button.setAttribute("onclick", "unreadBook(this)")
    } else if (classList === "delete") {
        button.innerText = "Hapus buku"
        button.setAttribute("onclick", "deleteBook(this)")
    }
    return button;
}

function deleteBook(book) {
    if (confirm("Apakah anda yakin menghapus buku ini?")) {
        book.parentElement.remove();
        completelyDeleteBook(book)
    }
}

function readBook(book) {
    const bookId = book.parentElement.children[0].innerText;
    const titleOfBook = book.parentElement.children[1].innerText;
    const authorOfBook = book.parentElement.children[2].innerText;
    const yearOfRelease = book.parentElement.children[3].innerText;
    makeBook(bookId, titleOfBook, authorOfBook, yearOfRelease, true);
    book.parentElement.remove();
    isThisBookRead(book)
}

function unreadBook(book) {
    const bookId = book.parentElement.children[0].innerText;
    const titleOfBook = book.parentElement.children[1].innerText;
    const authorOfBook = book.parentElement.children[2].innerText;
    const yearOfRelease = book.parentElement.children[3].innerText;
    makeBook(bookId, titleOfBook, authorOfBook, yearOfRelease, false);
    book.parentElement.remove();
    isThisBookRead(book);
}

function openDisclaimer() {
    document.getElementById("footer").style.bottom = 0;
    document.getElementById("disclaimer").style.bottom = "-50px";
}

function closeDisclaimer() {
    document.getElementById("footer").style.bottom = "-155px";
    document.getElementById("disclaimer").style.bottom = 0;
}

function identityOpen() {
    document.getElementById("identity").style.right = "0";
    document.getElementById("identitybutton").style.right = "-100px";
};

function identityClose() {
    document.getElementById("identity").style.right = "-600px";
    document.getElementById("identitybutton").style.right = "0";
;}