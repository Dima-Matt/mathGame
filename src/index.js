

const screen = document.querySelector('.main__screen');
const num1 = document.getElementById('num-1');
const num2 = document.getElementById('num-2');
const sign = document.getElementById('sign');


screen.addEventListener('click', createRandomDrope);

function createRandomDrope() {

       // setInterval(function() {
       //     const drop = document.createElement('div');
       //     const inDrop = document.createElement('div');
       //     drop.classList.add('drop');
       //     inDrop.classList.add('drop-container');
       //     drop.style.left = getRandomInt(1, 500) + 'px';
       //     drop.append(inDrop);
       //     screen.append(drop); 
           
       // }, 2000)

       let x = `
           <div class="drop hide">
      <div class="drop-container">
       <span class="drop__num-1" id="num-1">x</span>
       <span class="drop__sign" id="sign">+</span>
       <span class="drop__num-2" id="num-2">y</span>
      </div>
    </div>
       `;

       screen.insertAdjacentHTML('beforeBegin', x);
            
}



function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); 
  }