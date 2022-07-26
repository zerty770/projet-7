/*** Import des modules nécessaires */
const express = require('express')
const mongoose = require("mongoose")
const cors = require('cors')
const path = require('path')


/*****************************/
/*** Initialisation de l'API */
const app = express()

app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: "Origin, X-Requested-With, x-access-token, role, Content, Accept, Content-Type, Authorization"
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


/*** Import des modules de routage */
const postRoutes = require("./routes/post")
const utilisateurRoutes = require("./routes/utilisateur")

/*** Mise en place du routage */
app.get('/', (req, res) => res.send ('bonjour'))

app.use("/images", express.static(path.join(__dirname, "images")))

app.use("/auth/utilisateurs", utilisateurRoutes)
app.use("/auth/posts", postRoutes)
app.use("/login", utilisateurRoutes)


/*** Start serveur */
mongoose.connect(process.env.DBCONNECT, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Database connection OK')
        app.listen(process.env.SERVER_PORT, () => {
            console.log(`This server is running on port ${process.env.SERVER_PORT}. Enjoy !`)
        })
    })
    .catch(() => console.log("Databse connection failed !"));



