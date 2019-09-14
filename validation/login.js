const validator = require('validator')
const isEmpty = require('./is-empty')

const validatingLoginInput = (data) => {

    let errors = {}


    data.email = !isEmpty(data.email) ? data.email : ''
    data.password = !isEmpty(data.password) ? data.password : ''



    if (validator.isEmpty(data.email)) {

        errors.email = "Email filed is required"
    }

    if (!validator.isEmpty(data.email) && !validator.isEmail(data.email)) {

        errors.email = "Email is invalid"
    }


    if (validator.isEmpty(data.password)) {

        errors.password = "Password  is required"
    }

    if (!validator.isEmpty(data.password) && !validator.isLength(data.password, { min: 6, max: 30 })) {

        errors.password = "Password  must be beetween 6 and 30 characters"
    }





    return {
        errors,
        isValid: isEmpty(errors)
    }

}

module.exports = validatingLoginInput