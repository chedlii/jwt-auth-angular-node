
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')



module.exports = (req, res, next) => {

    if (!req.headers.authorization) {

        return res.status(401).send("unthorized Request")
    }
    //else extract the token

    let token = req.headers.authorization.split(' ')[1]
    console.log(token)

    if (!token) {


        return res.status(401).send("unthorized Request token ")
    }

    let payload = jwt.verify(token, keys.secretOrKey)
    if (!payload) {
        return res.status(401).send("unthorized Request payload")
    }

    console.log(payload)

    req.user = payload.subject
    next()

}
