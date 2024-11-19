function startGame(gameName) {
  if (gameName === "clicker") {
    loadClickerGame();
  } else if (gameName === "ticTacToe") {
    loadTicTacToe();
  } else if (gameName === "memory") {
    loadMemoryGame();
  }
}

function loadClickerGame() {
  document.body.innerHTML = `
    <div style="text-align: center; margin-top: 50px; color: white;">
      <h2>Clicker Game</h2>
      <p>Click the button as many times as you can!</p>
      <button id="clickButton">Click Me!</button>
      <p>Clicks: <span id="clickCount">0</span></p>
      <button onclick="location.reload()">Back to Menu</button>
    </div>
  `;

  let count = 0;
  document.getElementById("clickButton").addEventListener("click", () => {
    count++;
    document.getElementById("clickCount").textContent = count;
  });
}

function loadTicTacToe() {
  document.body.innerHTML = `
    <div style="text-align: center; margin-top: 50px; color: white;">
      <h2>Tic-Tac-Toe</h2>
      <p>(This is a simple 2-player version)</p>
      <div id="ticTacToeBoard" style="display: grid; grid-template-columns: repeat(3, 100px); gap: 5px; margin: 20px auto;">
        ${Array(9)
          .fill(null)
          .map(
            (_, index) =>
              `<button class="tic-tac-toe-cell" onclick="makeMove(${index})" style="width: 100px; height: 100px; font-size: 24px;"></button>`
          )
          .join("")}
      </div>
      <p id="gameStatus">Player X's turn</p>
      <button onclick="location.reload()">Back to Menu</button>
    </div>
  `;
}

function loadMemoryGame() {
  document.body.innerHTML = `
    <div style="text-align: center; margin-top: 50px; color: white;">
      <h2>Memory Game</h2>
      <p>(Match the cards!)</p>
      <p>Coming soon...</p>
      <button onclick="location.reload()">Back to Menu</button>
    </div>
  `;
}
