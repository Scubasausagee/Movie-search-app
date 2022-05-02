const validateLength = (req,res,next) => {
    const movieName = req.query.movieName;

    // check if the input is 2 or less letters
    if(movieName.length < 3) {
        res.status(400).send('Please enter atleast 3 letters in order to search');
        return;
    }
    return next();
}

module.exports = validateLength;