const request = require('request');
const yargs = require('yargs');

const geocode = require('./util/geocode')

var place = yargs.argv._;
const address = place.slice(1).reduce((accumulator, curr) => accumulator + '%20' + curr, place[0]);

//Method 1:
// const weather = (latitude, longitude) => {
//     const url_darksky = `https://api.darksky.net/forecast/50d591c8d45fac167a80e43e64e81eb1/${latitude},${longitude}?units=si`;

//     request({ url: url_darksky, json: true }, (error, response) => {
//         if(error) console.log('Connection unavilable !!!');
//         else if(response.body.error) console.log('Address unavilable');
//         else console.log(response.body.currently);
//     })
// }


// const getWeather = address => {
//     const url_mapbox = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYW5rdXI1NCIsImEiOiJjanZueXoyN2sxbnNvNDRtZ3llemZvdm0wIn0.awPFitmzBAV8jdS5YifRDw&limit=1`;

//     request({url: url_mapbox, json: true}, (error, response) => {
//         if(error) console.log('Connection unavilable !!!');
//         else if(response.body.error) console.log('Address unavilable');
//         else {
//             const latitude = response.body.features[0].center[1];
//             const longitude = response.body.features[0].center[0];
//             weather(latitude, longitude);
//         }
//     });
// }

// getWeather(address);


//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//Method 2:
const geocode = (address, callback) => {
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


const getWeather = address => {
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


getWeather(address);

// geocode(address, (error, data) => {
//     if (error) console.log(error);
//     else console.log(data);
// });