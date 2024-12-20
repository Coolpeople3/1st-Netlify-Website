let currentPlayer = "X";
let board = Array(9).fill(null);
let gameActive = true;

function startGame(gameName) {
  if (gameName === "clicker") {
    loadClickerGame();
  } else if (gameName === "ticTacToe") {
    loadTicTacToe();
  } else if (gameName === "memory") {
    loadMemoryGame();
  }
}

function loadTicTacToe() {
  document.body.innerHTML = `
    <div style="display: flex; flex-direction: column; align-items: center; margin-top: 50px; color: white;">
      <h2>Tic-Tac-Toe</h2>
      <p>(Player X vs AI O)</p>
      <div id="ticTacToeBoard" style="
        display: grid;
        grid-template-columns: repeat(3, 100px);
        grid-template-rows: repeat(3, 100px);
        gap: 5px;
        justify-content: center;
        align-items: center;
        margin: 20px 0;">
        ${Array(9)
          .fill(null)
          .map(
            (_, index) =>
              `<button class="tic-tac-toe-cell" onclick="makeMove(${index})" style="
                width: 100px;
                height: 100px;
                font-size: 24px;
                background-color: #1e1e1e;
                border: 2px solid #fff;
                color: white;
                cursor: pointer;"></button>`
          )
          .join("")}
      </div>
      <p id="gameStatus" style="margin: 20px 0;">Player X's turn</p>
      <button onclick="location.reload()" style="
        padding: 10px 20px;
        background-color: #1e90ff;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;">Back to Menu</button>
    </div>
  `;
}

function makeMove(index) {
  if (!gameActive || board[index] !== null || currentPlayer !== "X") return;

  // Player X makes a move
  board[index] = currentPlayer;
  document.getElementsByClassName("tic-tac-toe-cell")[index].innerText = currentPlayer;

  if (checkWin()) {
    document.getElementById("gameStatus").innerText = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (board.every((cell) => cell !== null)) {
    document.getElementById("gameStatus").innerText = "It's a draw!";
    gameActive = false;
    return;
  }

  // Switch to AI
  currentPlayer = "O";
  document.getElementById("gameStatus").innerText = `Player ${currentPlayer}'s turn`;
  setTimeout(aiMove, 500); // AI takes a moment to think
}

function aiMove() {
  if (!gameActive) return;

  const bestMove = findBestMove();
  board[bestMove] = currentPlayer;
  document.getElementsByClassName("tic-tac-toe-cell")[bestMove].innerText = currentPlayer;

  if (checkWin()) {
    document.getElementById("gameStatus").innerText = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (board.every((cell) => cell !== null)) {
    document.getElementById("gameStatus").innerText = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = "X";
  document.getElementById("gameStatus").innerText = `Player ${currentPlayer}'s turn`;
}

function findBestMove() {
  // Check for winning move
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      board[i] = "O";
      if (checkWin()) {
        board[i] = null;
        return i;
      }
      board[i] = null;
    }
  }

  // Check for blocking move
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      board[i] = "X";
      if (checkWin()) {
        board[i] = null;
        return i;
      }
      board[i] = null;
    }
  }

  // Take center if available
  if (board[4] === null) return 4;

  // Take a corner if available
  const corners = [0, 2, 6, 8];
  for (let corner of corners) {
    if (board[corner] === null) return corner;
  }

  // Take any remaining spot
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) return i;
  }
}

function checkWin() {
  const winConditions = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal top-left to bottom-right
    [2, 4, 6], // Diagonal top-right to bottom-left
  ];

  return winConditions.some((condition) =>
    condition.every((index) => board[index] === currentPlayer)
  );
}
