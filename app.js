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
  if(!jatekVege){go = go === "circle" ? "cross" : "circle";
  if(!jatekVege){infoDisplay.textContent = `It is now ${go}'s turn.`;}
  e.target.removeEventListener("click", addGo);
  if (playersTurn) {PlayerStep(e.target.id)};
  playersTurn =  playersTurn? false:true;
  }
  setTimeout(()=>AIstep(),500);
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
var board = [0,0,0,0,0,0,0,0,0];
var emptySpaces = [0,1,2,3,4,5,6,7,8];
let loosinq_True = false;

function AIstep(){/*Egyelőre nem működik*/
steps = 1
  //van-e két jele valakinek már egy vonalban már?-funkció
  function forForEach()
  {emptySpaces.forEach(isItWinning);
  if(Boolean(squareToMark===0|squareToMark)){
    //egyéb dolgok amiket meg kell tenni, ha van már célmező.
    removeEmptySpace(squareToMark);
    board[squareToMark] = -1;
    printAIstep();
    squareToMark = null;
    steps--;
    return;
  };}
   //van-e két jele az AI-nak egy vonalban már?
  if(steps>0){forForEach()};
  //van-e két jele az Playernek egy vonalban már?
  loosinq_True = true;
  if(steps>0){forForEach()};
  loosinq_True = false;
  //Nem 
  if(steps>0){
  squareToMark = sumAllCombo();
  removeEmptySpace(squareToMark);
    board[squareToMark] = -1;
    printAIstep();
    squareToMark = null;
  }

}

  //a végül kiválasztandó mező:
  let playersTurn = true;
  var squareToMark;
  let steps = 0;
  //1. megvizsgálni, hogy lehet-e nyerni -melyik mezővel? Ott ahol már 2 az összeg.
  //emptySpaces.forEach()

  function isItWinning(spaceNr){
    //swich: if looseOrWin is -1, than it decides winning/ if 1, than it decides loosing
    let looseOrWin = -1;
    if(loosinq_True){looseOrWin = 1};

    let relevantCombos = relevantWinningCombos(spaceNr);
    // find the first option to win:
    let firstWinningOption = null;
    relevantCombos.forEach(item => {if(comboReducer(item)===2*looseOrWin){firstWinningOption = spaceNr}})
    if(firstWinningOption){squareToMark=firstWinningOption};
    console.log('squareToMark: '+ squareToMark);
  }  

  function relevantWinningCombos(spaceNr){
   return winningCombos.filter(item => item.includes(spaceNr));
  }
    //funkció, ami összeadja a board adott wininngCombojának megfelelő elemeit.
  function comboReducer(currentCombo){
    return currentCombo.reduce((accu,actu)=>{return accu + board[actu]},0)
  }
 
function sumAllCombo(){
  let summaArr =[];
  /* Ez az alfunkció visszaadja az összes adott indexhez/ID-hez tartozó
   összes nyertes kombináció összegét*/
  function oneComboValue(spaceNr){
    let relevantCombos = relevantWinningCombos(spaceNr);
      relevantCombos.forEach(combo=>{summaArr.push(comboReducer(combo))})
        return summaArr.reduce((accu,actu)=>accu+actu,0)
    }
    let heighestValue =0;
    let heighestValueIndex;
    for(let i = 0; i<emptySpaces.length;i++){
      summaArr=[];
      let currentValue = oneComboValue(emptySpaces[i]);
      console.log(summaArr);
      console.log('currentValue: '+currentValue)
      if(currentValue>heighestValue){heighestValue=currentValue;heighestValueIndex=emptySpaces[i]}
    }
    return board.every(item => item===0)?  4 : heighestValueIndex;
}

  //2. Megvizsgálni, hogy fenyeget-e a vereség -melyik mezőnél? 
      //Ehhez felhasználtam a loosinq_True - global flag-et és módosítottam az előző funkciót.
  //3. Ha egyik se, akkor a legjobb mező kiválasztása

  //AI lépésének megjelenítése:
  function printAIstep() {
    const goDisplay = document.createElement("div");
    goDisplay.classList.add(go);
    drawMatch();
    
    
    
    if(!jatekVege){
    console.log('Ide kellene rakni jelet: '+ squareToMark)
    document.getElementById(squareToMark+"").append(goDisplay);  
    checkScore();
    go = go === "circle" ? "cross" : "circle";
    if(!jatekVege){infoDisplay.textContent = `It is now ${go}'s turn.`;}
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

  //draw
  function drawMatch(){
    if(emptySpaces.length == 0 && !jatekVege){
      infoDisplay.textContent = 'It is a draw!'
    jatekVege = true;
    }
  }



function twoOfTheSameNr(combo,spaceNr){
  let reducedCombo = [...combo]; 
  reducedCombo.splice(reducedCombo.indexOf(spaceNr),1)
  let toTest = [(board[reducedCombo[0]]),(board[reducedCombo[1]])];
  if(toTest[0]===toTest[1] && toTest[0] === looseOrWin){return true;}
  else{return false;};
}


//start a new game
crateBoard();
