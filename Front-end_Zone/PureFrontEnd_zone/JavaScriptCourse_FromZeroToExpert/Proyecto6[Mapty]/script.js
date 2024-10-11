'use strict';

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

/////////////////////////////DATA STRUCTURING PART ////////////////////////////////////
class WorkoutCl {
  id = (Date.now() + '').slice(-10);
  #date = new Date();
  constructor(coords, distance, duration) {
    this.distance = distance;
    this.duration = duration;
    this.coords = coords;
  }

  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    // prettier-ignore
    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${months[this.#date.getMonth()]} ${this.#date.getDate()}`;
  }
}

class RunningCl extends WorkoutCl {
  type = 'running';
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this._setDescription();
  }

  calcPace() {
    this.pace = this.duration / this.distance;
    return this.Pace;
  }
}

class CyclingCl extends WorkoutCl {
  type = 'cycling';
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
    this._setDescription();
  }

  calcSpeed() {
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}
//////////////////////////// MAIN CLASS PART /////////////////////////////////////////

class App {
  #map;
  #mapZoomLevel = 13;
  #mapEvent;
  #workOuts;

  constructor() {
    this.#workOuts = [];
    this._getPosition();
    this._getLocalStorage();
    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleElevationField);
    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('workouts'));
    if (!data) return;
    this.#workOuts = data;
    this.#workOuts.forEach(element => {
      this._renderWorkout(element);
    });
  }

  _moveToPopup(e) {
    const workoutSelected = e.target.closest('.workout');
    if (workoutSelected === null) return;
    const workoutId = workoutSelected.dataset.id;

    const workoutFinded = this.#workOuts.find(wk => wk.id === workoutId);
    this.#map.setView(workoutFinded.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 3,
      },
    });
  }
  _getPosition() {
    if (navigator.geolocation) {
      console.log(navigator.geolocation);
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert('No se puede acceder a su ubicación');
        }
      );
    }
  }

  _loadMap(position) {
    const { latitude, longitude } = position.coords;
    position = [latitude, longitude];
    this.#map = L.map('map').setView(position, this.#mapZoomLevel);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    //Put a new trigger event when the user clicks on the map
    this.#map.on('click', this._showForm.bind(this));

    this.#workOuts.forEach(work => {
      this._renderWorkoutMarker(work);
    });
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    const validInputs = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp));

    const allPositive = (...inputs) => inputs.every(inp => inp > 0);
    e.preventDefault();
    const { lat, lng } = this.#mapEvent.latlng;
    const coords = [lat, lng];
    // get data from the form
    const type = inputType.value; //Can be running or cycling
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    // check if data is valid
    if (!validInputs(distance, duration) || !allPositive(distance, duration))
      return alert('here  Inputs have to be a positive numbers');
    // Comprobe type of activitie and create new one
    let workOut;
    if (type === 'running') {
      const cadence = +inputCadence.value;

      if (!validInputs(cadence) || !allPositive(cadence))
        return alert('Inputs have to be a positive numbers');

      workOut = new RunningCl(coords, distance, duration, cadence);
    }

    if (type === 'cycling') {
      const elevation = +inputElevation.value;
      if (!validInputs(elevation))
        return alert('Inputs have to be a positive numbers');
      workOut = new CyclingCl(coords, distance, duration, elevation);
    }
    // Add new activitie to the workout array
    this.#workOuts.push(workOut);
    console.log(this.#workOuts);
    // Render workout on map as marker
    this._renderWorkoutMarker(workOut);
    // Render workout on list
    this._renderWorkout(workOut);
    //Hide form and clean imputs fileds
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';
    form.classList.add('hidden');

    this._setLocalStorage();
  }

  _renderWorkoutMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`
      )
      .openPopup();
  }

  _renderWorkout(workout) {
    let html = `
    <li class="workout workout--${workout.type}" data-id="${workout.id}">
      <h2 class="workout__title">${workout.description}</h2>
      <div class="workout__details">
        <span class="workout__icon">
          ${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'}
        </span>
        <span class="workout__value">${workout.distance}</span>
        <span class="workout__unit">km</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">⏱</span>
        <span class="workout__value">${workout.duration}</span>
        <span class="workout__unit">min</span>
      </div>`;

    html += `<div class="workout__details">
      <span class="workout__icon">⚡️</span>
      <span class="workout__value">${
        workout.type === 'running'
          ? workout.pace.toFixed(1)
          : workout.speed.toFixed(1)
      }</span>
      <span class="workout__unit">${
        workout.type === 'running' ? 'MIN/KM' : 'KM/H'
      }</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">${
          workout.type === 'running' ? '🦶🏼' : '🏔'
        }</span>
        <span class="workout__value">${
          workout.type === 'running' ? workout.cadence : workout.elevationGain
        }</span>
        <span class="workout__unit">${
          workout.type === 'running' ? 'SMP' : 'M'
        }</span>
      </div>
    </li>`;

    containerWorkouts.insertAdjacentHTML('beforeend', html);
  }

  _setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.#workOuts));
  }
}

const myApp = new App();
