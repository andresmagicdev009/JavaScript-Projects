const gameBoard = (function(){
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
        playerOne = player1;
        playerTwo = player2;
        activePlayer = playerOne;
        isGameOver = false;
        console.log('El juego ha comenzado. Jugador activo: ' + activePlayer.name);
    };

    // Logica para cambiar de turno 
    const switchPlayerTurn = () => {
       activePlayer = actuvePlayer === playerOne ? playerTwo : playerOne;
    };


    const getActivePlayer = () => activePlayer;

    const playRound = (index) => {
        if (isGameOver) return;

        const jugadaValida = gameBoard.setBoard(index, activePlayer.symbol);
        if(jugadaValida){
        
        }
    };

    return{
        startGame,
        playRound,
        getActivePlayer
    };
})();


const createPlayer = (name, symbol) => {
    return { name, symbol };
}

