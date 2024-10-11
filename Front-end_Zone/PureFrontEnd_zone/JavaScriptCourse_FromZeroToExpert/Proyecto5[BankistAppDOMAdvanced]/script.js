'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');
const btnScroolTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabsContainer = document.querySelector('.operations__tab-container');
const navigationBar = document.querySelector('.nav');

const openModal = function (event) {
  event.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(item => item.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
//////////////////////////ADDING COOKIES////////////////////////////////////
//Creating cookies info element
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML = `We use cookies for improved functionality and analytics. 
  <button class="btn btn--close-cookie">Go it!</button>`;
//adding element
header.append(message);

//Styling cookies info element
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

const actualHeight = Number.parseFloat(getComputedStyle(message).height); //Obtain real height on pixels
message.style.height = actualHeight + 30 + 'px';
console.log(actualHeight);

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });

//////////////////////SCROLLIN TO SECCION 1///////////////////////////

btnScroolTo.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});

//////////////////// PAGE NAVIGATION WITH EVENT DELEGATION ////////////////////////////////

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

///THIS WAY INVOLVES MANY COPIES OF EVENT LISTENER
/* document.querySelectorAll('.nav__link').forEach(element =>
  element.addEventListener('click', function (e) {
    e.preventDefault();
    const id = this.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    console.log(id);
  })
); */

////////////////////// TABS NAVEGATION ON SECTION 2 //////////////////////////////////

const tabsContens = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  e.preventDefault();
  const buttonSelected = e.target.closest('button');

  if (!buttonSelected) return;

  const allButtons = buttonSelected.parentNode.children;
  for (const button of allButtons)
    button.classList.remove('operations__tab--active');
  buttonSelected.classList.add('operations__tab--active');
  const numberTab = buttonSelected.dataset.tab;
  console.log(tabsContens);
  tabsContens.forEach(e => e.classList.remove('operations__content--active'));
  document
    .querySelector(`.operations__content--${numberTab}`)
    .classList.add('operations__content--active');
});

///////////////////// MENU FADE ANIMATION //////////////////

const navAnimation = function (e, opacityLevel) {
  if (e.target.classList.contains('nav__link')) {
    const linkClicked = e.target;
    const siblingElements = linkClicked
      .closest('.nav')
      .querySelectorAll('.nav__link');
    const logo = linkClicked.closest('.nav').querySelector('img');
    siblingElements.forEach(e => {
      if (e !== linkClicked) e.style.opacity = opacityLevel;
      logo.style.opacity = opacityLevel;
    });
  }
};
navigationBar.addEventListener('mouseover', function (e) {
  navAnimation(e, 0.5);
});

navigationBar.addEventListener('mouseout', function (e) {
  navAnimation(e, 1);
});

//////////////////////// STICKY EFECT /////////////////////////

const stickyNav = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) navigationBar.classList.add('sticky');
  else navigationBar.classList.remove('sticky');
};
const obsOptions = {
  root: null,
  threshold: 0,
  rootMargin: '-90px',
};

const observer = new IntersectionObserver(stickyNav, obsOptions);
observer.observe(header);

/* BAD WAY
const initialCoords = section1.getBoundingClientRect();
window.addEventListener('scroll', function () {
  if (window.scrollY > initialCoords.top) navigationBar.classList.add('sticky');
  else navigationBar.classList.remove('sticky');
});
*/

/////////////////////////REVEAL SECTIONS /////////////////////////////////////

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const optionsObserver = {
  root: null,
  threshold: 0.15,
};
const sectionObserver = new IntersectionObserver(
  revealSection,
  optionsObserver
);

document.querySelectorAll('.section').forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

////////////////////LAZY IMAGES ///////////////////////////
const imgTargets = document.querySelectorAll('img[data-src]');
const lazyImages = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(lazyImages, {
  root: null,
  threshold: 0.7,
});
imgTargets.forEach(img => imgObserver.observe(img));

////////////////// SLIDER //////////////////////////////////

const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');

const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');

let currentSlide = 0;
const dotsContainer = document.querySelector('.dots');

const createDots = function () {
  slides.forEach((_, i) => {
    dotsContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};
createDots();

const activateDot = function () {
  const dots = dotsContainer.querySelectorAll('button');
  dots.forEach(dot => {
    if (Number.parseInt(dot.dataset.slide) === currentSlide) {
      dot.classList.add('dots__dot--active');
    } else {
      dot.classList.remove('dots__dot--active');
    }
  });
};
activateDot();

const goToSlide = function (slide) {
  activateDot();
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%`)
  );
};
goToSlide(0);

const nextSlide = function () {
  if (currentSlide === slides.length - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  goToSlide(currentSlide);
};

const previousSlide = function () {
  if (currentSlide === 0) {
    currentSlide = slides.length - 1;
  } else {
    currentSlide--;
  }
  goToSlide(currentSlide);
};
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', previousSlide);

document.addEventListener('keydown', function (e) {
  console.log(e);
  e.key === 'ArrowRight' && nextSlide();
  e.key === 'ArrowLeft' && previousSlide();
});

dotsContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const slide = e.target.dataset.slide;
    e.target.classList.add('dots_dot--active');
    goToSlide(slide);
  }
});

let x = x > 3 ? 5 : 7;
