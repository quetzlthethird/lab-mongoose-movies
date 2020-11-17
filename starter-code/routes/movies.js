const express = require('express');
const router = express.Router();
const Movies = require('../models/Movie');
const Celebrity = require('../models/Celebrity');
const Movie = require('../models/Movie');


//iteration 8 - adding a new movie
router.get("/movies", (req, res, next) => {
    Movies.find().populate('cast')
    .then(movies => {
      res.render('movies/index', { 
        movies: movies
      })
    })
    .catch(err => next(err))
  })

//iteration 9 - prefilled cast
router.get("/movies/new", (req, res)=> {
    Celebrity.find()
    .then(celebdB => {
        res.render("movies/new", {cast: celebdB} )
    })
    .catch(err => {
        console.log(err);
    });
    // res.render("movies/new")
})

//iteration 9 - create a movie w/ cast array reference
router.post("/movies", (req, res) => {
    const { title,genre, plot, cast } = req.body;
    Movie.create({
        title,
        genre,
        plot,
        cast
    })
    .then(movie => {
      console.log(`${movie.name} was added to the database`);
      res.redirect(`/movies/`) 
    })
    .catch(err => {
        console.log("error in adding movie ",err)
      res.redirect("movies/new")
    })
})


//iteration 11 - editing a movie
router.get("/movies/edit/:id", (req, res, next) => {
    console.log('ready to edit')
    const movieID = req.params.id;
    Movie.findById(movieID).populate('cast')
        .then(movies => {
        res.render("movies/edit", { movies })
    })
    .catch(err => next(err))
  })

router.post("/movies/edit/:id", (req, res) => {
    const movieID = req.params.id;
    const { title,genre, plot, cast } = req.body;
    Movie.findByIdAndUpdate(movieID, {
        title, genre, plot, cast
    })
    .then( ( ) => {
      console.log(`${movies.name} was edited`);
      res.redirect(`/movies/`) 
    })
    .catch(err => {
        console.log("error in editing celebrity ",err)
        res.redirect(`/movies/`)
    })
})






module.exports = router; 
