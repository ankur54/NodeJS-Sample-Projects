const request = require('request');

const getWeather = (address, callback) => {
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


const forecast = (latitude, longitude, callback) => {
    const url_darksky = `https://api.darksky.net/forecast/50d591c8d45fac167a80e43e64e81eb1/${latitude},${longitude}?units=si`;
    
    request({ url: url_darksky, json: true }, (error, response) => {
        if(error) callback('Connection unavilable !!!', undefined);
        else if(response.body.error) callback('Address unavilable', undefined);
        else callback(undefined, response.body.currently);
    })
}



module.exports = {
    getWeather: getWeather,
    forecast: forecast,
}