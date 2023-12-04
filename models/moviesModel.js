const connection = require('../database/connection')

/**
 * Perform a SQL query in a promise (that we can await)
 */
const performQuery = (sql) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result, fields) => {
            if (!err) {
                resolve(result)
            } else {
                reject(err)
            }
        });
    });
}

const getMoviesNames = async (req, res) => {
    const ids = req.query.ids.split(',');

    const allNames = []
    for (const movieId of ids) {
        console.log(Date.now() + ": SELECT name FROM movies WHERE id = " + parseInt(movieId))
        const result = await performQuery("SELECT name FROM movies WHERE id = " + parseInt(movieId));
        allNames.push(result[0].name);
    }
    res.status(200).json(allNames)
}


const getMoviesIds = async (req, res) => {
    const names = req.query.names.split(',');

    const allIds = []
    for (const name of names) {
        const sql = "SELECT id FROM movies WHERE name LIKE '%" + name.replaceAll("'", "''") + "%'";
        console.log(Date.now() + ": " + sql)
        const result = await performQuery(sql);
        allIds.push(result[0].id);
    }
    res.status(200).json(allIds)
}

const getAllMovies = async (req, res) => {
    try {
        const movies = await performQuery('SELECT * FROM movies');
        res.status(200).json({ movies })
    } catch (e) {
        console.error('getAllMovies - error ' + e)
        res.status(404).json({ message: 'erreur 404' })
    }
}

module.exports = { getAllMovies, getMoviesNames, getMoviesIds }