const request = require('request');

const foreCast = (latitude, longitude, callback) => {
  // const url = `http://api.weatherstack.com/current?access_key=86e6aad542c7b06c534014e194905d42&query=${latitude},${longitude}&units=f`
  const url = `http://api.weatherstack.com/current?access_key=86e6aad542c7b06c534014e194905d42&query=${latitude},${longitude}`
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect', undefined)
    }
    else if (body.error) {
      callback('Unable to fetch the temperature', undefined)
    }
    else {
      const { temperature, weather_descriptions } = body.current;
      //console.log(`${weather_descriptions[0]}: It is currently ${temperature} out, feels like ${feelslike}`)
      callback(undefined, { temperature, weather_descriptions })
    }
  })
}

module.exports = foreCast;