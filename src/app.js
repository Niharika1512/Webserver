const path = require('path')
const express = require('express')
const hbs = require('hbs');
const geoCode = require('./geoCode');
const foreCast = require('./foreCast');

const app = express(); // create new instance of the appication, Creates an Express application

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location, hbs used for dynamic templates
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath);


//setup static directory to serve
app.use(express.static(publicDirectoryPath)) // configuring to serve html webpages
app.get('', (req, res) => {
  res.render('index', { title: 'Weather app', name: 'Niharika' })
})

app.get('/about', (req, res) => {
  res.render('about', { title: 'About app', name: 'Niharika' })
})

app.get('/help', (req, res) => {
  res.render('help', { title: 'Help is given here', name: 'Niharika' })
})

app.get('/help/*', (req, res) => {
  res.render('404', { title: 'Error', name: 'Niharika', errorMessage: 'Help page not served' })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({ error: 'Please provide an address' })
  }
  geoCode(req.query.address, (error, { latitude, longitude, placeName } = {}) => {
    if (error) {
      return res.send({ error })
    }
    foreCast(latitude, longitude, (error, { temperature, weather_descriptions } = {}) => {
      // providing default parameters so that destructuring undefined does not give the error
      if (error) {
        return res.send({ error })
      }
      res.send({ title: 'Weather loc', address: req.query.address, temperature: temperature, description: weather_descriptions[0], latitude, longitude, placeName })
    })
  })
})

app.get('/*', (req, res) => { // should be at last
  res.render('404', { title: 'Error', name: 'Niharika', errorMessage: 'Page not found' })
})

/*
app.get('', (req, res) => {
  // response is send back to the requester
  res.send('<h1>Hello Express</h1>')// send to the requester
})

app.get('/help', (req, res) => {
  // response is send back to the requester
  res.send({ name: 'Weather app', code: 10 })// send to the requester
})

app.get('/about', (req, res) => {
  res.send([{ name: 'Niharika' }, { name: 'Hasina' }])
})

app.get('/weather', (req, res) => {
  res.send({ forecast: 'Humid', place: 'Patna' }) // automatically stringified to json
})
*/

/*
app.com
app.com/home
app.com/about
*/

app.listen(3000, () => {
  console.log('Server started') // setting up the server is async process, now the server will be up and running until terminated
})