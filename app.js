const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()
const {API_VERSION} = require("./config")

const userRoutes = require("./src/routes/userRoute")
const authRoutes = require("./src/routes/auth")
const subjectRoutes = require("./src/routes/subjectRoutes")

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

/*Evitar bloqueo de CORS */
app.use(cors())

/*Creación de los endpoints del proyecto */
app.use(`/api/${API_VERSION}`, userRoutes)
app.use(`/api/${API_VERSION}`, authRoutes)
app.use(`/api/${API_VERSION}`, subjectRoutes)

/*Configuración de los header HTTP */
module.exports = app
