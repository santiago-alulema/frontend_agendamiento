const {response}= require('express')
const jwt = require('jsonwebtoken');
const validateJwt = (req,res = response,next) => {
    try {
        const token = req.header('x-token');
        if (!token){
            return res.status(401).json({ok: false, mensaje: 'No hay token en la peticion'})
        }
        const payload = jwt.verify(
            token,
            process.env.SECRET_JWT
        )
        req.uid = payload.uid
        req.username = payload.username
        req.firstname = payload.firstname
        req.lastname = payload.lastname
        req.email = payload.email
        next();
    } catch (error) {
        return res.status(401).json({ok: false, mensaje: 'token no valido'}) 
    }
    

}

module.exports = {validateJwt}