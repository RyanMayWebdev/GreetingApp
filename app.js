const express = require('express');
const app = express();
const port = 3000;
const calls = require(`./public/src/apiCalls.js`);
app.use(express.static(__dirname + '/public/'));


app.get('/',(req,res) => {
    res.sendFile('index.html',{root:__dirname + '/public/'}, (err)=> {
        if (err) {
            console.log(err);
        }else {
            console.log('file sent successfully');
        };
    });
});

app.get('/weather', (req,res) => {
    calls.weatherApp.getWeather(req.query.lat,req.query.long)
    .then(results => res.send(results.data))
});

app.get('/city', (req,res) => {
    calls.weatherApp.getCity(req.query.lat,req.query.long)
    .then(results => res.send(results.data))
});

app.get('/photo', (req,res) => {
    calls.photoApp.getPhoto(req.query.timeOfDay)
    .then(results => res.send(results.data))
});

app.get('/quote', (req,res) => {
    calls.quoteApp.getQuote()
    .then(results => res.send(results.data))
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});