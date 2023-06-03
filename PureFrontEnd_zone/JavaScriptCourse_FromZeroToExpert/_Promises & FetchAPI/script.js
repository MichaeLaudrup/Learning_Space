'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
    <h3 class="country__name">${data.name}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${Math.round(
      +data.population / 1_000_000
    ).toFixed(1)}M</p>
    <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
    <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
   </article>
    `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};
//////// AJAX ANCIENT WAY /////////////

/* const request = new XMLHttpRequest(); // Se obtiene un objeto de tipo peticion HTTP xml
  request.open('GET', `https://restcountries.eu/rest/v2/name/${countryName}`); //Open es como preparar la petición
  request.send(); //Se envia un requirimiento a un servidor y cuando esta hecho se dispara el evento "load" */

//////// AJAX MODERN WAY /////////////

const request = fetch(`https://restcountries.eu/rest/v2/name/spain`); //Una promesa se puede entender como un contenedor para un futuro valor obtenido asincronamente.
//console.log(request);

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

const getCountryData = function (country) {
  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(response => response.json())
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];
      if (!neighbour) return;
      return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    })
    .then(response => response.json())
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => renderError(err.message))
    .finally(() => {});
};

const whereAmI = function (lat, lng) {
  const url = `https://geocode.xyz/${lat},${lng}?geoit=json`;
  fetch(url)
    .then(response => {
      if (!response.ok && response.status === 403)
        throw new Error(
          'La API geocode no permite tantas peticiones seguidas, espere unos segundos antes de darle al botón nuevamente'
        );
      return response.json();
    })
    .then(JsonFormatData => {
      console.log(
        `You're in ${JsonFormatData.city}, ${JsonFormatData.country}`
      );
      return JsonFormatData.country;
    })
    .then(country => getCountryData(country))
    .catch(err => console.error(err));
};

btn.addEventListener('click', function () {
  if (navigator.geolocation) {
    //prettier-ignore
    navigator.geolocation.getCurrentPosition(function (position) {
      const {latitude, longitude} = position.coords; 
      whereAmI(52.508, 13.381); 
    });
  }
});

////////////////// PROMISES CREATION /////////////////////////////////
//Al crear una promesa de hace un callBack con dos funciones (resolved y reject)
/* const lotteryPromise = new Promise(function (resolved, reject) {
  if (Math.random() >= 0.5) {
    //Indicativo de que se resolvio la promesa, el valor que se pase como parametro dentro del resolve es lo que devuelve la promesa
    resolved(' You win the fucking lottery');
  } else {
    reject('ur lost ur fucking money bro');
  }
}); */

/* lotteryPromise
  .then(res => console.log(res))
  .catch(() => console.log('rejected es como generar error')); */

//////////////// CODING CHALLENGE //////////////////////////////

/* const wait = n => {
  return new Promise(resolve => setTimeout(() => resolve(), 1000 * n));
};

btn.style.display = 'none';

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const image = document.createElement('img');
    image.src = imgPath;
    image.addEventListener('load', function () {
      document.querySelector('.images').appendChild(image);
      resolve(image);
    });
    image.addEventListener('error', function () {
      reject('Bad source especification, fix this bitch!!');
    });
  });
};
let image;
createImage('img/img-1.jpg')
  .then(img => {
    image = img;
    return wait(2);
  })
  .then(() => {
    image.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    image = img;
    return wait(2);
  })
  .then(() => (image.style.display = 'none'))
  .catch(err => console.error(err));
 */

/////// CODING CHALLENGE WITH ASYNC /AWAIT AND PROMISES //////////////////

btn.style.display = 'none';
const wait = n => {
  return new Promise(resolve => setTimeout(() => resolve(), 1000 * n));
};
const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const image = document.createElement('img');
    image.src = imgPath;
    image.addEventListener('load', function () {
      document.querySelector('.images').appendChild(image);
      resolve(image);
    });
    image.addEventListener('error', function () {
      reject('Bad source especification, fix this bitch!!');
    });
  });
};

const loadNPause = async function () {
  try {
    const img1 = await createImage('img/img-1.jpg');
    await wait(3);
    img1.style.display = 'none';
    const img2 = await createImage('img/img-2.jpg');
    await wait(3);
    img2.style.display = 'none';
  } catch (err) {
    console.log(err.message);
  }
};
/* loadNPause(); */

const loadAll = async function (imgArr) {
  try {
    /* const imgs = await imgArr.map(img => createImage(img));
    console.log(imgs);
    console.log(imgArr); */
    const images2 = await Promise.all([
      createImage(imgArr[0]),
      createImage(imgArr[1]),
      createImage(imgArr[2]),
    ]);
    images2.forEach(x => x.classList.add('parallel'));
    console.log(images2);
  } catch (err) {
    console.log('fuckerr');
  }
};

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
