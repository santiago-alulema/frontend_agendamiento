const jwt = require('jsonwebtoken');
require('dotenv').config();
const generarJWT = (uid, username, email,firstname,lastname) =>{
    return new Promise((resolve, reject) => {
        const payload = {uid,username,email,firstname,lastname}
        jwt.sign(payload,process.env.SECRET_JWT,{
            expiresIn:'2h'
        },(err, token) =>{
            if (err) {
                console.log(err);
                reject("No se pudo generar el token");
            }
            resolve(token);
        })
    })
}

module.exports = {
    generarJWT
}