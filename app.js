const gameBoard = document.querySelector("#gameboard");
const infoDisplay = document.getElementById("info");

const startCells = ["", "", "", "", "", "", "", "", ""];
let go = "circle";
infoDisplay.textContent = "Circle goes first";

const winningCombos = [
  [0, 1, 2],
  [0, 3, 6],
  [3, 4, 5],
  [6, 7, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [0, 4, 8],
];

function crateBoard() {
  startCells.forEach((_cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("square");
    cellElement.id = index;

    cellElement.addEventListener("click", addGo);
    gameBoard.append(cellElement);
  });
}

function addGo(e) {
  const goDisplay = document.createElement("div");
  goDisplay.classList.add(go);
  e.target.append(goDisplay);
  
  checkScore();
  go = go === "circle" ? "cross" : "circle";
  infoDisplay.textContent = `It is now ${go}'s turn.`;
  e.target.removeEventListener("click", addGo);
  
}

function checkScore() {
  const allSquares = document.querySelectorAll(".square");
 
  winningCombos.forEach((array) => {
    const circleWins = array.every((cell) =>
      allSquares[cell].firstElementChild?.classList.contains("circle")
    );

    if (circleWins) {
      infoDisplay.textContent = "Circle Wins!";
      allSquares.forEach((square) =>
        square.replaceWith(square.cloneNode(true))
        
      );
      return;
    }
  });

  winningCombos.forEach((array) => {
    const crossWins = array.every((cell) =>
      allSquares[cell].firstElementChild?.classList.contains("cross")
    );

    if (crossWins) {
      infoDisplay.textContent = "Cross Wins!";
      allSquares.forEach((square) =>
        square.replaceWith(square.cloneNode(true))
        
      );
      return;
    }
  });

}

//start a new game
crateBoard();
