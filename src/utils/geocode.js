const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYmhvc2FsZXN1cmFqIiwiYSI6ImNrYjdmcTRrajA1OW0ydXA1cXEycXBlcm4ifQ.iUYspblYdbBX2F0ufMAUrA&limit=1'

    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to location services!',undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        }else {
            callback(undefined, {
                lat: response.body.features[0].center[1],
                lon: response.body.features[0].center[0],
                loc: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode