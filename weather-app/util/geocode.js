const request = require('request');

//Method1:
const weather = (latitude, longitude) => {
    const url_darksky = `https://api.darksky.net/forecast/50d591c8d45fac167a80e43e64e81eb1/${latitude},${longitude}?units=si`;

    request({ url: url_darksky, json: true }, (error, response) => {
        if(error) console.log('Connection unavilable !!!');
        else if(response.body.error) console.log('Address unavilable');
        else console.log(response.body.currently);
    })
}


//Method2:
const getWeather2 = address => {
    geocode(address, (error, data) => {
        if(error) console.log(error);
        else {
            const url_darksky = `https://api.darksky.net/forecast/50d591c8d45fac167a80e43e64e81eb1/${data.latitude},${data.longitude}?units=si`;
            request({ url: url_darksky, json: true }, (error, response) => {
                if(error) console.log('Connection unavilable !!!');
                else if(response.body.error) console.log('Address unavilable');
                else console.log(response.body.currently);
            })
        }
    })
}


module.exports = {
    method1: getWeather1,
    method2: getWeather2
}