const mongoose = require('mongoose')


mongoose.connect('mongodb://localhost/jwt_auth', {

    useNewUrlParser: true
})


mongoose.connection.once('open', () => {

    console.log("connected to database")
}).on('error', (error) => {


    console.log(error)
})

module.exports = mongoose;