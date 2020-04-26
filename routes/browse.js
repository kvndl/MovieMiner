var express = require('express');
var router = express.Router();
// const omdb = require('omdb');

// DB Depends --> moved to Movie model
// const connection = require('../services/sql');

// various spells to get movie info
const Movie = require('../models/Movie');

/* GET browse page. */
router.get('/', async function(req, res, next) {
    await Movie.browseMovies(function(results){

        var moviePosterArray = Movie.putPosters(results);

        res.render('browse', {
            message: 'What are we mining today?',
            someMovies: results,
            somePosters: moviePosterArray
        });    
    });
});

/* GET view a single movie page. */
router.get('/view', async function(req, res, next) {
    var key = req.query.key;
    var poster = await Movie.fetchPoster(key);
    console.log('--- URL found ---');
    console.log(poster);

    await Movie.viewSingleMovie(key, function(results) {

        res.render('viewMovie', {
            theMovie: results,
            moviePoster: poster,
            key: key
        }); 

    });
});

// testing functions
router.get('/test', async function(req, res, next) {
    var poster = await Movie.fetchPoster('tt0371746');
    
    res.render('test', {
        posterURL: poster
    })
})

//helper functions moved to Movie model

module.exports = router;