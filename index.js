const express = require('express');
const app = express();

let topMovies = [
  {
    title: 'Donnie Darko',
    director: 'Richard Kelly'
  },
  {
    title: 'Pulp Fiction',
    director: 'Quentin Tarantino'
  },
  {
    title: 'Lost in Translation',
    director: 'Sofia Coppola'
  },
  {
    title: 'City of God',
    director: 'Fernando Meirelles & Kátia Lund'
  },
  {
    title: 'Trainspotting',
    director: 'Danny Boyle'
  },
  {
    title: 'Isle of Dogs',
    director: 'Wes Anderson'
  },
  {
    title: 'Matthias & Maxime',
    director: 'Xavier Dolan'
  },
  {
    title: 'Triangle of Sadness',
    director: 'Ruben Östlund'
  },
  {
    title: 'The Worst Person in the World',
    director: 'Joachim Trier'
  },
  {
    title: 'Call Me By Your Name',
    director: 'Luca Guadagnino'
  }
];

// GET requests
app.get('/', (req, res) => {
  res.send('Welcome to Indiflix!');
});

app.get('/documentation', (req, res) => {                  
  res.sendFile('public/documentation.html', { root: __dirname });
});

app.get('/movies', (req, res) => {
  res.json(topMovies);
});


// listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
