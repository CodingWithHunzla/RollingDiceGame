const startGame = document.getElementById("startgame");
const gameControl = document.getElementById("gamecontrol");
const score = document.getElementById("score");
const game = document.getElementById("game");
const actionArea = document.getElementById("actions");

let gameDate = {
  dice: [
    "dice-images/1die.jpg",
    "dice-images/2die.jpg",
    "dice-images/3die.jpg",
    "dice-images/4die.jpg",
    "dice-images/5die.jpg",
    "dice-images/6die.jpg",
  ],
  players: ["player1", "player2"],
  score: [0, 0],
  roll1: 0,
  roll2: 0,
  rollSum: 0,
  index: 0,
  gameEnd: 29,
};

startGame.addEventListener("click", function () {
  gameDate.index = Math.round(Math.random());

  gameControl.innerHTML = "<h2>The game has started </h2>";
  gameControl.innerHTML += `<button id="quit">Do you want to quit </button>`;

  document.getElementById("quit").addEventListener("click", function () {
    location.reload();
  });

  setUpTurn();
});
// function setUpTurn
function setUpTurn() {
  game.innerHTML = `<p>Roll the dice for ${
    gameDate.players[gameDate.index]
  }</p>`;
  actionArea.innerHTML = `<button id="roll">Roll the dice!</button>`;
  document.getElementById("roll").addEventListener("click", function () {
    // calling throwDice funtion
    throwDice();
  });
}
// *****funtion throw dice
function throwDice() {
  actionArea.innerHTML = "";
  gameDate.roll1 = Math.floor(Math.random() * 6) + 1;
  gameDate.roll2 = Math.floor(Math.random() * 6) + 1;

  game.innerHTML = `<p>Roll the dice for ${
    gameDate.players[gameDate.index]
  }</p>`;
  game.innerHTML += `<img src="${
    gameDate.dice[gameDate.roll1 - 1]
  }" alt="die">`;
  game.innerHTML += `<img src="${
    gameDate.dice[gameDate.roll2 - 1]
  }" alt="die">`;
  gameDate.rollSum = gameDate.roll1 + gameDate.roll2;
  // if both dice are 1
  if (gameDate.rollSum === 2) {
    game.innerHTML += `<p>Oh snap! you got snake eyes.</p>`;
    gameDate.score[gameDate.index] = 0;
    gameDate.index ? (gameDate.index = 0) : (gameDate.index = 1);
    setTimeout(setUpTurn, 1500);
    // if one dice have 1
  } else if (gameDate.roll1 === 1 || gameDate.roll2 === 1) {
    gameDate.index ? (gameDate.index = 0) : (gameDate.index = 1);
    game.innerHTML += `<p>O! Sorry one of your roll is 1, swithing to ${
      gameDate.players[gameDate.index]
    }  </P>`;
    setTimeout(setUpTurn, 2000);
    // if neither have 1
  } else {
    gameDate.score[gameDate.index] += gameDate.rollSum;
    actionArea.innerHTML = `<button id="rollagain">Roll again</button> or <button id="pass">Pass</button>`;
    document.getElementById("rollagain").addEventListener("click", function () {
      // setUpTurn();
      throwDice();
    });
    document.getElementById("pass").addEventListener("click", function () {
      gameDate.index ? (gameDate.index = 0) : (gameDate.index = 1);

      setUpTurn();
    });
    // calling checkWiningCondition
    checkWiningCondition();
  }
}
function checkWiningCondition() {
  if (gameDate.score[gameDate.index] > gameDate.gameEnd) {
    score.innerHTML = `<h2>${gameDate.players[gameDate.index]} wins with ${
      gameDate.score[gameDate.index]
    } points!</h2>`;
    actionArea.innerHTML = "";
    document.getElementById("quit").innerHTML = "Start a new Game";
  } else {
    showCurrentScore();
  }
}
// show current score funtion
function showCurrentScore() {
  score.innerHTML = `<p>The score of  <strong>${gameDate.players[0]} is ${gameDate.score[0]} </strong> and the score of  <strong>${gameDate.players[1]}  is ${gameDate.score[1]}</strong></p>`;
}
