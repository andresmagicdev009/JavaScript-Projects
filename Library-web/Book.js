const myLibrary = [];



const formulario = document.querySelector("#book-form");
const tituloInput = document.querySelector("#title");
const autorInput = document.querySelector("#author");
const paginasInput = document.querySelector("#pages");
const leidoInput = document.querySelector("#read");


const libraryDiv = document.querySelector("#library");
const modal = document.querySelector("#my-modal");
const filterControls = document.querySelector("#filter-controls");
let currentFilter = "all"; // Variable para almacenar el filtro actual

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

Book.prototype.toggleReadStatus = function() {
    // Cambia el valor actual a su opuesto (si es true pasa a false y viceversa)
    this.read = !this.read;
};


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

function updateStats(){
    const totalBooks = myLibrary.length;
    const readBooks = myLibrary.filter(book => book.read).length;
    const unreadBooks = totalBooks - readBooks;

    document.querySelector("#total-books").textContent = `${totalBooks}`;
    document.querySelector("#read-books").textContent = `${readBooks}`;
    document.querySelector("#unread-books").textContent = `${unreadBooks}`;
}


function renderLibrary() {
    // 1. Limpiamos el contenedor
    libraryDiv.innerHTML = "";

    // Por defecto son todos los libros
    let booksToRender = myLibrary;

    if(currentFilter === "read"){
        booksToRender = myLibrary.filter(book => book.read === true);
    } else if(currentFilter === "unread"){
        booksToRender = myLibrary.filter(book => book.read === false);
    }

    // 2. Recorremos los libros
    booksToRender.forEach(book => {
        // NOTA: El truco está en poner data-id="${book.id}" en el div contenedor
        const bookDiv = `
            <div class="book-card" data-id="${book.id}">
                <h3>${book. title}</h3>
                <p>Author: ${book.author}</p>
                <p>Pages: ${book.pages}</p>
                <label for="status">Marcar como leído</label>
                <input class="status-checkbox" id="status" type="checkbox" ${book.read ? "checked" : ""}>
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
    updateStats();
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
    if(e.target.classList.contains("status-checkbox")){
        const bookCard = e.target.closest(".book-card");
        const bookId = bookCard.getAttribute("data-id");

        // Buscar el libro en el array
        const libroEncontrado = myLibrary.find(book => book.id === bookId);
        // Si se encontro el libro entonces se procede a cambiar su estado
        if(libroEncontrado){
            // Cambiar el estado de lectura del libro
            libroEncontrado.toggleReadStatus();
            renderLibrary(); // Re-render the library to reflect the change
            updateStats();
        }
    }


})


filterControls.addEventListener("click" , (e) => {
    if(e.target.classList.contains("filter-btn")) {
        currentFilter = e.target.getAttribute("data-filter");
        renderLibrary();
    }
})
//if (!new.target) {
//    throw new Error("Book() must be called with 'new'");
//}

// Esta condicional sirve para evitar que la función Book sea llamada sin el operador 'new'. Si se intenta llamar a Book() directamente, se lanzará un error indicando que debe ser llamado con 'new'. Esto asegura que se cree una nueva instancia de Book correctamente.