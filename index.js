const express = require('express');
const {dbConeccion} = require('./database/config')
const cors = require('cors')
require('dotenv').config();
//create server express server
const app = express();

//data base 
dbConeccion();

app.set('port',process.env.PORT);

//cors
app.use(cors());

//dir public directory
app.use(express.static('public'));

//Lectura y Parseo del Body
app.use(express.json())

//Routes
app.use('/api/auth', require('./routes/auth'))

//start server express server
app.listen( app.get('port'), () =>{
    console.log(`servidor corriendo en el puerto ${app.get('port')}`)
})
