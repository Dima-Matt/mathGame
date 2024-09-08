
let animationTimer;
let tideUpCount = 0;
let gameFinish = false;
let dropValue;
let timeOut = 10000;

const screen = document.querySelector(".main__screen");
const screenFloodDiv = document.querySelector(".main__screen-flood");
const gameScore = document.querySelector(".score-result");
let mainGameDiv = document.querySelector(".main__game");
const modalStart = document.querySelector(".modal");
const startModalBtn = document.getElementById("start");
const canceltModalBtn = document.getElementById("cancel");
const cancelGame = document.getElementById("cancel");
const finishGame = document.getElementById("finish");
const restartGame = document.getElementById("restart");
const modalFinish = document.querySelector(".modal-finish");
const gameResult = document.getElementById('score-result');

startModalBtn.addEventListener("click", resetGame);
cancelGame.addEventListener("click", cancel);
finishGame.addEventListener("click", cancel);
restartGame.addEventListener('click', resetGame)

calculatorValue();

function resetGame() {
  tideUpCount = 0;
  gameFinish = false;
  dropValue = null;
  timeOut = 10000;
  modalFinish.style.display = 'none';
  modalStart.style.display = "none";
  screenFloodDiv.style.height = '0px';
  createRandomDrope();
}


function createRandomDrope() {
  
  const drop = document.createElement("div");
  const inDrop = document.createElement("div");
  const containerNum1 = document.createElement("span");
  const containerNum2 = document.createElement("span");
  const containerSign = document.createElement("span");

  drop.classList.add("drop");
  inDrop.classList.add("drop-container");
  containerNum1.classList.add("drop__num-1");
  containerNum2.classList.add("drop__num-2");
  containerSign.classList.add("drop__sign");

  drop.style.left = getRandomInt(1, 500) + "px";
  drop.append(inDrop);

  let num1 = getRandomInt(1, 9);
  let sign = getRandomSign();
  let num2;

  if (sign === "/" && num1 % num2 !== 0) {
    num2 = getRandomInt(1, 9);
    num1 = num1 * num2;
  }

  if (sign === "-") {
    num2 = getRandomInt(1, num1);
  }

  if (sign === "*" || sign === "+") {
    num2 = getRandomInt(1, 9);
  }

  const dropNum1Value = document.getElementById("num-1");
  dropNum1Value.innerHTML = num1;
  const dropSignValue = document.getElementById("sign");
  dropSignValue.innerHTML = sign;
  const dropNum2Value = document.getElementById("num-2");
  dropNum2Value.innerHTML = num2;

  function dropResult(num1, num2, operator) {
    switch (operator) {
      case "+":
        return +num1 + +num2;
      case "-":
        return num1 - num2;
      case "*":
        return num1 * num2;
      case "/":
        return num1 / num2;

      default:
        break;
    }
  }

  dropValue = dropResult(
    dropNum1Value.innerHTML,
    dropNum2Value.innerHTML,
    dropSignValue.innerHTML
  );

  containerNum1.append(num1);
  inDrop.append(containerNum1);
  containerSign.append(sign);
  inDrop.append(containerSign);
  containerNum2.append(num2);
  inDrop.append(containerNum2);

  screen.append(drop);

  let start = Date.now();
  animationTimer = setInterval(function () {
    let timePassed = Date.now() - start;
    let dropDistance =
      mainGameDiv.offsetHeight -
      screenFloodDiv.offsetHeight -
      drop.offsetHeight;

    if (timePassed >= timeOut) {
      dropDelete();
      upTide();
      if (gameFinish === true) {
        return;
      } else {
        createRandomDrope();
      }
      return;
    }

    function draw(timePassed) {
      drop.style.top = (dropDistance / timeOut) * timePassed + "px";
    }

    draw(timePassed);
  }, 20);
}

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

function getRandomSign() {
  const arrSigns = ["+", "-", "*", "/"];
  const i = Math.floor(Math.random() * arrSigns.length);
  return arrSigns[i];
}

function calculatorValue() {
  const buttons = document.querySelectorAll(".btn");
  const calcScreen = document.querySelector(".main__game-calc-display");
  const enter = document.querySelector(".btn-enter");
  const clear = document.querySelector(".btn-clear");
  const del = document.querySelector(".btn-delete");

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      calcScreen.innerHTML += button.innerHTML;
    });
  });

  del.addEventListener("click", function () {
    calcScreen.innerHTML = calcScreen.innerHTML.slice(0, -1);
  });

  clear.addEventListener("click", function () {
    calcScreen.innerHTML = "";
  });

  enter.addEventListener("click", function () {
    if (calcScreen.innerHTML === "") {
      return;
    }

    if (calcScreen.innerHTML == dropValue) {
      const result =
        parseInt(gameScore.innerHTML) + parseInt(calcScreen.innerHTML);
      gameScore.innerHTML = result;
      dropDelete();
      createRandomDrope();
    } else {
      const result =
        parseInt(gameScore.innerHTML) - parseInt(dropValue);
      gameScore.innerHTML = result;
      dropDelete();
      upTide();
      createRandomDrope();
    }
    calcScreen.innerHTML = "";
  });
}



function dropDelete() {
  clearInterval(animationTimer);
  const drop = document.querySelector(".drop");
  drop.remove();
  dropValue = null;
}

function cancel() {
  window.close();
}

function upTide() {
  screenFloodDiv.style.height =
    (mainGameDiv.offsetHeight - screenFloodDiv.offsetHeight) * 0.2 +
    screenFloodDiv.offsetHeight +
    "px";
  timeOut = timeOut * 0.8;

  tideUpCount++;
  if (tideUpCount === 3) {
    modalFinish.style.display = "block";
    gameFinish = true;
    gameResult.innerHTML = gameScore.innerHTML;
   
  }
}

