const bent = require('bent')

const api_key = process.env.API_KEY;

const getMovieDetails = async (movieName) => {
    var getRequest = bent(
        `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${movieName}&page=1`,
        'GET',
        'json'
    )

    const results = await getRequest();
    
    const data = await getDetailsForMovies(results)

    return data;
}

const getDetailsForMovies = async (results) => {
    var Movies = new Array;

    const data =results.results;

    for(var i = 0; i < 8; i++) {
        var getRequest = bent(
            `https://api.themoviedb.org/3/movie/${data[i].id}?api_key=${api_key}&append_to_response=videos`,
            'GET',
            'json'
        )

        const r = await getRequest();
        const Links = r.videos.results;
        var trailerLink;
        var playTrailer;

        for (var j = 0; j < Links.length; j++) {
            if (Links[j].type === 'Trailer' && Links[j].official) {
                trailerLink = Links[j].key;
                break;
            }
        }
        playTrailer = 'https://www.youtube.com/embed/' + trailerLink;
        trailerLink = 'https://www.youtube.com/watch?v=' + trailerLink;
        
        Movies.push({
            title: r.original_title,
            description: r.overview,
            releaseDate: r.release_date,
            youTubeTrailer: trailerLink,
            playTrailer,
            rating: r.vote_average
        });       
    }

    return Movies
}

module.exports = {getMovieDetails};