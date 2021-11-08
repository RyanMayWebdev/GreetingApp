// Make an api call to unsplash for background images that change based on the time of day. Export image to index.js and set background.
const axios = require('axios')
module.exports = {
    photoApp: {
        getPhoto: (timeOfDay) => {
            const apiKey = process.env.unsplashKey;
            return axios.get(`https://api.unsplash.com/photos/random?client_id=${apiKey}&query=${timeOfDay}&content_filter=high&topics=6sMVjTLSkeQ`)
                .then(res => {
                    if (res.status !== 200) {
                        throw new Error(res.status)
                    } else {
                        return res;
                    };
                })
                .catch(err => {
                    console.log(err);
                });
        }

    },

    // Create an api call to a quote api(TBD) and returns the response quote

    quoteApp: {

        getQuote: () => {
            return axios.get(`https://api.quotable.io/random`)
                .then(res => {
                    if (res.status !== 200) {
                        throw new Error(res.status);
                    }else {
                        return res
                    }

                })
                .catch(err => {
                    console.log(err.message);
                });
        }
    },



    // Create openWeather api call function, returns object with current weather, icons, weekly forecast. Takes in location params

    weatherApp: {

        getWeather: (lat, long) => {
            const apiKey = process.env.weatherApiKey;
            const part = ['minutely', 'hourly'];
            return axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=${part}&units=metric&appid=${apiKey}`)
                .then(res => {
                    if (res.status !== 200) {
                        throw new Error(res.status)
                    } else {
                        return res;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },


        getCity: async (lat, long) => {
            const apiKey = process.env.weatherApiKey;
            return axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&appid=${apiKey}`)
                .then(res => {
                    if (res.status !== 200) {
                        throw new Error(res.status);
                    } else {
                        return res;
                    };
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }

}