
const displayController = (function () {
    const htmlBoard = document.getElementById("html-board");
    const statusMessage = document.getElementById("status-message");
    const setupScreen = document.getElementById("setup-screen");
    const startBtn = document.getElementById("start-game");
    const restartBtn = document.getElementById("reset-game");

    // Función para actualizar el texto de arriba (Resultados/Turnos)
    const updateStatus = (message) => {
        statusMessage.textContent = message;
    };

    const renderBoard = () => {
        htmlBoard.innerHTML = "";
        const board = gameBoard.getBoard();

        board.forEach((cell, index) => {
            const cellElement = document.createElement("div");
            cellElement.classList.add("cell");
            cellElement.textContent = cell;
            cellElement.dataset.index = index;

            cellElement.addEventListener("click", () => {
                gameController.playRound(index);
                renderBoard();
            });

            htmlBoard.appendChild(cellElement);
        });
    };

    // Evento para el botón INICIAR
    startBtn.addEventListener("click", () => {
        const name1 = document.getElementById("p1-name").value || "Jugador 1";
        const name2 = document.getElementById("p2-name").value || "Jugador 2";

        const player1 = createPlayer(name1, "X");
        const player2 = createPlayer(name2, "O");

        gameController.startGame(player1, player2);

        // Cambiamos visibilidad de las pantallas
        setupScreen.classList.add("hidden");
        htmlBoard.classList.remove("hidden");
        statusMessage.classList.remove("hidden");
        restartBtn.classList.remove("hidden");

        updateStatus(`Es el turno de: ${gameController.getActivePlayer().name}`);
        renderBoard();
    });

    // Evento para el botón REINICIAR
    restartBtn.addEventListener("click", () => {
        gameBoard.resetBoard(); // Limpia el array lógico

        // Obtenemos los jugadores actuales para volver a empezar con ellos
        const name1 = document.getElementById("p1-name").value || "Jugador 1";
        const name2 = document.getElementById("p2-name").value || "Jugador 2";

        gameController.startGame(createPlayer(name1, "X"), createPlayer(name2, "O"));

        updateStatus(`Juego reiniciado. Turno de: ${gameController.getActivePlayer().name}`);
        renderBoard();
    });

    return {
        renderBoard,
        updateStatus // Lo exportamos para que gameController pueda mandar mensajes aquí
    };
})();


const gameBoard = (function () {
    let board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board;

    const setBoard = (index, symbol) => {
        if (board[index] === "") {
            board[index] = symbol;
            return true;
        }
        return false;
    };

    const resetBoard = () => {
        board = ["", "", "", "", "", "", "", "", ""];
    };

    return {
        getBoard,
        setBoard,
        resetBoard
    };

})();

const gameController = (function () {
    /// Variables privadas para ele stado del juego 
    let playerOne;
    let playerTwo;
    let activePlayer;
    let isGameOver = false;

    // Funcion para recibir los objetos de los jugadores 
    const startGame = (player1, player2) => {


        // Verificar que el jugador 2 no tenga el mismo simbolo que el jugador 1 
        if (player1.symbol === player2.symbol) {
            console.log('Error: Los jugadores no pueden tener el mismo símbolo.');
            return;
        }


        playerOne = player1;
        playerTwo = player2;
        activePlayer = playerOne;
        isGameOver = false;
        console.log('El juego ha comenzado. Jugador activo: ' + activePlayer.name);
    };

    // Logica para cambiar de turno 
    const switchPlayerTurn = () => {
        activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
    };


    const getActivePlayer = () => activePlayer;



    const checkWin = (symbol) => {
        // 1. Se obtiene el estado actual del tablero
        const board = gameBoard.getBoard();
        // 2. .some() devuelve true si AL MENOS UNA combinacion cumple la condicion 
        return combinacionesGanadoras.some(combinacion => {
            // 3. .every() devuelve true si TODAS las posiciones de la combinacion cumplen la condicion
            return combinacion.every(index => board[index] === symbol);
        })
    };


    const checkTie = () => {
        const board = gameBoard.getBoard();

        return board.every(cell => cell !== "");
    }

    const playRound = (index) => {
        if (isGameOver) return;

        const jugadaValida = gameBoard.setBoard(index, activePlayer.symbol);

        if (!jugadaValida) return;

        // 1. Revisar si ganó
        if (checkWin(activePlayer.symbol)) {
            displayController.updateStatus(`¡Felicidades! 🎉 ${activePlayer.name} ha ganado.`);
            isGameOver = true;
            return;
        }

        // 2. Revisar si empató
        if (checkTie()) {
            displayController.updateStatus("¡El juego ha terminado en Empate! 🤝");
            isGameOver = true;
            return;
        }

        // 3. Cambiar turno y actualizar pantalla
        switchPlayerTurn();
        displayController.updateStatus(`Es el turno de: ${activePlayer.name}`);
    };

    return {
        startGame,
        playRound,
        getActivePlayer,
        checkWin,
        switchPlayerTurn
    };
})();


const createPlayer = (name, symbol) => {
    return { name, symbol };
}

// Definir las combinaciones ganadoras 

const combinacionesGanadoras = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
]


