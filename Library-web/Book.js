const myLibrary = [];



const formulario = document.querySelector("#book-form");
const tituloInput = document.querySelector("#title");
const autorInput = document.querySelector("#author");
const paginasInput = document.querySelector("#pages");
const leidoInput = document.querySelector("#read");


const libraryDiv = document.querySelector("#library");

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = false;
    this.id = crypto.randomUUID();
}

Book.prototype.info = function () {
    const readStatus = this.read ? "leido" : "no leido";
    return `${this.id}: ${this.title} by ${this.author}, ${this.pages} pages, ${readStatus}`;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function renderLibrary() {

    // Se limpia la libreria para no duplicar contenido anterior
    libraryDiv.innerHTML = "";

    // Se recorre el array y se crea el HTML para cada Libro
    myLibrary.forEach(book => {
        const bookDiv = `<div class="book-card">
                            <h3>${book.title}</h3>
                            <p>Author: ${book.author}</p>
                            <p>Pages: ${book.pages}</p>
                            <p>Status: ${book.read ? "Leido" : "No leido"}</p>
                          </div>
        `;
        // Se agrega al div principal de la libreria
        libraryDiv.innerHTML += bookDiv;
    });

}

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    const newBook = new Book(tituloInput.value, autorInput.value, paginasInput.value, leidoInput.checked);
    addBookToLibrary(newBook);
    renderLibrary();
    console.log(`El libro agregado es: ${tituloInput.value}`);
    tituloInput.value = "";
    autorInput.value = "";
    paginasInput.value = "";
    leidoInput.checked = false;

})



//if (!new.target) {
//    throw new Error("Book() must be called with 'new'");
//}

// Esta condicional sirve para evitar que la función Book sea llamada sin el operador 'new'. Si se intenta llamar a Book() directamente, se lanzará un error indicando que debe ser llamado con 'new'. Esto asegura que se cree una nueva instancia de Book correctamente.