'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [
    1000, 200, 500, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300,
  ],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2021-06-20T13:00:17.178Z',
    '2019-11-18T21:31:17.178Z',
    '2021-06-24T13:00:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'es-ES', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

let actualAccountLoged, timer;

/*
  This function calculates the user names of the customers accounts of this app (without dataBase) from their names, 
  We just need that this function executes one time because the userNames are statics. 
*/
(function (accounts) {
  accounts.forEach(user => {
    user.userName = user.owner
      .toLowerCase()
      .split(' ')
      .map(item => item[0])
      .join('');
  });
})(accounts);

const dateOnString = function (date, locale, movementsMod = false) {
  let mostOfFiveDays = false;
  if (movementsMod) {
    const currentDate = new Date();
    const daysPassed = Math.round((currentDate - date) / 1000 / 60 / 60 / 24);
    if (daysPassed <= 5 && daysPassed >= 0) {
      return daysPassed === 0 ? 'TODAY' : `${daysPassed} DAYS AGO`;
    } else {
      mostOfFiveDays = true;
    }
  }

  if (movementsMod === false || mostOfFiveDays) {
    const options = {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    };

    if (movementsMod === false) {
      options.hour = 'numeric';
      options.minute = 'numeric';
    }
    return new Intl.DateTimeFormat(locale, options).format(date);

    /* const day = `${date.getDate()}`.padStart(2, 0);
    const month = `${date.getMonth() + 1}`.padStart(2, 0);
    const year = date.getFullYear();
    const hour = `${date.getHours()}`.padStart(2, 0);
    const minuts = `${date.getMinutes()}`.padStart(2, 0);
    return `${day}/${month}/${year} ${
      !movementsMod ? ', ' + hour + ':' + minuts : ''
    }`; */
  }
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

/*
  This function insert all movements of a customer in the user interface. 
*/
const displayMovements = function (user) {
  containerMovements.innerHTML = '';
  user.movements.forEach((element, index) => {
    const typeOfmovement = element > 0 ? 'deposit' : 'withdrawal';
    const newHtmlMovement = `
    <div class="movements__row"> 
      <div class="movements__type movements__type--${typeOfmovement}">
          ${index + 1} ${typeOfmovement}
      </div>
      <div class="movements__date">${dateOnString(
        new Date(user.movementsDates[index]),
        user.locale,
        true
      )}
        </div>
      <div class="movements__value">${formatCur(
        element,
        user.locale,
        user.currency
      )}</div>
    </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', newHtmlMovement);
  });
};

function calcAndShowBalance(user) {
  user.balance = user.movements.reduce((acc, val) => (acc += val), 0);
  labelBalance.innerHTML = formatCur(user.balance, user.locale, user.currency);
}

function displayEstadistics(user) {
  const inComes = user.movements
    .filter(item => item > 0)
    .reduce((acc, item) => acc + item, 0);
  const outComes = Math.abs(
    user.movements.filter(item => item < 0).reduce((acc, item) => acc + item, 0)
  );
  const interest = user.movements
    .filter(item => item > 0)
    .map(item => (item * user.interestRate) / 100)
    .filter(interest => interest >= 1)
    .reduce((acc, item) => acc + item, 0);
  labelSumIn.textContent = `${formatCur(inComes, user.locale, user.currency)}`;
  labelSumOut.textContent = `${formatCur(
    outComes,
    user.locale,
    user.currency
  )}`;
  labelSumInterest.textContent = `${formatCur(
    interest,
    user.locale,
    user.currency
  )}`;
}

const displayLabelTime = function () {
  labelDate.textContent = dateOnString(new Date(), actualAccountLoged.locale);
};

function updateInterface() {
  calcAndShowBalance(actualAccountLoged);
  displayMovements(actualAccountLoged);

  displayEstadistics(actualAccountLoged);
  displayLabelTime();
  setInterval(displayLabelTime, 1000 * 5);
}

function comprobeCredentialsAndReturnUser(user, pin) {
  const accountFinded = accounts.find(account => account.userName === user);
  if (accountFinded?.pin === pin) {
    return accountFinded;
  } else {
    return false;
  }
}

const updateCountDown = function () {
  let seconds = 60 * 5;
  const tick = function () {
    labelTimer.textContent = `${String(Math.trunc(seconds / 60)).padStart(
      2,
      0
    )}:${String(seconds % 60).padStart(2, 0)}`;

    if (seconds === 0) {
      clearInterval(counter);
      containerApp.style.opacity = 0;
      actualAccountLoged = undefined;
      labelWelcome.textContent = 'Log in to get started';
    }
    seconds--;
  };
  tick();
  const counter = setInterval(tick, 1000);
  return counter;
};
btnLogin.addEventListener('click', function (event) {
  event.preventDefault();
  const userNameIntroduced = inputLoginUsername.value;
  const pin = Number(inputLoginPin.value);

  if (
    (actualAccountLoged = comprobeCredentialsAndReturnUser(
      userNameIntroduced,
      pin
    ))
  ) {
    //If successfull login then...
    labelWelcome.textContent = `Welcome back ${
      actualAccountLoged?.owner?.split(' ')[0]
    }!!`;
    updateInterface();
    inputLoginPin.value = inputLoginUsername.value = '';
    inputLoginPin.blur();
    inputLoginUsername.blur();
    containerApp.style.opacity = 1;
    if (timer) clearInterval(timer);
    timer = updateCountDown();
  }
});
btnTransfer.addEventListener('click', function (event) {
  event.preventDefault();
  const transferBeneficiary = accounts.find(
    user => user.userName === inputTransferTo.value
  );
  const quantitieToTransfer = Number(inputTransferAmount.value);
  inputTransferTo.value = inputTransferAmount.value = '';
  inputTransferAmount.blur();
  if (
    transferBeneficiary &&
    transferBeneficiary.userName !== actualAccountLoged.userName &&
    quantitieToTransfer > 0 &&
    quantitieToTransfer <= actualAccountLoged.balance
  ) {
    actualAccountLoged.movements.push(-quantitieToTransfer);
    actualAccountLoged.movementsDates.push(new Date().toISOString());
    updateInterface();
    clearInterval(timer);
    timer = updateCountDown();
    transferBeneficiary.movements.push(quantitieToTransfer);
    transferBeneficiary.movementsDates.push(new Date().toISOString());
  }
});

function cleanUserInterface() {
  containerApp.style.opacity = 0;
  labelWelcome.textContent = 'Log in to get started';
}
btnClose.addEventListener('click', function (event) {
  event.preventDefault();
  if (inputCloseUsername.value === actualAccountLoged.userName) {
    const userToDelete = comprobeCredentialsAndReturnUser(
      inputCloseUsername.value,
      Number(inputClosePin.value)
    );
    let indexToDelete;
    if (userToDelete) {
      indexToDelete = accounts.findIndex(
        acc => acc.userName === userToDelete.userName
      );
    }
    accounts.splice(indexToDelete, 1);
    actualAccountLoged = undefined;
    cleanUserInterface();
  }
});

btnLoan.addEventListener('click', function (event) {
  event.preventDefault();
  const amount = Math.floor(+inputLoanAmount.value);
  if (
    amount > 0 &&
    actualAccountLoged?.movements?.some(mov => mov >= amount * 0.1)
  ) {
    actualAccountLoged.movements.push(amount);
    actualAccountLoged.movementsDates.push(new Date().toISOString());
    updateInterface();
    clearInterval(timer);
    timer = updateCountDown();
  }
  inputLoanAmount.value = '';
  inputLoanAmount.blur();
});

let sorted = false;
btnSort.addEventListener('click', function () {
  if (sorted) {
    sorted = false;
    displayMovements(actualAccountLoged);
  } else {
    const movementsSorted = [...actualAccountLoged.movements].sort(
      (a, b) => a - b
    );
    const movementsDatesSorted = actualAccountLoged.movements.map(
      (curr, index) => {
        const i = movementsSorted.indexOf(curr);
        return actualAccountLoged.movementsDates[i];
      }
    );
    displayMovements({
      movements: movementsSorted,
      movementsDates: movementsDatesSorted,
    });
    sorted = true;
  }
});

/////////////////////////////////////////////////
