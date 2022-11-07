const request = require('request')

const forecast = (lat, lon, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=58624d3820bdf2557e754257300eec58&query='+lat+','+lon+'&units=f'

    request({url, json:true},(error, {body}) => {
        if(error){
            callback('Unable to connect to location service',undefined,)
        }else if(body.error){
            callback('Unable to find location',undefined,)
        }else{
            callback(undefined,{
                name: body.location.name 
            })
        }
    })
}

module.exports = forecast