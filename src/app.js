const express = require('express');
const hbs = require('hbs');
const cache = require('../middleware/cacheMiddleware');
const { checkCache } = require('../middleware/cacheMiddleware'); 
const validateLength = require('../middleware/validateLengthMiddleware');
const apiService = require('./APIService');
const path = require('path');

var app = express();
const viewPath = path.join(__dirname, '../public/templates' );
const publicDirrPath = path.join(__dirname, '../public');
const partialsPath = path.join(__dirname, '../public/partials');

app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirrPath));

const Port = process.env.PORT || 8080;

app.get('', (req,res) => {
    res.render('index');
})

app.get('/movieSearch', validateLength, checkCache, async (req,res) => {

    var movieName = req.query.movieName;
    var cachedItem = req.cachedItem;

    // check to see if there is cached search
    if (cachedItem !== undefined) {
        res.render('resultsPage', {
            movieName,
            results: cachedItem
        })
        return;
    }

    apiService.getMovieDetails(movieName).then( (results) =>{
        cache.addItem(movieName, results);
        res.render('resultsPage', {
            movieName,
            results
        });
    }).catch( (err) => {
        console.log(`There was an error fetching movie details : ${err}`)
        res.status(503).send()
    })
})

app.listen(Port, () => {
    cache.startCache();
    console.log(`App listening on port: ${Port}`);
})