const moment = require('moment')



module.exports = (req, res, next) => {

    console.log(`${req.protocol}://${req.hostname}${req.originalUrl} ${moment().format()}`)

    next()

}