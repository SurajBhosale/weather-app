const request = require('request')

const forecast = (lat, lon, callback) => {
    const url = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&cnt=1&units=metric&APPID=2dd976811fbe7a978da8ea05744b52b3'
    
    request({url, json: true}, (error, { body }) => {
        if (error){  
            callback('Unable to coonect,check connection and retry',undefined)
        } else if (body.cod!=="200"){
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, [body.list[0].main.temp + '°C.', 'RealFeel: '+ body.list[0].main.feels_like]) 
        }
    })
}

module.exports = forecast