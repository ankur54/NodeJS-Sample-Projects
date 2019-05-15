const request = require('request');

//Method1:
const getWeather1 = (latitude, longitude) => {
    const url_darksky = `https://api.darksky.net/forecast/50d591c8d45fac167a80e43e64e81eb1/${latitude},${longitude}?units=si`;

    request({ url: url_darksky, json: true }, (error, response) => {
        if(error) console.log('Connection unavilable !!!');
        else if(response.body.error) console.log('Address unavilable');
        else console.log(response.body.currently);
    })
}


//Method2:
const getWeather2 = (address, callback) => {
    const url_mapbox = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYW5rdXI1NCIsImEiOiJjanZueXoyN2sxbnNvNDRtZ3llemZvdm0wIn0.awPFitmzBAV8jdS5YifRDw&limit=1`;

    request({ url: url_mapbox, json: true }, (error, response) => {
        if(error) callback('Connection unavilable !!!', undefined);
        else if(response.body.features.length === 0) callback('Address unavilable', undefined);
        else callback(undefined, {
            latitude: response.body.features[0].center[1],
            longitude: response.body.features[0].center[0]
        })
    })
}



module.exports = {
    method1: getWeather1,
    method2: getWeather2
}