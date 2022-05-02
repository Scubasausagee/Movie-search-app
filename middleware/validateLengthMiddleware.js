const validateLength = (req,res,next) => {
    const movieName = req.query.movieName;

    if(movieName.length < 3) {
        res.status(400).send();
        return;
    }
    return next();
}

module.exports = validateLength;