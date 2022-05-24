const jwt = require("jwt-simple")
const moment = require("moment")
const SECRET_KEY = "recuva2022"

/*Función para crear el token de acceso */
exports.createAcessWithToken = (user) =>{
    /*En esta parte se trabaja de forma segura, la identidad de un
    determinado usuario con una serie de claims o privilegios.
    Estos privilegiios están codificados en objetos de tipo JSON,
    que se incrustan dentro de un payload o cupoer de mensaje firmando
    de manera digital */
    const payload = {
        id: user._id,
        name: user.name_user,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
        createToken: moment().unix(),
        /*La fecha de expiración del token se ajusta a continuación */
        expiration_date: moment().add(12, "hours").unix(),
    };
    return jwt.encode(payload, SECRET_KEY)
}

/*Función para refrescar el token */
exports.createRefreshToken = (user) =>{
    const payload = {
        id: user._id,
        expiration_date: moment().add(30, "days").unix()
    };
    return jwt.encode(payload, SECRET_KEY)
}

/*Función que descodifica cualquiera de los token */
exports.decodedToken = (token) =>{
    return jwt.decode(token, SECRET_KEY, true)
}