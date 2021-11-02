// Make an api call to unsplash for background images that change based on the time of day. Export image to index.js and set background.

const photoApp = {};

photoApp.apiKey = 'Ohc2cXIF6UAutFjsJzYJvBMeiBfhL90g9GWj--8CokU'

photoApp.getPhoto = (timeOfDay) => {
    return fetch(`https://api.unsplash.com/photos/random?client_id=${photoApp.apiKey}&query=${timeOfDay}&content_filter=high&topics=6sMVjTLSkeQ`)
    .then(res => {
        if (!res.ok) {
            throw new Error(res.status)
        }else {
            return res.json();
        };
    })
    .then (resJson => resJson)
    .catch(err => {
        console.log(err);
    });
};

export default photoApp;