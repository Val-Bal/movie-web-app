const express = require('express'),
morgan = require('morgan'),
 app = express(),
 bodyParser = require('body-parser'),
 uuid = require ('uuid');
 mongoose = require('mongoose');
 Models = require('./models.js');
 Movies = Models.Movie;
 Users = Models.User;


 app.use(bodyParser.json());

 mongoose.connect('mongodb://localhost:27017/cfDB', { useNewUrlParser: true, useUnifiedTopology: true });

//
app.use(express.static('public'));
app.use(morgan('common'));

/*
let users = [
{
  id: 1,
  name: 'Valeria',
  favoriteMovies: ['Pulp Fiction']
},
{
  id: 2,
  name: 'Isabel',
  favoriteMovies: ['Triangle of Sadness']
}
];

let movies = [
  {
    "Title": "Donnie Darko",
    "Description": "A troubled teenager is plagued by visions of a man in a large rabbit suit who manipulates him to commit a series of crimes, after narrowly escaping a bizarre accident.",
    "Release": "2001",
    "Genre": "Drama, Sci-Fi, Thriller",
    "Director": {
      "Name": "Richard Kelly",
      "Bio": "Richard Kelly is an American film director and screenwriter. He is best known for directing and writing the cult classic Donnie Darko.",
      "Birth Year": "1975"
    },
    "ImageURL": "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/mzzHr6g1yvZ05Mc7hNj3tUdy2bM.jpg",
    "Featured": true
  },
  {
    "Title": "Pulp Fiction",
    "Description": "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    "Release": "1994",
    "Genre": "Crime, Drama",
    "Director": {
      "Name": "Quentin Tarantino",
      "Bio": "Quentin Tarantino is an American film director, screenwriter, producer, and actor. He is known for his nonlinear storytelling, his eclectic soundtracks, and his love of violence and pop culture.",
      "Birth Year": "1963"
    },
    "ImageURL": "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/dM2w364MScsjFf8pfMbaWUcWrR.jpg",
    "Featured": true
  },
  {
    "Title": "Lost in Translation",
    "Description": "A faded movie star and a neglected young woman form an unlikely bond after crossing paths in Tokyo.",
    "Release": "2003",
    "Genre": "Drama",
    "Director": {
      "Name": "Sofia Coppola",
      "Bio": "Sofia Coppola is an American film director, screenwriter, producer, and actress. She is the daughter of Francis Ford Coppola and has directed several critically acclaimed films, including Lost in Translation and The Virgin Suicides.",
      "Birth Year": "1971"
    },
    "ImageURL": "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/5VTN0pR8gcqV3EPUHHfMGnJYN9L.jpg",
    "Featured": false
  },
  {
    "Title": "City of God",
    "Description": "In the poverty-stricken favelas of Rio de Janeiro, two boys grow up in very different ways. One becomes a photographer, while the other becomes a drug dealer.",
    "Release": "2002",
    "Genre": "Crime, Drama",
    "Director": {
      "Name": "Fernando Meirelles",
      "Bio": "Fernando Meirelles is a Brazilian film director and producer. He is best known for his work on City of God and The Constant Gardener.",
      "Birth Year": "1955"
    },
    "ImageURL": "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/2LwTJxo2jDASQTzDlN5SN5wN1YY.jpg",
    "Featured": false
  },
    {
      "Title": "Trainspotting",
      "Description": "A group of heroin addicts in Edinburgh struggle with the banality of their day-to-day lives and their addiction, until a chance to get rich quick presents itself.",
      "Release": "1996",
      "Genre": "Drama",
      "Director": {
        "Name": "Danny Boyle",
        "Bio": "Danny Boyle is an English film director, producer, and screenwriter. He is best known for directing the critically acclaimed films Trainspotting and Slumdog Millionaire.",
        "Birth Year": "1956"
      },
      "ImageURL": "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/mE9iYmdbKFVIjyFMxJjR5wPVVxw.jpg",
      "Featured": false
    },
    {
      "Title": "Isle of Dogs",
      "Description": "In a dystopian future Japan, dogs have been quarantined on an island due to a \"canine flu.\" When a young boy travels to the island in search of his dog, he enlists the help of a pack of mongrel dogs to help him find him.",
      "Release": "2018",
      "Genre": "Animation, Adventure, Comedy",
      "Director": {
        "Name": "Wes Anderson",
        "Bio": "Wes Anderson is an American film director, producer, and screenwriter. He is known for his visually distinctive films, often featuring ensemble casts, quirky characters, and an offbeat sense of humor.",
        "Birth Year": "1969"
      },
      "ImageURL": "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/5YtXsLG9ncjjFyGZjoeMKtHDEss.jpg",
      "Featured": false
    },
    {
      "Title": "Matthias & Maxime",
      "Description": "Two best friends realize their feelings for each other may be more than just platonic as they act in a short film together.",
      "Release": "2019",
      "Genre": "Drama",
      "Director": {
        "Name": "Xavier Dolan",
        "Bio": "Xavier Dolan is a Canadian film director, actor, and screenwriter. He has directed several critically acclaimed films, including I Killed My Mother, Mommy, and Matthias & Maxime.",
        "Birth Year": "1989"
      },
      "ImageURL": "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/yL9tOWeKjx49T0J8jKcWRzFZ7pI.jpg",
      "Featured": false
    },
    {
      "Title": "Triangle of Sadness",
      "Description": "In the world of fashion, a young woman and a male model form an unlikely friendship as they navigate their way through the industry.",
      "Release": "2021",
      "Genre": "Comedy, Drama",
      "Director": {
        "Name": "Ruben Östlund",
        "Bio": "Ruben Östlund is a Swedish film director, screenwriter, and producer. He is known for his satirical and often provocative films, including Force Majeure and The Square.",
        "Birth Year": "1974"
      },
      "ImageURL": "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/7srRgKjTm8HMeWQhT40gdxzmxL1.jpg",
      "Featured": false
    },
    {
      "Title": "The Worst Person in the World",
      "Description": "A young woman struggles to find her place in the world as she navigates a series of relationships.",
      "Release": "2021",
      "Genre": "Drama, Romance",
      "Director": {
        "Name": "Joachim Trier",
        "Bio": "Joachim Trier is a Norwegian film director and screenwriter. He is known for his work on Reprise, Oslo, August 31st, and The Worst Person in the World.",
        "Birth Year": "1974"
      },
      "ImageURL": "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/tx8mGvVB9UJadBbGhwnusLw6v4L.jpg",
      "Featured": false
    },
    {
      "Title": "Call Me By Your Name",
      "Description": "In the summer of 1983, a young man develops a relationship with his father's research assistant while spending the summer in Italy.",
      "Release": "2017",
      "Genre": "Drama, Romance",
      "Director": {
        "Name": "Luca Guadagnino",
        "Bio": "Luca Guadagnino is an Italian film director, producer, and screenwriter. He is known for his visually stunning films, including I Am Love, Call Me By Your Name, and Suspiria.",
        "Birth Year": "1971"
      },
      "ImageURL": "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/kjACRkOoZkLHRDpKj5CIlLdLjyz.jpg",
      "Featured": false
    }
  ];
*/

/*
/// OLD REQUESTS
///////       READ = get      ///////
app.get('/movies', (req, res) => {
  res.status(200).json(movies);
})

// READ 
app.get('/users', (req, res) => {
  res.status(200).json(users);
})

// READ
app.get('/movies/:title', (req, res) => {
  const { title } = req.params;
  const movie = movies.find( movie => movie.Title === title );

  if (movie) {
    return res.status(200).json(movie);
  } else {
    res.status(400).send('no such movie')
  }

})



// READ
app.get('/movies/genre/:genreName', (req, res) => {
  const { genreName } = req.params;
  const genre = movies.find( movie => movie.Genre === genreName ).Genre;

  if (genre) {
    return res.status(200).json(genre);
  } else {
    res.status(400).send('no such genre')
  }

})

// READ 
app.get('/movies/directors/:directorName', (req, res) => {
  const { directorName } = req.params;
  const director = movies.find( movie => movie.Director.Name === directorName ).Director;

  if (director) {
    return res.status(200).json(director);
  } else {
    res.status(400).send('no such director')
  }

})

///////       CREATE = post      ///////
// CREATE 
app.post('/users', (req, res) => {
  const newUser = req.body;

  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser);
  } else {
    res.status(400).send('users need names')
  }
})

// CREATE 
app.post('/users/:id/:movieTitle', (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find( user => user.id == id );

  if (user) {
    user.favoriteMovies.push(movieTitle);
    res.status(200).send(`${movieTitle} has been added to user ${id}'s array`);
  } else {
    res.status(400).send('no such movie')
  }
})

 ///////       UPDATE = put      ///////
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  let user = users.find( user => user.id == id );

  if (user) {
    user.name = updatedUser.name;
    res.status(200).json(user);
  } else {
    res.status(400).send('user not found')
  }
})


 ///////       DELETE = delete      ///////
app.delete('/users/:id/:movieTitle', (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find( user => user.id == id );

  if (user) {
    user.favoriteMovies = user.favoriteMovies.filter( title => title !== movieTitle )
    res.status(200).send(`${movieTitle} has been removed from user ${id}'s array`);
  } else {
    res.status(400).send('no such movie')
  }
})


// DELETE 
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;

  let user = users.find( user => user.id == id );

  if (user) {
    users = users.filter( user => user.id != id )
    res.status(200).send(`user ${id} has been deleted`);
  } else {
    res.status(400).send('no such user')
  }
})

*/

// REQUEST with MONGODB
// 1.READ (GET all movies)
app.get("/movies", (req, res) => {
  Movies.find()
  .then((movies) => {
      res.status(201).json(movies);   
})
  .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
  });
});


// 3.READ (GET genre by name)
app.get("/genre/:Name", (req, res) => {
  Genres.findOne({ Name: req.params.Name })
  .then((genre) => {
      res.json(genre.Description);
  })
  .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
  });
});

 // 4.READ (GET director by name)
 app.get("/directors/:Name", (req, res) => {
  Directors.findOne({ Name: req.params.Name })
  .then((director) => {
      res.json(director);
  })
  .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
  });
});


// 5.CREATE a new user
app.post("/users", (req, res) => {
  Users.findOne({ Username: req.body.Username })
  .then((user) => {
      if(user) {
          return res.status(400).send(req.body.Username + " already exists");
      }else {
      Users.create({
          Username: req.body.Username,
          Password: req.body.Password,
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

// 6.UPDATE user info
app.put("/users/:Username", (req, res) => {
  Users.findOneAndUpdate(
   { Username: req.params.Username },
   {
       $set: {
           Username: req.body.Username,
           Password: req.body.Password,
           Email: req.body.Email,
           Birth: req.body.Birth,
       },
   },
   { new: true }, 
   (err, updatedUser) => {
       if (err) {
           console.error(err);
           res.status(500).send("Error: " + err);
       } else {
           res.json(updatedUser);
       }
   }
  );
});

// 7.UPDATE favourite movie 
app.post("/users/:Username/movies/:Title", (req, res) => {
  Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
          $push: { FavoriteMovies: req.params.Title }
      },
      { new: true }, 
      (err, updatedUser) => {
          if (err) {
              console.error(err);
              res.status(500).send("Error: " + err);
          } else {
              res.status(200).json(updatedUser);
          }
      }
  );
});

// 8.DELETE movies from users favorite movies
app.delete("/users/:Username", (req, res) => {
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

// 9.DELETE user 
app.delete("/users/:Username", passport.authenticate("jwt", { session: false }), (req, res) => {
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


//READ (GET movie by title)
app.get("/movies/:Title", (req, res) => {
  Movies.findOne({ Title: req.params.Title })
  .then((movies) => {
       res.json(movie);
  })
  .catch((err) => {
   console.error(err);
   res.status(500).send("Error: " + err);
  });
});


// READ (GET all users)
app.get("/users", function(req, res) {
  Users.find()
  .then(function (users) {
      res.status(201).json(users);
  })
  .catch(function (err) {
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
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});

