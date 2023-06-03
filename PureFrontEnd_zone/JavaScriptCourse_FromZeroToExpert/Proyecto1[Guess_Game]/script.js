'use strict';

let secretNumber = Math.trunc(1 + Math.random() * 20);
console.log(secretNumber);
let score = 20;
let highScore = 0;

function noCoincidence(text) {
  if (score > 1) {
    document.querySelector('.message').textContent = text;
    score--;
    document.querySelector('.score').textContent = score;
  } else {
    document.querySelector('.message').textContent = 'You Lost the game!';
    document.querySelector('.score').textContent = 0;
  }
}
document.querySelector('.check').addEventListener('click', function () {
  const actualGuess = Number(document.querySelector('.guess').value);
  if (actualGuess === 0 || actualGuess > 20 || actualGuess < 1) {
    document.querySelector(
      '.message'
    ).textContent = `"${actualGuess}" is a bad input! Try to put a number between 1-20`;
  } else if (actualGuess === secretNumber) {
    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }
    document.querySelector(
      '.message'
    ).textContent = `You are a great diviner!! Correct number 🎉🎉😁 `;
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    document.querySelector('.number').textContent = secretNumber;
  } else if (actualGuess > secretNumber) {
    noCoincidence('too High!');
  } else if (actualGuess < secretNumber) {
    noCoincidence('too Low!');
  }
});

document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumber = Math.trunc(1 + Math.random() * 20);
  console.log(secretNumber);
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('.number').textContent = '?';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.guess').value = '';
});
