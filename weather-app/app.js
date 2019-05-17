const yargs = require('yargs');

const geocode = require('./util/geocode')

var place = yargs.argv._;
const address = place.slice(1).reduce((accumulator, curr) => accumulator + '%20' + curr, place[0]);

geocode.getWeather(address, (error, data) => {
    if(error) return console.log(error);
    geocode.forecast(data.latitude, data.longitude, (error, forecasteData) => {
        if(error) return console.log(error);
        console.log(forecasteData);
    })
})