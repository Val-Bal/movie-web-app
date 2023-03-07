const express = require('express'),
morgan = require('morgan');

const app = express();

app.use(express.static('public'));
app.use(morgan('common'));

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

// error-handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Oh, oh, something went wrong!');
  });

// listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
