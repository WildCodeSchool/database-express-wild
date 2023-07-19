const express = require('express')
const router = express.Router()
const connection = require('../database/connection')
const { faker } = require('@faker-js/faker');
const moviesModel = require('../models/moviesModel')

router.get('/seed', (req, res) => {
    for (let index = 0; index < 10; index++) {
        const director = faker.person.fullName();
        const title = faker.lorem.words(3)
        const year = faker.number.int({ min: 1980, max: 1990 })
        const color = faker.number.int(6)
        const duration = faker.number.int({ min: 120, max: 190 })
        connection.query(`INSERT INTO movies (title, director, year, color, duration) value ('${title}', '${director}', '${year}', '${color}', '${duration}')`, (err, result, fields) => {
            if(!err){
                console.log(result)
            }else{
                console.log(err)
            }
        })
    }
})

router.get('/', moviesModel.getAllMovies)

router.get('/:id', (req, res) => {
    connection.query("SELECT * FROM movies where id = ?", [req.params.id] , (err, result, fields) => {
        if(!err){
            res.status(200).json({movie: result})
        }else{
            res.status(404).json({message: 'erreur 404'})
        } 
    }) 
})

router.post('/', (req, res) => {
    const {title, director, year, color, duration} = req.body
    const durationToInt = parseInt(duration)
    connection.query(`INSERT INTO movies (title, director, year, color, duration) value ('${title}', '${director}', '${year}', '${color}', '${durationToInt}')`, (err, result, fields) => {
        if(!err){
            res.status(200).json({movie: result})
        }else{
            console.log(err)
            res.status(500).json({message: 'Erreur serveur'})
        }
    })
})

router.put('/:id', (req, res) => {
    connection.query("UPDATE movies SET year = ?", req.body.year, (err, result, fields) => {
        if (err) throw err
        res.json({message: result})
    })
})

router.delete('/:id', (req, res) => {
    connection.query("DELETE FROM movies where id = ?", parseInt(req.params.id) , (err, result, fields) => {
        if(!err){
            res.json(result)
        }else{
            throw err
        }
    })
})  


module.exports = router