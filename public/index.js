const app = {};

// Set variables for page elements and some default values.
app.bodyEl = document.querySelector('body');
app.overlayEL = document.querySelector('.overlay');
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

// Successful aquiring of location data, run weather and city functions
app.geoSuccess = (pos) => {
    let coords = pos.coords;
    app.latitude = coords.latitude;
    app.longitude = coords.longitude;
    app.weatherChange();
    app.getCity();

};

// If user denies location request run this function to tell them what functions will not work
app.failure = (err) => {
    if (err.code === 1) {
        app.greetingEl.innerText = `Error: Location must be enabled in order to provide time and weather data`;
    } else {
        app.greetingEl.innerText = `Error: ${err.code} : ${err.message}`;
    };

};

// Get city from server api call
app.getCity = () => {
    fetch(`/city?lat=${app.latitude}&long=${app.longitude}`)
        .then(res => res.json())
        .then(cityData => {
            app.locationEl.innerText = `${cityData[0].name}, ${cityData[0].country}`;
        })
}

// Get current time, and update every minute
app.getTime = () => {
    // clear previous timer
    clearInterval(app.intervalID);
    const options = {
        hour: '2-digit',
        minute: '2-digit'
    };
    const date = new Date();
    const time = date.toLocaleTimeString('en-us', options)
    app.timeEl.innerText = time;

    // Check what time of day it is an display in greeting.
    if (time.includes('PM') && parseInt(time) < 6 || time.includes('PM') && parseInt(time) === 12) {
        app.timeOfDay = 'Afternoon';
        app.greetingEl.innerText = "Good Afternoon"
    } else if (time.includes('PM')) {
        app.timeOfDay = 'Evening';
        app.greetingEl.innerText = 'Good Evening';
    } else {
        app.timeOfDay = 'Morning';
        app.greetingEl.innerText = 'Good morning';
    };
    // Wait 1 minute and then get time again to update clock.
    setTimeout(() => app.getTime(), 60000);
};

// Request and display whether data from server
app.weatherChange = () => {
    fetch(`/weather?lat=${app.latitude}&long=${app.longitude}`)
        .then(res => res.json())
        .then(data => {
            // Parse through weather data returned from server
            const {
                icon,
                description
            } = data.current.weather[0];
            const temp = Math.round(data.current.temp);
            const feelsLike = Math.round(data.current.feels_like);
            // Create modal for weekly forecast
            const weatherModal = document.createElement('div');
            weatherModal.className = 'weatherModal hidden';
            weatherModal.innerHTML = `
                <div class="currentForecast">
                    <h2>Current:</h2>
                    <img src='https://openweathermap.org/img/wn/${icon}@2x.png' alt='${description}'>
                    <h3>${temp}C</h3>
                    <h3>Feels Like: ${feelsLike}</h3>
                </div>
                <h2>Next 7 Days</h2>
                `


            const weatherList = document.createElement('ul');
            weatherList.className = 'weatherList';

            data.daily.forEach((day, index) => {
                // Skip first day as it is the current day and has already been displayed
                if (index != 0) {
                    const weatherItem = document.createElement('li')
                    weatherItem.innerHTML =
                        `<img src='https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png' alt='${day.weather[0].description}'</img>
                         <h3>${Math.round(day.temp.day)}C</h3>`;
                    weatherList.append(weatherItem);
                };

            });

            weatherModal.append(weatherList);
            app.overlayEL.append(weatherModal);
            app.weatherEl.innerHTML = `
                <img src='https://openweathermap.org/img/wn/${icon}@2x.png' alt='${description}'>
                <h2>${temp}C</h2>
                <button id="showModal"><i class="fas fa-sort-down"></i></button>`;
            app.showWeeklyForecast();
        });


};

app.showWeeklyForecast = () => {
    const showModalButton = document.querySelector('#showModal');
    showModalButton.addEventListener('click', () => {
        const weatherDetails = document.querySelector('.weatherModal');
        weatherDetails.classList.toggle('hidden');
    });
};

// Retreive background image from unsplash api call on server, set the app background to this image.
app.setBackground = () => {
    fetch(`/photo?timeOfDay=${app.timeOfDay}`)
        .then(res => res.json())
        .then(imageData => {
            console.log(imageData)
            const url = `${imageData.urls.raw}`
            app.bodyEl.style = `background-image: url(${url}})`;

            const location = imageData.location.title ? `<p>${imageData.location.title}</p>` : '';
            const footer = document.querySelector('footer');
            footer.innerHTML = `
                <a href='${imageData.links.html}'>${imageData.user.name}</a>
                ${location}`;
        });
};

// Get a quote from the server and display it on the app
app.displayQuote = () => {
    console.log('getting quote')
    fetch(`/quote`)
        .then(res => res.json())
        .then(quote => {
            if (quote.data[0].quoteText.length < 100) {
                app.quoteEl.querySelector('blockQuote').innerText = quote.data[0].quoteText;
                app.quoteEl.querySelector('figcaption').innerHTML = `<em>- ${quote.data[0].quoteAuthor}</em>`;
            }else {
                app.displayQuote();
            };

        })
}

app.init = () => {
    app.displayQuote();
    app.getTime();
    app.setBackground();
    navigator.geolocation.getCurrentPosition(app.geoSuccess, app.failure);
    const seconds = app.date.getSeconds();
    app.timeToWait = (60 - parseInt(seconds)) * 1000;
    setTimeout(() => app.getTime(), app.timeToWait);
};

app.init();