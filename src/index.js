import weatherApp from "./weather.js";

const app = {};
app.bodyEl = document.querySelector('body');
app.timeEl = document.querySelector('#time');
app.locationEl = document.querySelector('#location');
app.weatherEl = document.querySelector('#weather');
app.greetingEl = document.querySelector('#greeting');
app.date = new Date();
app.intervalID = '';
app.timeToWait = 60000;
app.longitude = 43.65;
app.latitude = -79.38;

// Import modules for weather and quote
// Get users location
// Use location for time and weather
// set background depending on time of day
// Display results to page

app.geoSuccess = (pos) => {
    let coords = pos.coords;
    app.latitude = coords.latitude;
    app.longitude = coords.longitude;
    weatherApp.getWeather(app.latitude, app.longitude);
    weatherApp.getCity(app.latitude, app.longitude)
        .then(cityData => {
            app.locationEl.innerText = `${cityData[0].name}, ${cityData[0].country}`;
        });

};

app.failure = (err) => {
    if (err.code === 1) {
        app.greetingEl.innerText = `Error: Location must be enabled in order to provide time and weather data`;
    } else {
        app.greetingEl.innerText = `Error: ${err.code} : ${err.message}`;
    };

};



app.getTime = () => {
    clearInterval(app.intervalID);
    const options = {
        hour: '2-digit',
        minute: '2-digit'
    };
    const date = new Date();
    const time = date.toLocaleTimeString('en-us', options)

    app.timeEl.innerText = time;
    if (time.includes('PM') && parseInt(time) < 6) {
        app.greetingEl.innerText = "Good Afternoon"
    } else if (time.includes('PM')) {
        app.greetingEl.innerText = 'Good Evening';
    } else {
        app.greetingEl.innerText = 'Good morning';
    };
    app.intervalID = setInterval(() => app.getTime(), 60000);
};

app.init = () => {
    app.getTime();
    navigator.geolocation.getCurrentPosition(app.geoSuccess, app.failure);
    const seconds = app.date.getSeconds();
    app.timeToWait = (60 - parseInt(seconds)) * 1000;
    setTimeout(() => app.getTime(),app.timeToWait);
};

app.init();