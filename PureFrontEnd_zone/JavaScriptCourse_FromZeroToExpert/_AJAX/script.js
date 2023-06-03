'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

//////// AJAX A LA ANTGUA USANZA /////////////

function getCountryData(countryName) {
  const request = new XMLHttpRequest(); // Se obtiene un objeto de tipo peticion HTTP xml
  request.open('GET', `https://restcountries.eu/rest/v2/name/${countryName}`); //Open es como preparar la petición
  request.send(); //Se envia un requirimiento a un servidor y cuando esta hecho se dispara el evento "load"
  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    const html = `
  <article class="country">
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
  });
}

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
function getCountryAndNeighbour(countryName) {
  const request = new XMLHttpRequest(); // Se obtiene un objeto de tipo peticion HTTP xml
  request.open('GET', `https://restcountries.eu/rest/v2/name/${countryName}`); //Open es como preparar la petición
  request.send(); //Se envia un requirimiento a un servidor y cuando esta hecho se dispara el evento "load"
  request.addEventListener('load', function () {
    console.log(this.responseText);
    const [data] = JSON.parse(this.responseText);
    renderCountry(data);
    const [neighbour] = data.borders;
    console.log(neighbour);
    if (!neighbour) return;

    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const dataCountry = JSON.parse(this.responseText);
      renderCountry(dataCountry, 'neighbour');
    });
  });
}

getCountryAndNeighbour('usa');
getCountryAndNeighbour('germany');
