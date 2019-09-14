const express = require('express')
const router = express.Router()

// user model
const User = require('../../models/user')

//bcrypt
const bcrypt = require('bcryptjs')

//JWT
const jwt = require('jsonwebtoken')

const keys = require('../../config/keys')

const passport = require('passport')


// inputs validation
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')





//test auth router
router.get('/', (req, res) => {


    res.send('auth router works')
})


//@route api/users/register
//@desc  register user 
//@access PUBLICS
router.post('/register', (req, res) => {


    const { errors, isValid } = validateRegisterInput(req.body);

    //check for empty 
    if (!isValid) {

        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }) // check if email exists
        .then(user => {

            if (user) {
                errors.email = "email already exists"

                return res.status(400).json(errors)
            }
            else {

                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                })

                bcrypt.genSalt(10, (err, salt) => {

                    bcrypt.hash(newUser.password, salt, (err, hash) => {

                        if (err) throw err

                        newUser.password = hash
                        newUser.save()
                            .then(savedUser => res.json(savedUser))
                            .catch(err => console.log(err))
                    })

                })
            }//else


        })


})


//@route POST api/users/login
//@desc log the user by  returning the JWT token
//@ access PUBLIC
router.post('/login', (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body)

    const { email, password } = req.body

    if (!isValid) {

        return res.status(400).json(errors)

    }

    //find the user by email
    User.findOne({ email })
        .then(user => {
            if (!user) {

                errors.email = "user dont exits"
                return res.status(404).json(errors)
            }

            // check if password are identic
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {

                        // create JWT payload
                        const payload = {
                            id: user.id,
                            name: user.name
                        }

                        //create the JWT token
                        jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {

                            res.json({ success: true, token: 'Bearer ' + token, user })
                        })

                    } else {
                        errors.password = "password id incorrect"
                        return res.status(400).json(errors)
                    }
                })
                .catch(err => console.log(err))

        })
        .catch(err => console.log(err))
})


//test route  return the current user

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {

    res.json({ msg: "success", id: req.user.id, name: req.user.name, email: req.user.email })

})

module.exports = router