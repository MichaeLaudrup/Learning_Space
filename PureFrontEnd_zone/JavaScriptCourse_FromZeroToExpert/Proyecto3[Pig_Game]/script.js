'use strict';

const scoresOfPlayersElement = [
  document.querySelector('#score--0'),
  document.querySelector('#score--1'),
];

const currentScoresElement = [
  document.querySelector('#current--0'),
  document.querySelector('#current--1'),
];
const diceImage = document.querySelector('.dice');
const bottomNewGame = document.querySelector('.btn--new');
const bottomRollDice = document.querySelector('.btn--roll');
const bottomHoldScore = document.querySelector('.btn--hold');
const playerDisplays = [
  document.querySelector(`.player--0`),
  document.querySelector(`.player--1`),
];
let actualPlayer, scoresData, temporalyScore;

const changePlayer = function () {
  const previousPlayer = actualPlayer;
  actualPlayer = (actualPlayer + 1) % 2;
  temporalyScore = 0;
  currentScoresElement[previousPlayer].textContent = 0;
  playerDisplays[previousPlayer].classList.toggle('player--active');
  playerDisplays[actualPlayer].classList.toggle('player--active');
  console.log(`Actual player is ${actualPlayer}`);
};

const rollDice = function () {
  const randomNumber = Math.trunc(Math.random() * 6) + 1;
  diceImage.src = `dice-${randomNumber}.png`;
  if (diceImage.classList.contains('hidden'))
    diceImage.classList.remove('hidden');
  if (randomNumber === 1) {
    changePlayer();
  } else {
    temporalyScore += randomNumber;
    currentScoresElement[actualPlayer].textContent = temporalyScore;
  }
};

const holdScore = function () {
  scoresData[actualPlayer] += temporalyScore;
  scoresOfPlayersElement[actualPlayer].textContent = scoresData[actualPlayer];
  if (scoresData[actualPlayer] >= 100) {
    playerDisplays[actualPlayer].classList.remove('player--active');
    playerDisplays[actualPlayer].classList.add('player--winner');
    diceImage.classList.add('hidden');
    bottomRollDice.removeEventListener('click', rollDice);
    bottomHoldScore.removeEventListener('click', holdScore);
  } else {
    changePlayer();
  }
};

const newGame = function () {
  scoresOfPlayersElement[0].textContent = 0;
  scoresOfPlayersElement[1].textContent = 0;
  currentScoresElement[0].textContent = 0;
  currentScoresElement[1].textContent = 0;
  actualPlayer = 0;
  scoresData = [0, 0];
  temporalyScore = 0;
  playerDisplays[0].classList.remove('player--winner');
  playerDisplays[0].classList.add('player--active');
  playerDisplays[1].classList.remove('player--active');
  playerDisplays[1].classList.remove('player--winner');
  diceImage.classList.add('hidden');
  bottomRollDice.addEventListener('click', rollDice);
  bottomHoldScore.addEventListener('click', holdScore);
};

newGame();
bottomNewGame.addEventListener('click', newGame);
