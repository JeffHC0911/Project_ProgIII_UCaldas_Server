const jwt = require("jwt-simple")
const moment = require("moment")
const SECRET_KEY = "recuva2022"

exports.ensureAuth = (req, res, next) =>{
    if(!req.headers.authorization){ 
        res.status(403).send({message: "No está autenticado"})
    }
    /*Se cambia el token a vacio /['"]+/g, ""  */
    const token = req.headers.authorization.replace(/['"]+/g, "");
    try {
        /*Si no se pasa como segundo parámetro en el decode el SECRET_KEY, no decodifica el token */
        var payload = jwt.decode(token, SECRET_KEY)
        /*payload es el token que se va a devolver, no se puede declarar como const o let, debe ser var */
        if (payload.expiration_date <= moment.unix()){ 
            res.status(404).send({message: "El token ha expirado"})
        }
    } catch (error) {
        return res.status(404).send({message: "Token inválido"})
    }
    req.user = payload
    next()
}