

const drop = document.querySelector('.drop');
const screen = document.querySelector('.main__screen');
const num1 = document.getElementById('num-1');
const num2 = document.getElementById('num-2');
const sign = document.getElementById('sign');


screen.addEventListener('click', createRandomDrope);

function createRandomDrope() {

       drop.classList.remove('hide')
       drop.style.left = getRandomInt(1, 500) + 'px';        
}



function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); 
  }