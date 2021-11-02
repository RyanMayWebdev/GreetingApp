// Create openWeather api call function, returns object with current weather, icons, weekly forecast. Takes in location params

const weatherApp = {};
weatherApp.apiKey = '127a987ea62107eb4435622c8dcf03fe';


weatherApp.getWeather = (lat,long)  => {
    const part = ['minutely','hourly'];
    return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=${part}&units=metric&appid=${weatherApp.apiKey}`)
    .then( res => {
        if (!res.ok) {
            throw new Error(res.status)
        } else {
            return res.json();
        }
    })
    .then(resJson => resJson)
    .catch(err => {
        console.log(err);
    });
};

weatherApp.getCity = async (lat,long) => {
    return fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&appid=${weatherApp.apiKey}`)
    .then( res => {
        if (!res.ok) {
            throw new Error(res.status);
        } else {
            return res.json();
        };
    })
    .then( resJson => resJson
    )
    .catch(err => {
        console.log(err);
    });
};

export default weatherApp;