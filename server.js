const express = require('express')

const cors = require('cors')


// import for token verification between angular and the backend



//body parser
const bodyParser = require('body-parser')


//connexion to dataBase
const db = require('./config/bdConnexion')

//middlewares:
const loggerMidleware = require('./middlewares/logger')



//Routes
const usersRouter = require('./routes/api/users')

//passport:
const passport = require('passport')

// jwt verification as middleware
const verifyTokenMidleware = require('./middlewares/verifyToken')





const app = express()
app.use(cors())

//configure body-parser to handle post requests
app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(bodyParser.json())
app.use(loggerMidleware)







app.get('/test', verifyTokenMidleware, (req, res) => {


    res.json({ msg: "hello token verification succesfull" })

})



//passport middleware
app.use(passport.initialize())

//passport config
require('./config/passport')(passport)


//auth router
app.use('/api/users', usersRouter)


app.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {


    res.send('succes page you are logged in')
})



app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});










const PORT = process.env.port || 3000

app.listen(PORT, () => { console.log(`server is running on port ${PORT}`) })