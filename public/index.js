
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
app.longitude = -79.7287593;
app.latitude = 43.4718004;
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
    app.getCity();

};

app.failure = (err) => {
    if (err.code === 1) {
        app.greetingEl.innerText = `Error: Location must be enabled in order to provide time and weather data`;
    } else {
        app.greetingEl.innerText = `Error: ${err.code} : ${err.message}`;
    };

};

app.getCity = () => {
    fetch(`/city?lat=${app.latitude}&long=${app.longitude}`)
    .then(res => res.json())
    .then(cityData => {
        app.locationEl.innerText = `${cityData[0].name}, ${cityData[0].country}`;
    })
}


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
    fetch(`/weather?lat=${app.latitude}&long=${app.longitude}`)
    .then(res => res.json())
    .then(data => {
        const {icon, description} = data.current.weather[0];
        const temp = Math.round(data.current.temp);
        const feelsLike = Math.round(data.current.feels_like);
        app.weatherEl.innerHTML = `<img src='https://openweathermap.org/img/wn/${icon}@2x.png' alt='${description}'>${temp}C <span>Feels like: ${feelsLike}C</span>`
    })
};

app.setBackground = () => {
    fetch(`/photo?timeOfDay=${app.timeOfDay}`)
    .then(res => res.json())
    .then(imageData => {
        const url = `${imageData.urls.raw}`
        app.bodyEl.style = `background-image: url(${url}})`;
    });
};

app.displayQuote = () => {
    fetch(`/quote`)
    .then(res => res.json())
    .then(quote => {
        app.quoteEl.querySelector('blockQuote').innerText = quote.data[0].quoteText;
        app.quoteEl.querySelector('figcaption').innerHTML = `<em>- ${quote.data[0].quoteAuthor}</em>`;
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