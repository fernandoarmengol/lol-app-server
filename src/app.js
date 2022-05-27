const express = require('express')
const summoner = require('./routes/summoner')
const matches = require('./routes/champion')
const data_generator = require('./scripts/data-generator')
const MongoClient = require("mongodb").MongoClient

const app = express()

//API Riot
const api = "RGAPI-1be70641-21aa-4e8f-95c8-56124c9584db"
exports.api = api

//Base de datos MongoDB
let database;
const url = "mongodb://0.0.0.0:27017"
MongoClient.connect(url, (err, db) => {
    if (err) {
        console.log("No se puede conectar a la base de datos")
        console.log(err)
    } else {
        console.log("Conectado a la base de datos")
        database = db.db("lol")
        //Funcion de busqueda y guardado de partidas
        setInterval(data_generator.intervalFunc, 5000);
    }
})
function getDatabase() {
    return database
}
exports.getDatabase = getDatabase

//API Rest configuracion
app.set('port', process.env.PORT || 3000)
app.get('/', (req, res) => {
    res.json({ message: 'Servidor Activo' })
})

//Rutas de API
app.use('/api', summoner)
app.use('/api', matches)

app.listen(app.get('port'))
console.log('Server on port', app.get('port'))