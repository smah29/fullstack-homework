const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 5001;

// Use Pug as the templating engine
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

// REST Countries URL
const url = 'https://restcountries.com/v3.1/all';
let countries = [];

// Add your code here
axios
  .get(url)
  .then((res) => {
    if (res.data) {
      res.data.forEach((data) => {
        country = {};
        country.name = data.name.common;
        country.capital = data.capital;
        country.population = data.population;
        country.region = data.region;
        countries.push(country);
      });
    }
  })
  .catch((error) => {
    console.log(error);
  });

app.get('/', (req, res) => {
  // render pug template for the index.html file

  res.render('index', {
    heading: 'Countries of the World',
    main: 'Welcome to this application. Using the REST Countries API, we will be showing the countries and capitals of the world, the most populous countries in the world, and the number of countries in each region of the world',
  });
});

app.get('/capitals', (req, res) => {
  // map the output array to create an array with country names and capitals
  // check for empty data in the output array

  let results = [];
  countries.forEach((country) => {
    let capital = country.capital === '' ? 'no data' : country.capital;
    let result = `${country.name} - ${capital}`;
    results.push(result);
  });

  let countriesSortedByName = results.sort((a, b) => a.localeCompare(b));

  res.render('page', {
    heading: 'Countries and Capitals',
    results: countriesSortedByName,
  });
});

const FIFTY_MILLION = "50000000";
const nf = new Intl.NumberFormat('en-US');

app.get('/populous', (req, res) => {
  // filter the output array for the countries with population of 50 million or more
  // sort the resulting array to show the results in order of population
  // map the resulting array into a new array with the country name and formatted population

  let populous = countries.filter(country => country.population >= FIFTY_MILLION);
  populous = populous.sort((a, b) => (a.population > b.population) ? -1 : 1);
  let results = [];
  populous.forEach((country) => {
    let result = `${country.name} - ${nf.format(country.population)}`;
    results.push(result);
  });
  res.render('page', {
    heading: 'Most Populous Countries',
    results: results,
  });
});

app.get('/regions', (req, res) => {
  // reduce the output array in a resulting object that will feature the numbers of countries in each region
  // disregard empty data from the output array

  let countryCountPerRegion = {};

  countries.forEach((country) => {
    if (country.region !== undefined && country.region !== '') {
      let region = country.region;
      let countryCount = countryCountPerRegion[region];
      if (countryCount === undefined) {
        countryCountPerRegion[region] = 1;
      } else {
        countryCountPerRegion[region] = countryCount + 1;
      }
    }
  });

  let results = [];
  for (const [region, countryCount] of Object.entries(countryCountPerRegion)) {
    let result = `${region} - ${nf.format(countryCount)}`;
    results.push(result);
  }

  res.render('page', {
    heading: 'Regions of the World',
    results: results,
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
