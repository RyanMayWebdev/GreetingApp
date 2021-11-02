import weatherApp from "./weather.js";
import photoApp from "./image.js";
import quoteApp from "./quotes.js";

const app = {};
app.bodyEl = document.querySelector('body');
app.timeEl = document.querySelector('#time');
app.locationEl = document.querySelector('#location');
app.weatherEl = document.querySelector('#weather');
app.greetingEl = document.querySelector('#greeting');
app.quoteEl = document.querySelector('#quote');
app.date = new Date();
app.intervalID = '';
app.timeToWait = 60000;
app.longitude = 43.65;
app.latitude = -79.38;
app.timeOfDay = 'morning';

// Import modules for weather and quote
// Get users location
// Use location for time and weather
// set background depending on time of day
// Display results to page

app.geoSuccess = (pos) => {
    let coords = pos.coords;
    app.latitude = coords.latitude;
    app.longitude = coords.longitude;
    app.weatherChange();
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
    if (time.includes('PM') && parseInt(time) < 6 || parseInt(time) === 12) {
        app.timeOfDay = 'Afternoon';
        app.greetingEl.innerText = "Good Afternoon"
    } else if (time.includes('PM')) {
        app.timeOfDay = 'Evening';
        app.greetingEl.innerText = 'Good Evening';
    } else {
        app.timeOfDay = 'Morning';
        app.greetingEl.innerText = 'Good morning';
    };
    app.intervalID = setInterval(() => app.getTime(), 60000);
};

app.weatherChange = () => {
    weatherApp.getWeather(app.latitude, app.longitude)
    .then(weatherData => {
        const {icon, description} = weatherData.current.weather[0];
        const temp = Math.round(weatherData.current.temp);
        const feelsLike = Math.round(weatherData.current.feels_like);
        app.weatherEl.innerHTML = `<img src='https://openweathermap.org/img/wn/${icon}@2x.png' alt='${description}'>${temp}C <span>Feels like: ${feelsLike}C</span>`
    })
};

app.setBackground = () => {
    const width = screen.width;
    const height = screen.height;
    photoApp.getPhoto(app.timeOfDay)
    .then(imageData => {
        const url = `${imageData.urls.raw}`
        console.log('running image request')
        app.bodyEl.style = `background: url(${url}})`;
    });
};

app.displayQuote = () => {
    quoteApp.getQuote()
    .then(quote => {
        console.log(quote )
        app.quoteEl.querySelector('blockQuote').innerText = quote.data[0].quoteText;
        app.quoteEl.querySelector('figcaption').innerText = `- ${quote.data[0].quoteAuthor}`;
    })
}

app.init = () => {
    app.displayQuote();
    app.getTime();
    app.setBackground();
    navigator.geolocation.getCurrentPosition(app.geoSuccess, app.failure);
    const seconds = app.date.getSeconds();
    app.timeToWait = (60 - parseInt(seconds)) * 1000;
    setTimeout(() => app.getTime(),app.timeToWait);
};

app.init();