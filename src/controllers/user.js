const bcrypt = require("bcrypt-nodejs")
const User = require("../models/user.model")
const jwt = require("../services/jwt")

function signUp(req, res){
    const user = new User()
    const {name_user, lastname, email, password, repeatPassword} = req.body
    user.name_user = name_user
    user.lastname = lastname
    user.email = email
    /*Por default almacenamos el rol y si es un usuario activo o no */
    user.role = "admin"
    user.active = true
    /*Si no existe una de las passwords */
    if(!password || !repeatPassword){
        res.status(404).send({message: "Las contraseñas son obligatorias"})
    }else{
        /*Si las contraseñas no coinciden */
        if(password !== repeatPassword){
            res.status(404).send({message: "Las contraseñas no coinciden"})
        }else{
            bcrypt.hash(password, null, null, (err, hash) =>{
                /*No funcionó la encriptación */
                if (err){
                    res
                        .status(500)
                        .send({message: "Error al encriptar la contraseña"})
                }else{
                    user.password = hash
                    user.save((err, userStored)=>{
                        /*Si el usuario ya existe */
                        if (err){
                            res.status(500).send({message: "El usuario ya existe"})
                        }else{
                            /*Si hay error al crear el usuario */
                            if(!userStored){
                                res.status(404).send({message: "Error al crear el usuario"})
                            }else{
                                /*Si todo está correcto */
                                res.status(200).send({user: userStored})
                            }
                        }
                    })
                }
            })
        }
    }
}

const signIn = (req, res) =>{
    console.log("Login correcto")
    const params = req.body
    const email = params.email.toLowerCase()
    const password = params.password
    User.findOne({email}, (err, userStored) =>{
        if(err){
            res.status(500).send({message: "Error del servidor"})
        }else{
            if(!userStored){
                res.status(404).send({message: "Usuario no encontrado"})
            }else{
                bcrypt.compare(password, userStored.password, (err, check) =>{
                    if(err){
                        res.status(500).send({message: "Error del servidor"})
                    }else if(!check){
                        res.status(404).send({message: "La contraseña es incorrecta"})
                    }else{
                        if(!userStored.active){
                            res
                                .status(200)
                                .send({code: 200, message: "El usuario no se ha activado"})
                        }else{
                            res.status(200).send({
                                accessToken: jwt.createAcessWithToken(userStored),
                                refreshToken: jwt.createRefreshToken(userStored)
                            })
                        }
                    }
                })
            }
        }
    })
}

module.exports = {signUp, signIn}