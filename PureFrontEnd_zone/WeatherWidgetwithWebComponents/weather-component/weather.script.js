class weatherApp extends HTMLElement {
    constructor() {
        super();
        this.currentPosition = undefined;
        this.numberDays = 8;
    }

    connectedCallback() {
        this.shadow = this.attachShadow({ mode: "open" });
        this._obtenerLatitudLongitudActual();
    }


    _obtenerLatitudLongitudActual() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.currentPosition = { latitude: position.coords.latitude, longitude: position.coords.longitude };
                this._getWeatherFromAPI();
            });

        } else {
            console.log('Tu navegador no tiene geolocalización')
        }
    }



    _getWeatherFromAPI() {
        let thisWebComponent = this;
        let XMLRequest = new XMLHttpRequest();
        XMLRequest.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let weatherData = JSON.parse(this.responseText);
                console.log(weatherData.daily);
                thisWebComponent._processData(weatherData)
                thisWebComponent._getHTML();
            }
        }
        XMLRequest.open("GET", `https://api.open-meteo.com/v1/forecast?latitude=${this.currentPosition.latitude}&longitude=${this.currentPosition.longitude}&daily=weathercode&current_weather=true&timezone=Europe%2FLondon&hourly=temperature_2m,relativehumidity_2m,precipitation&past_days=2`);
        XMLRequest.send();
    }


    _processData(weatherData) {
        console.log(weatherData)
        this.weatherNormalizaData = [];
        weatherData.daily.time.forEach((day, index) => {
            const diaEnTexto = this._dameDiaEnTexto(day);
            const tiempoEnTexto = this._dameTiempoEnTexto(weatherData.daily.weathercode[index])
            this.weatherNormalizaData.push({ diaEnTexto, tiempoEnTexto });
        });
        let suma = 0;
        let index = 0;
        for (let i = 0; i < 216; i++) {
            suma += weatherData.hourly.temperature_2m[i];
            if (i !== 0 && (i % 24 === 0) || (i === 215)) {
                this.weatherNormalizaData[index].avgTemperature = (suma / 24).toFixed(2);
                suma = 0;
                index++;
            }
        }

        console.log(this.weatherNormalizaData)


        console.log(this.weatherNormalizaData);
    }


    _getHTML() {
        let XMLRequest = new XMLHttpRequest();
        let thisWebComponent = this;
        XMLRequest.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                thisWebComponent.htmlMarkup = this.responseText;
                thisWebComponent._getCss();
            }
        }
        XMLRequest.open("GET", "weather-component/weather.template.html");
        XMLRequest.send();
    }

    _getCss() {
        let XMLRequest = new XMLHttpRequest();
        let thisWebComponent = this;
        XMLRequest.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                thisWebComponent.cssStyle = this.responseText;
                thisWebComponent._renderComponent();
            }
        }
        XMLRequest.open("GET", "weather-component/weather.style.css");
        XMLRequest.send();
    }

    _renderComponent() {
        this.shadow.innerHTML = `<head><link rel="stylesheet" href="https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css"></head>`
        this.shadow.innerHTML += `<style>${this.cssStyle}</style>`
        this.shadow.innerHTML += this.htmlMarkup;
        let daysCointainer = this.shadow.querySelector('.days-wheather-carrousel');
        daysCointainer.innerHTML = "";
        for (let i = 0; i < this.numberDays; i++) {
            let dayDiv = document.createElement('div');
            dayDiv.classList.add('day-weather');
            let imgContainer = document.createElement('div');
            imgContainer.classList.add('img-container');
            let imgElement = document.createElement('img');
            imgElement.classList.add('img-wheater');
            imgElement.setAttribute('src', "./weather-component/src/" + this.weatherNormalizaData[i].tiempoEnTexto + ".png");
            imgContainer.appendChild(imgElement);
            dayDiv.appendChild(imgContainer);
            let [day, rest] = this.weatherNormalizaData[i].diaEnTexto.split(',');
            dayDiv.insertAdjacentHTML('beforeend', `
                <div class="basic-day-data">
                    <span>${rest}</span>
                    <h3>${day}</h3>
                    <ul>
                        <li>${this.weatherNormalizaData[i].avgTemperature}&deg;</li>
                    </ul>
                </div>`);
            daysCointainer.appendChild(dayDiv);
        }
    }

    _dameDiaEnTexto(dateString) {
        const dias = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
        const fecha = new Date(dateString)
        return dias[fecha.getDay()] + ', ' + dateString.slice(-2) + " de " + fecha.toLocaleString('default', { month: 'long' });
    }

    _dameTiempoEnTexto(codigoTiempo) {
        switch (codigoTiempo) {
            case 0:
                return "sunny";
            case 1:
            case 2:
            case 3:
                return "mainly_clear";
            case 45:
            case 48:
                return "fog";
            case 61:
            case 63:
            case 65:
                return "hardRain";
            default:
                return "Investing"
        }
    }




}

customElements.define('app-weather', weatherApp);