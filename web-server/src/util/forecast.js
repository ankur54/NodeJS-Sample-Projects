const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url_darksky = `https://api.darksky.net/forecast/50d591c8d45fac167a80e43e64e81eb1/${latitude},${longitude}?units=si`;
    
    request({ url: url_darksky, json: true }, (error, response) => {
        if(error) callback('Connection unavilable !!!', undefined);
        else if(response.body.error) callback('Address unavilable', undefined);
        else callback(undefined, response.body.currently);
    })
}


module.exports = forecast;