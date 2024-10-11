'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal');

const showModalWindow = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
const hiddenModalWindow = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', showModalWindow);

btnCloseModal.addEventListener('click', hiddenModalWindow);
overlay.addEventListener('click', hiddenModalWindow);

document.addEventListener('keydown', function (eventInfo) {
  if (eventInfo.key === 'Escape' && !modal.classList.contains('hidden')) {
    console.log('entra');
    hiddenModalWindow();
  }
});
