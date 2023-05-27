const gameBoard = document.querySelector("#gameboard");
const infoDisplay = document.getElementById("info");

const startCells = ["", "", "", "", "", "", "", "", ""];
let jatekVege = false;
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
  if(!jatekVege)
  {go = go === "circle" ? "cross" : "circle";
  infoDisplay.textContent = `It is now ${go}'s turn.`;
  e.target.removeEventListener("click", addGo);
  if (playersTurn) {PlayerStep(e.target.id)};
  playersTurn =  playersTurn? false:true;
  }
  
}

function checkScore() {
  const allSquares = document.querySelectorAll(".square");
 
  winningCombos.forEach((array) => {
    const circleWins = array.every((cell) =>
      allSquares[cell].firstElementChild?.classList.contains(go)
    );

    console.log("circleWins: " + circleWins);
    if (circleWins) {
      infoDisplay.textContent = `${go==="circle"?"Circle":"Cross"} Wins!`;
      allSquares.forEach((square) =>
        square.replaceWith(square.cloneNode(true))
        
      );
      jatekVege = true;
      return;
    }
  });
}

// AI
let board = [0,0,0,0,0,0,0,0,0];
let emptySpaces = [0,1,2,3,4,5,6,7,8];

function AIstep(){/*Egyelőre nem működik*/
  emptySpaces.forEach(isItWinning);
  if(Boolean(squareToMark===0|squareToMark)){
    //egyéb dolgok amiket meg kell tenni, ha van már célmező.
    removeEmptySpace(squareToMark);
    board[squareToMark] = -1;
    printAIstep();
    squareToMark = null;
    return;
  };

  
}
  //a végül kiválasztandó mező:
  let playersTurn = true;
  let squareToMark;
  //1. megvizsgálni, hogy lehet-e nyerni -melyik mezővel? Ott ahol már 2 az összeg.
  //emptySpaces.forEach()

  function isItWinning(spaceNr){
    let relevantCombos = relevantWinningCombos(spaceNr);
    let firstWinningOption = null;
    relevantCombos.forEach(item => {if(comboReducer(item)===2){firstWinningOption = spaceNr}})
    if(firstWinningOption){squareToMark=firstWinningOption};
    console.log(squareToMark);
  }  

  function relevantWinningCombos(spaceNr){
   return winningCombos.filter(item => item.includes(spaceNr));
  }
    //funkció, ami összeadja a board adott wininngCombojának megfelelő elemeit.
  function comboReducer(currentCombo){
    return currentCombo.reduce((accu,actu)=>{return accu + board[actu]},0)
  }
 


  //2. Megvizsgálni, hogy fenyeget-e a vereség -melyik mezőnél?
  //3. Ha egyik se, akkor a legjobb mező kiválasztása

  //AI lépésének megjelenítése:
  function printAIstep() {
    const goDisplay = document.createElement("div");
    goDisplay.classList.add(go);
    document.getElementById(squareToMark+"").append(goDisplay);
    
    checkScore();
    if(!jatekVege)
    {go = go === "circle" ? "cross" : "circle";
    infoDisplay.textContent = `It is now ${go}'s turn.`;
    document.getElementById(squareToMark+"").removeEventListener("click", addGo);
    playersTurn =  playersTurn? false:true;
    }
    
  }


  //emptySpacesCallback
  //removeEmptySpace(Kijelölt mező)
  //board[kijelölt mező] = -1;




function PlayerStep(target_id){
  removeEmptySpace(+target_id);
  board[target_id] = 1;
}

function removeEmptySpace(target_id){
  let toDelete = [emptySpaces.indexOf(target_id)];
  emptySpaces.splice(toDelete,1);
};

//start a new game
crateBoard();
