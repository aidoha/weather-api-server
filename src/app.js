const express = require('express');
const path = require('path');
const hbs = require('hbs');
const { geocode } = require('./utils/geocode');
const { forecast } = require('./utils/forecast');

const app = express();

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'Weather App ABOUT',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Weather App HELP',
    text: 'AU MAU Dolbi moi led',
  });
});

app.get('/products', (req, res) => {
  const { query } = req;
  if (!query.search) {
    return res.send({
      error: 'You must provide a search text',
    });
  }
  res.send({
    products: [],
  });
});

app.get('/weather', (req, res) => {
  const { query } = req;
  if (!query.address) {
    return res.send({
      error: 'You must prodive an address',
    });
  }

  geocode(query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(latitude, longitude, (error, data) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast: data,
        location,
        address: query.address,
      });
    });
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    errorMessage: 'Page Not Found',
  });
});

app.listen(3000, () => console.log('Server is up on port 3000.'));
