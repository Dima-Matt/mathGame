const screen = document.querySelector(".main__screen");
let dropValue;
const screenFloodDiv = document.querySelector(".main__screen-flood");
const gameScore = document.querySelector(".score-result");
let timeOut = 10000;
let mainGameDiv = document.querySelector(".main__game");

screen.addEventListener("click", createRandomDrope);

function createRandomDrope() {
  function startCreateDrope() {
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
    let timer = setInterval(function () {
      let timePassed = Date.now() - start;

      
     
      let dropDistance = mainGameDiv.offsetHeight - screenFloodDiv.offsetHeight - drop.offsetHeight;

      if (timePassed >= timeOut) {
        clearInterval(timer);
        dropDelete();
        return;
      }

      function draw(timePassed) {
        drop.style.top = dropDistance / timeOut * timePassed + "px";
      }

      draw(timePassed);
    }, 20);

    

   
  }
  startCreateDrope();
  setInterval(startCreateDrope, timeOut);
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
    if (calcScreen.innerHTML === '') {
      return;
    }

    if (calcScreen.innerHTML == dropValue) {
      
     const result = parseInt(gameScore.innerHTML) + parseInt(calcScreen.innerHTML);
      gameScore.innerHTML = result;
      dropDelete();
      
    } else {
      const result = parseInt(gameScore.innerHTML) - parseInt(calcScreen.innerHTML);
      gameScore.innerHTML = result;
      screenFloodDiv.style.height =  (mainGameDiv.offsetHeight - screenFloodDiv.offsetHeight) * 0.2 + screenFloodDiv.offsetHeight + 'px';
      timeOut = timeOut * 0.8;
      

    }
    calcScreen.innerHTML = '';
  


  });
}

calculatorValue();

function dropDelete() {
  const drop = document.querySelector('.drop');
  drop.remove();
  dropValue = null;
}
