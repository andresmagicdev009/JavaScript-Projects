const myLibrary = [];



const formulario = document.querySelector("#book-form");
const tituloInput = document.querySelector("#title");
const autorInput = document.querySelector("#author");
const paginasInput = document.querySelector("#pages");
const leidoInput = document.querySelector("#read");


const libraryDiv = document.querySelector("#library");
const modal = document.querySelector("#my-modal");

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

Book.prototype.info = function () {
    const readStatus = this.read ? "leido" : "no leido";
    return `${this.id}: ${this.title} by ${this.author}, ${this.pages} pages, ${readStatus}`;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function deleteBookFromLibrary(bookId){
    //Filter the array to man
    const index = myLibrary.findIndex(book => book.id  === bookId);
    if(index !== -1){
        myLibrary.splice(index, 1); // Remove the book from the library
    }

    renderLibrary(); // Re-render the library after deletion
}

function renderLibrary() {
    // 1. Limpiamos el contenedor
    libraryDiv.innerHTML = "";

    // 2. Recorremos los libros
    myLibrary.forEach(book => {
        // NOTA: El truco está en poner data-id="${book.id}" en el div contenedor
        const bookDiv = `
            <div class="book-card" data-id="${book.id}">
                <h3>${book.title}</h3>
                <p>Author: ${book.author}</p>
                <p>Pages: ${book.pages}</p>
                <input type="checkbox" ${book.read ? "checked" : ""} disabled>
                <p>Status: ${book.read ? "Leído" : "No leído"}</p>
                <button class="delete-btn">Eliminar</button>
            </div>
    `;
        
        // 3. Lo inyectamos en el DOM
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
    modal.close();

})

// Se escucha todos los clicks dentro del contenedor

libraryDiv.addEventListener("click", (e) => {
    if(e.target.classList.contains("delete-btn")){
        const bookCard = e.target.closest(".book-card");
        const bookId = bookCard.getAttribute("data-id");
        deleteBookFromLibrary(bookId);
    }
})

//if (!new.target) {
//    throw new Error("Book() must be called with 'new'");
//}

// Esta condicional sirve para evitar que la función Book sea llamada sin el operador 'new'. Si se intenta llamar a Book() directamente, se lanzará un error indicando que debe ser llamado con 'new'. Esto asegura que se cree una nueva instancia de Book correctamente.