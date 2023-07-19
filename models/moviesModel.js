const connection = require('../database/connection')

const getAllMovies = (req, res) => {
    connection.query("SELECT * FROM movies", (err, result, fields) => {
        if(!err){
            res.status(200).json({movies: result})
        }else{
            res.status(404).json({message: 'erreur 404'})
        } 
    }) 
}

module.exports = {getAllMovies}