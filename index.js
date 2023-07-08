const express = require('express'),
morgan = require('morgan'),
 app = express(),
 bodyParser = require('body-parser'),
 uuid = require ('uuid');
const mongoose = require('mongoose');
const Models = require('./models.js');
const { check, validationResult } = require('express-validator');
const Movies = Models.Movie;
const Users = Models.User;

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const cors = require('cors');
app.use(cors());
// let allowedOrigins = ['http://localhost:8080', 'https://indieflix.herokuapp.com'];

// app.use(cors({
//   origin: (origin, callback) => {
//     if(!origin) return callback(null, true);
//     if(allowedOrigins.indexOf(origin) === -1){ // If a specific origin isn’t found on the list of allowed origins
//       let message = 'The CORS policy for this application doesn’t allow access from origin ' + origin;
//       return callback(new Error(message ), false);
//     }
//     return callback(null, true);
//   }
// }));

let auth = require('./auth')(app);

const passport = require('passport');
require('./passport');

mongoose.connect(process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.static('public'));
app.use(morgan('common'));


// REQUEST with MONGODB

// READ (GET all users) --> OK
app.get('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOne({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        return res.status(404).send('Error: ' + req.params.name + ' was not found');
      } else {
        res.json(user);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//old code
// app.get("/users", passport.authenticate('jwt', { session: false }), function(req, res) {
//   Users.find()
//   .then(function (users) {
//       res.status(201).json(users);
//   })
//   .catch(function (err) {
//       console.error(err);
//       res.status(500).send("Error: " + err);
//   });
// });

app.get('/movies', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.find()
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

//READ (GET movie by title) --> 
app.get("/movies/:Title", passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({ Title: req.params.Title })
  .then((movie) => {
       res.json(movie);
  })
  .catch((err) => {
   console.error(err);
   res.status(500).send("Error: " + err);
  });
});

// READ (GET genre by name)
app.get("/movies/genre/:Name", passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({ 'Genre.Name': req.params.Name })
  .then((movie) => {
      res.json(movie.Genre);
  })
  .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
  });
});

 // READ (GET director by name)
 app.get("/movies/directors/:Name", passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({ 'Director.Name': req.params.Name })
  .then((director) => {
      res.json(director);
  })
  .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
  });
});

// CREATE a new user
app.post("/users", 
// Validation logic here for request
  //you can either use a chain of methods like .not().isEmpty()
  //which means "opposite of isEmpty" in plain english "is not empty"
  //or use .isLength({min: 5}) which means
  //minimum value of 5 characters are only allowed
[
  check('Username', 'Username is required').isLength({min: 5}),
  check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
  check('Password', 'Password is required').not().isEmpty(),
  check('Email', 'Email does not appear to be valid').isEmail()
], (req, res) => {
  // check the validation object for errors
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

  let hashedPassword = Users.hashPassword(req.body.Password);
  Users.findOne({ Username: req.body.Username })
  .then((user) => {
      if(user) {
          return res.status(400).send(req.body.Username + " already exists");
      }else {
      Users.create({
          Username: req.body.Username,
          Password: hashedPassword,
          Email: req.body.Email,
          Birthday: req.body.Birthday,
      })
      .then((user) => {
          res.status(201).json(user);
      })
      .catch((err) => {
          console.error(err);
          res.status(500).send("Error: " + err);
      });
      }
  })
  .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
  });
});

// UPDATE user info --> 
app.put("/users/:Username", passport.authenticate('jwt', { session: false }), (req, res) => {
  let hashedPassword = Users.hashPassword(req.body.Password);
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
        $set: {
            Username: req.body.Username,
            Password: hashedPassword,
            Email: req.body.Email,
            Birth: req.body.Birth,
        },
    },
    { new: true }
)
    .then((updatedUser) => {
        res.json(updatedUser);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
    });
});

// CREATE movie from users favorite movies 
// why Post when update?
app.post("/users/:Username/movies/:MoviesID", passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndUpdate ({ Username: req.params.Username }, {
    $push: { FavoriteMovies: req.params.MoviesID }
},{
  new: true
})
      .then((user) => {
          if (!user) {
              res.status(400).json("Not able to add favorite movie");
          } else {
              res.status(200).json(user);
          }
      })
      .catch((err) => {
          console.error(err);
          res.status(500).json("Error: " + err);
  });
});

// DELETE movie from users favorite movies
app.delete("/users/:Username/movies/:MoviesID", passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndUpdate ({ Username: req.params.Username }, {
    $pull: { FavoriteMovies: req.params.MoviesID }
},{
  new: true
})
      .then((user) => {
          if (!user) {
              res.status(400).json(req.params.MoviesID + " was not found");
          } else {
              res.status(200).json(user);
          }
      })
      .catch((err) => {
          console.error(err);
          res.status(500).json("Error: " + err);
  });
});

// DELETE users
app.delete("/users/:Username", passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndRemove ({ Username: req.params.Username })
      .then((user) => {
          if (!user) {
              res.status(400).send(req.params.Username + " was not found");
          } else {
              res.status(200).send(req.params.Username + " was deleted.");
          }
      })
      .catch((err) => {
          console.error(err);
          res.status(500).send("Error: " + err);
      });
});

// GET requests documentation
app.get('/', (req, res) => {
  res.send('Welcome to Indiflix!');
});

app.get('/documentation', (req, res) => {                  
  res.sendFile('public/documentation.html', { root: __dirname });
});

// GET requests index --> does not work yet
app.get('/index', (req, res) => {
    res.sendFile('/index.html', { root: __dirname });
  });

// error-handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Oh, oh, something went wrong!');
  });

// listen for requests
const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0',() => {
 console.log('Listening on Port ' + port);
});

