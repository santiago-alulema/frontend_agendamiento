const mongoose = require('mongoose')
require('dotenv').config();
const dbConeccion = async () =>{
    try {
        console.log("first")
        await mongoose.connect(
            process.env.DB_CONNECTION,
            {useNewUrlParser: true,
            useUnifiedTopology:true
            });
        console.log("Database Corriendo")
    } catch (error) {
        console.log(error)
        throw new Error("error al inicializar DB")
    }
}

module.exports = {dbConeccion}