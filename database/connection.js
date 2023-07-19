const mysql = require('mysql2')

const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    password: process.env.DB_PASS
})

connection.getConnection((err, conn) => {
    if(!err){
        console.log('Je suis connecté')
    }else{
        console.log('ERROR:', err)
    }
})

module.exports = connection;