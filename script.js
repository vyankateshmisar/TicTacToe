// Dom Elements

// const squareOne = document.getElementById("grid_square-1");
// const squareTwo = document.getElementById("grid_square-2");
// const squareThree = document.getElementById("grid_square-3");
// const squareFour = document.getElementById("grid_square-4");
// const squareFive = document.getElementById("grid_square-5");
// const squareSix = document.getElementById("grid_square-6");
// const squareSeven = document.getElementById("grid_square-7");
// const squareEight = document.getElementById("grid_square-8");
// const squareNine = document.getElementById("grid_square-9");
const allSquares = document.querySelectorAll(".grid_square");
const playerOneScore = document.getElementById("info__player__score1");
const playerTwoScore = document.getElementById("info__player__score2");
const instructionsText = document.getElementById("instructions__text");
const startGameBtn = document.getElementById("instructions__btn");
const modal = document.getElementById("modal");

// variables
let squaresGrid = [2, 2, 2, 2, 2, 2, 2, 2, 2];
const players = [
  {
    name: "Jack",
    wins: 0,
  },
  {
    name: "Jill",
    wins: 0,
  },
];
let didAnyOneWin = false;
let countOfMoves = 0;
let isCircleFlag = false;
let playerHasWon = false;

//Square
function addSquareClick() {
  allSquares.forEach((square, idx) => {
    square.addEventListener("click", () => squareClick(square, idx));
  });
}

function squareClick(square, idx) {
  let currSq = squaresGrid[idx];
  if (!didAnyOneWin && squaresGrid[idx] === 2) {
    if (!isCircleFlag) {
      squaresGrid[idx] = 0;
      square.classList.add("cross");
    } else {
      squaresGrid[idx] = 1;
      square.classList.add("circle");
    }
    incrementMove();
  }
}

function incrementMove(index) {
  countOfMoves += 1;
  isCircleFlag = !isCircleFlag;
  let nextPlayer = 0;
  if (isCircleFlag) {
    nextPlayer = 1;
  }
  let nextPlayerName = players[nextPlayer].name;
  instructionsText.innerHTML = `${nextPlayerName}'s turn`;
  checkForWin();
  checkForTie();
}

function checkForWin() {
  //check the column
  let winScenarios = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const winScenario of winScenarios) {
    let firstSqVal = squaresGrid[winScenario[0]];
    if (
      firstSqVal != 2 &&
      squaresGrid[winScenario[1]] === firstSqVal &&
      squaresGrid[winScenario[2]] === firstSqVal
    ) {
      didAnyOneWin = true;
      currPlayerWon();
      break;
    }
  }
}
function currPlayerWon() {
  if (!isCircleFlag) {
    players[1].wins += 1;
    playerTwoScore.innerHTML = players[1].wins;
    instructionsText.innerHTML = `${players[1].name} won!`;
  } else {
    players[0].wins += 1;
    playerOneScore.innerHTML = players[0].wins;
    instructionsText.innerHTML = `${players[0].name} won!`;
  }
  continueGame();
}

function checkForTie() {
  if (countOfMoves === 9 && !didAnyOneWin) {
    instructionsText.innerHTML = "It's a Tie";
    continueGame();
  }
}

function continueGame() {
  setTimeout(() => {
    resetGame();
  }, 2000);
}

function resetGame() {
  squaresGrid.fill(2);
  allSquares.forEach((square) => {
    square.classList = "grid_square";
  });
  addSquareClick();
  didAnyOneWin = false;
  isCircleFlag = false;
  countOfMoves = 0;
  let nextPlayerName = players[0].name;
  instructionsText.innerHTML = `${nextPlayerName}'s turn`;
}
function startGame() {
  startGameBtn.addEventListener("click", () => {
    modal.style.display = "flex";
  });
  const form = document.querySelector("form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const player1Input = document
      .getElementById("player1")
      .value.trim()
      .toLowerCase();
    const player2Input = document
      .getElementById("player2")
      .value.trim()
      .toLowerCase();
    const player1Name =
      player1Input.charAt(0).toUpperCase() + player1Input.slice(1);

    const player2Name =
      player2Input.charAt(0).toUpperCase() + player2Input.slice(1);
    players[0].name = player1Name;
    players[1].name = player2Name;
    players[0].wins = 0;
    players[1].wins = 0;
    if (player1Input === "coco") {
      document.getElementById(
        "info__player__name1"
      ).innerHTML = `${players[0].name}
        <img src='./images/crown.png' width='20px' height='15px'>`;
    } else {
      document.getElementById("info__player__name1").innerHTML =
        players[0].name;
    }

    document.getElementById("info__player__name2").innerHTML = players[1].name;
    playerOneScore.innerHTML = players[0].wins;
    playerTwoScore.innerHTML = players[1].wins;

    instructionsText.innerHTML = `${players[0].name}'s turn to start`;
    modal.style.display = "none";
    startGameBtn.innerHTML = "Restart Gamey";

    addSquareClick();
    resetGame();
    form.reset();
  });
}

startGame();
