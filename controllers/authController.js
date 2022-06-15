const {response} = require('express');
const {validationResult} = require('express-validator')
const User =require('../models/UserModel')
var bcrypt = require('bcryptjs');
const {generarJWT} = require('../helpers/jwt')
const createUser = async (req,res = response) => {
  try {
    let usuario = await User.findOne({email:req.body.email})
    if(usuario){
        return res.status(400)
                    .json({ok:false,
                        message:`El usuario con email ${req.body.email} ya existe`})
    }
    const user = new User(req.body)
                    //encripta contraseña
    user.password = await encryptPassword(req.body.password)
    await user.save();
    //generamos el JWT
    const token = await generarJWT(user._id,user.username,user.email)
    res.status(201).json({ok:true,
                        uid:user._id,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        email: user.email,
                        token})
  } catch (error) {
    console.log(error)
    res.status(500).json({ok: false, message:"Por favor hable con el administrador"})
  }
   
}

const loginUser = async (req,res = response) => {
    try {
        VerifyErrors(req,res);
        const {email, password} = req.body
        let user = await User.findOne({email:email})
        if (!user){
            return res.status(400).json({ok:false,
                                        message:`Usuario o contraseña incorrecta`})
        }
        const validPassword = bcrypt.compareSync(password, user.password)
        if (!validPassword){
            return res.status(400).json({ok:false,
                message:`Constraseña no valida`})
        }
        //generamos el JWT
        const token = await generarJWT(user._id,user.username,user.email)

        return res.status(200).json({ok:true,
                                    uid:user._id,
                                    firstname: user.firstname,
                                    lastname: user.lastname,
                                    email: user.email,
                                    token})

    } catch (error) {
        console.log(error)
        res.status(500).json({ok: false, message:"Por favor hable con el administrador"})
    }
}

const renewUser = async (req,res = response) => {
    const uid = req.uid;
    const username = req.username;
    const email = req.email;
    const token = await generarJWT(uid,username,email)
    console.log(username)
    res.json({
        ok:true,
        token
    })
}

const encryptPassword = async (password) =>{
    try {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds)
        return await bcrypt.hash(password, salt)
    } catch (error) {
        console.log(error)
        throw new Error("No se puso encriptar")
    }
    
}
const VerifyErrors = (req,res) => {
    const error = validationResult(req);
    if (!error.isEmpty()){
        return res.status(400).json({
            ok:false,
            errors:error.mapped()
        })
    }
}

module.exports = {
    createUser,
    loginUser,
    renewUser
}