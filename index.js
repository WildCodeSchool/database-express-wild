const express = require('express')
const app = express()
require('dotenv').config()

const port = process.env.PORT
app.use(express.json())

const movieRouter = require('./routes/movie')
app.use('/movies', movieRouter)

app.get('/', (req, res) => {
    res.json({message: 'ok'})
})

app.listen(port, () => {
    console.log('App listen on localhost:' + port)
})
