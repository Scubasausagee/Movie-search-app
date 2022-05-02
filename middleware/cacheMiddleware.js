const cacheModule = require('node-cache');

var cache = null;
const cache_ttl = process.env.CACHE_TTL;

const startCache = () => {
    cache = new cacheModule(
        {
            stdTTL: cache_ttl ,
            checkperiod: 80,
            useClones: false 
        }
    )
    cache.flushAll();
}

const addItem = (key, value) => {
    return cache.set(key, value);
}

const checkCache = (req, res, next) => {
    try {
        const movieName = req.query.movieName;
        var item = cache.get(movieName)

        if (item !== undefined) {
            cache.ttl(movieName, cache_ttl);
            req.cachedItem = item;
            return next();
        }

        req.cachedItem = undefined;
        return next();
    } catch (err) {
        console.log(`Error occured: ${{err}}`);
        res.status(503).send(err);
    }
}

module.exports = {
    startCache,
    checkCache,
    addItem
}