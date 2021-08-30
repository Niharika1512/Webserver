const request = require('request');

const geoCode = (address, callback) => {
  const url = `http://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibmloYXJpa2ExNTEyIiwiYSI6ImNrczV5ZWs2YTA1b3gyb3JuYm5vcjI0anAifQ.SqRylOal2ITzAgWcLSeU-Q&limit=1`
  request({ url, json: true }, (error, { body: { features } }) => { // deep destructuring
    if (error) {
      callback('Unable to connect', undefined)
    }
    else if (features.length === 0) {
      callback('Unable to fetch the location', undefined)
    }
    else {
      const latitude = features[0].center[1]
      const longitude = features[0].center[0]
      const placeName = features[0].place_name
      callback(undefined, { latitude, longitude, placeName })
    }
  })
}

module.exports = geoCode;