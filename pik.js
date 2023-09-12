let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameWon = false;
let winningCells = [];
let winningPlayerClass = '';

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
];

function handleClick(cellIndex) {
    if (board[cellIndex] === '' && !gameWon) {
        board[cellIndex] = currentPlayer;
        document.getElementsByClassName('cell')[cellIndex].innerText = currentPlayer;

        if (checkWinner()) {
            gameWon = true;
            highlightWinningCombination();
            document.getElementById('status').innerText = `Player ${currentPlayer} wins!`;
        } else if (board.every(cell => cell !== '')) {
            document.getElementById('status').innerText = "It's a draw!";
        } else {
            currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
            document.getElementById('status').innerText = `Player ${currentPlayer}'s turn`;
        }
    }
}

function checkWinner() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            winningCells = combination;
            winningPlayerClass = (board[a] === 'X') ? 'winner-x' : 'winner-o';
            return true;
        }
    }
    return false;
}

function highlightWinningCombination() {
    for (const cellIndex of winningCells) {
        document.getElementsByClassName('cell')[cellIndex].classList.add(winningPlayerClass);
    }
}

function resetBoard() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameWon = false;
    winningCells = [];
    winningPlayerClass = '';
    const cells = document.getElementsByClassName('cell');
    for (const cell of cells) {
        cell.innerText = '';
        cell.classList.remove('winner-x', 'winner-o');
    }
    document.getElementById('status').innerText = "Player X's turn";
}

resetBoard();
