const moles = document.querySelectorAll(".mole");
const holes = document.querySelectorAll(".hole");
const gameScore = document.querySelector(".score");
const startBtn = document.querySelector(".startBtn");
let lastHole;
let isTimeUp = false;
let score = 0;

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
  const id = Math.floor(Math.random() * holes.length);
  const hole = holes[id];
  if (hole == lastHole) {
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

function peep() {
  const time = randomTime(200, 1000);
  const hole = randomHole(holes);
  hole.classList.add("up");
  setTimeout(() => {
    hole.classList.remove("up");
    if (!isTimeUp) peep();
  }, time);
}

function startGame() {
  gameScore.textContent = 0;
  timeUp = false;
  score = 0;
  peep();
  setTimeout(() => (isTimeUp = true), 25000);
}

function calcScore(e) {
  if (!e.isTrusted) return; //Cheater
  score++;
  this.parentNode.classList.remove("up");
  gameScore.textContent = score;
}

moles.forEach((mole) => mole.addEventListener("click", calcScore));

startBtn.addEventListener("click", startGame);
