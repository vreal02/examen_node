const mysql = require('mysql')
const {promisify} = require('util')
const {database_dev} = require('./keys')

const pool = mysql.createPool(database_dev)

pool.getConnection((err,connection) => {
    if(err){
        console.log('Error al conectar con la base de datos')
    }
    if(connection){
        console.log('Conectado correctamente a la bbdd')
    }
})

pool.query = promisify(pool.query)

module.exports = pool
