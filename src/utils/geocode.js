const request = require('request')

const geocode = (address, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=58624d3820bdf2557e754257300eec58&query=' +address
  
    request({url , json:true},(error, {body}) => {
      if(error){
          callback('Unable to connect to location service',undefined)
      }else if(body.error){
          callback('Unable to find location', undefined)
      }else{
          callback(undefined,{
            latitude: body.location.lat,
            longitude: body.location.lon,
            temp: body.current.temperature,
            place: body.request.query,
  
          })
      }
    })
  
  }

  module.exports = geocode