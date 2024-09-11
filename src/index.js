
let animationTimer;
let tideUpCount = 0;
let gameFinish = false;
let dropValue;
let timeOut = 10000;
let dropCount = 0;

const screen = document.querySelector(".main__screen");
const screenFloodDiv = document.querySelector(".main__screen-flood");
const gameScore = document.querySelector(".score-result");
const modalStart = document.querySelector(".modal");
const startModalBtn = document.getElementById("start");
const canceltModalBtn = document.getElementById("cancel");
const cancelGame = document.getElementById("cancel");
const finishGame = document.getElementById("finish");
const restartGame = document.getElementById("restart");
const modalFinish = document.querySelector(".modal-finish");
const gameResult = document.getElementById('score-final');
const calcScreen = document.querySelector(".main__game-calc-display");
const rightAnswerSound = document.querySelector('.right');
const wrongAnswerSound = document.querySelector('.wrong');


///// Полноэкранный режим
const fullScreenIcon = document.querySelector('.full-screen');
const outOfFullScreenIcon = document.querySelector('.no-full-screen');
// Вход
fullScreenIcon.addEventListener('click', function() { 
  document.documentElement.requestFullscreen()
})
// Выход
outOfFullScreenIcon.addEventListener('click', function () {
  document.exitFullscreen();
})
  



startModalBtn.addEventListener("click", resetGame);
cancelGame.addEventListener("click", cancel);
finishGame.addEventListener("click", cancel);
restartGame.addEventListener('click', resetGame)

calculatorValue();

//Сброс переменных, скрытие модалок, откат прилива
function resetGame() {
  tideUpCount = 0;
  dropCount = 0;
  gameFinish = false;
  dropValue = null;
  timeOut = 10000;
  modalFinish.style.display = 'none';
  modalStart.style.display = "none";
  screenFloodDiv.style.height = '0px';
  calcScreen.innerHTML = "";
  gameScore.innerHTML = 0;
  createRandomDrope();
}

///// Создание капли
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

  //// Диапазон появление капли по горизонтали
  drop.style.left = getRandomInt(1, screen.offsetWidth - drop.offsetWidth) + "px";
  drop.append(inDrop);


  //// Генерация случайных чисел

  //// Уровень игры - усложнение мат. операций
  let level;

  if (dropCount > 9) {
    level = 1;
 } else {
   level = 0;
 }

  let maxValue = 9 + level * 10;
  let minValue = 1 + level * 10;
  let num1 = getRandomInt(minValue, maxValue);
  let sign = getRandomSign();
  let num2;
  

  

  if (sign === "/" && num1 % num2 !== 0) {
    num2 = getRandomInt(1, maxValue);
    num1 = num1 * num2;
  }

  if (sign === "-") {
    num2 = getRandomInt(minValue, num1);
  }

  if (sign === "*" || sign === "+") {
    num2 = getRandomInt(minValue, maxValue);
  }

  // Сохранение в HTML рандомных значений
  const dropNum1Value = document.getElementById("num-1");
  dropNum1Value.innerHTML = num1;
  const dropSignValue = document.getElementById("sign");
  dropSignValue.innerHTML = sign;
  const dropNum2Value = document.getElementById("num-2");
  dropNum2Value.innerHTML = num2;


  // Генерация знаков
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

  /// "Вычисление" капли
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


  ///// Падение капли
  let start = Date.now();
  animationTimer = setInterval(function () {
    //// Время падения капли
    let timePassed = Date.now() - start;
    //// Расстояние падения
    let dropDistance =
      screen.offsetHeight -
      screenFloodDiv.offsetHeight -
      drop.offsetHeight;

    ///// Если не успели ввести ответ за время падения
    if (timePassed >= timeOut) {
      const result =
        parseInt(gameScore.innerHTML) - parseInt(dropValue);
      gameScore.innerHTML = result;
      dropDelete();
      upTide();
      ///// Если проиграли
      if (gameFinish === true) {
        return;
      } else {
        //// Продолжение игры
        createRandomDrope();
      }
      return;
    }

    ///// Анимация
    function draw(timePassed) {
      drop.style.top = (dropDistance / timeOut) * timePassed + "px";
    }

    draw(timePassed);
  }, 20);
}

//// Рандомное число
function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}


//// Рандомный знак
function getRandomSign() {
  const arrSigns = ["+", "-", "*", "/"];
  const i = Math.floor(Math.random() * arrSigns.length);
  return arrSigns[i];
}


//// Калькулятор и ввод ответа
function calculatorValue() {
  const buttons = document.querySelectorAll(".btn");
  const enter = document.querySelector(".btn-enter");
  const clear = document.querySelector(".btn-clear");
  const del = document.querySelector(".btn-delete");
  
  const symbolKeyCode = {
    '48': '0',
    '49': '1',
    '50': '2',
    '51': '3',
    '52': '4',
    '53': '5',
    '54': '6',
    '55': '7',
    '56': '8',
    '57': '9',
  }

  const enterKeyCode = 13;
  const backspaceKeyCode = 8;

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
    introduseSolution();
  });


  //// Ввод ответа с клавиатуры
  window.addEventListener('keypress', function (event) {
    if (event.keyCode in symbolKeyCode) {
      calcScreen.innerHTML += parseInt(event.key);      
    }

    else if (event.keyCode === backspaceKeyCode) {
      calcScreen.innerHTML = "";
    }

    else if (event.keyCode === enterKeyCode) {
      introduseSolution();
    }
  });
}


//// Удаление капли
function dropDelete() {
  clearInterval(animationTimer);
  const drop = document.querySelector(".drop");
  drop.remove();
  // Удаление значения капли
  dropValue = null;
}

///// Выйти из игры
function cancel() {
  window.close();
}

//////// Поднятие уровня воды при ошибке
function upTide() {
  screenFloodDiv.style.height =
    (screen.offsetHeight - screenFloodDiv.offsetHeight) * 0.2 +
    screenFloodDiv.offsetHeight +
    "px";
  timeOut = timeOut * 0.8;


  ///// Счётчик ошибок
  tideUpCount++;
  if (tideUpCount === 3) {
    modalFinish.style.display = "flex";
    gameFinish = true;
    gameResult.innerHTML = gameScore.innerHTML;
   
  }
}

///////// Ввод ответа 

function introduseSolution() {
  if (calcScreen.innerHTML === "") {
    return;
  }
  /// если правильный ответ
  if (calcScreen.innerHTML == dropValue) {
    const result =
      parseInt(gameScore.innerHTML) + parseInt(calcScreen.innerHTML);
    gameScore.innerHTML = result;
    rightAnswerSound.play();
    // счетчик капель, для усложнения выражений
    dropCount++;
    dropDelete();
    createRandomDrope();
    /// если неправильный ответ
  } else {
    const result =
      parseInt(gameScore.innerHTML) - parseInt(dropValue);
    gameScore.innerHTML = result;
    wrongAnswerSound.play();
    dropDelete();
    upTide();
    if (gameFinish === false) {
      createRandomDrope();
    } 
    
  }
  calcScreen.innerHTML = "";
}

