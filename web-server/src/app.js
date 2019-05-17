const path = require('path');
const hbs = require('hbs');
const express = require('express');

const forecast = require('./util/forecast');
const geocode = require('./util/geocode');



const app = express();
const dirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../template/views');
const partialPath = path.join(__dirname, '../template/partials');

app.set('view engine', 'hbs'); 
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

app.use(express.static(dirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Home',
        text: 'This is the home page',
        name: 'Ankur Mazumder'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        text: 'This is the help page',
        name: 'Ankur Mazumder'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        text: 'This is the about page',
        name: 'Ankur Mazumder'
    })
})

app.get('/weather', (req, res) => {
    let place = req.query.place;

    if(!place) 
        return res.render('error', {
            title: "404 Error !!!",
            text: 'Pleace enter place name to find forecast for...',
            name: 'Ankur Mazumder'
        })

    place = place.substring(1, place.length - 1);
    const address = place.split(' ').slice(1).reduce((accumulator, curr) => accumulator + '%20' + curr, place[0]);
    
    geocode(address, (error, {latitude, longitude} = {}) => {
        if(error) return res.send({ error });
        
        forecast(latitude, longitude, (error, {summary, temperature, humidity, pressure, windSpeed, cloudCover} = {}) => {
            if(error) return res.send({ error });
            return res.send({ place , summary, temperature, humidity, pressure, windSpeed, cloudCover });
        })
    })
});

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404 Error !!!',
        text: 'Error occured. The help page is unavaible, please try some other address',    
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404 Error !!!',
        text: 'Error occured. The requested page is unavaible, please try some other address',    
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000');
})