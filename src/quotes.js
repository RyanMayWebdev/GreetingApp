// Create an api call to a quote api(TBD) and returns the response quote

const quoteApp = {};

quoteApp.getQuote = () => {
    return fetch(`https://quote-garden.herokuapp.com/api/v3/quotes/random?genre=inspirational`)
    .then(res => {
        if(!res.ok){
            throw new Error(res.status);
        }else {
            return res.json();
        };
    })
    .then(resJson => resJson)
    .catch(err => {
        console.log(err.message);
    });
};

export default quoteApp;