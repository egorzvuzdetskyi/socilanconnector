const Validator = require('validator'),
    isEmpty = require('./is-empty');

module.exports = validateRegisterInput = data => {
    let errors = {};

    if (
        !Validator.isLength(data.name, {
                min: 2,
                max: 30
            }
        )
    ) {
        errors.name = 'Name must be between 2 and 30 characters'
    }

    data.name = !isEmpty(data.name) ? data.name : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';

    if (Validator.isEmpty(data.name)) {
        errors.name = 'Name field is required';
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }

    if (Validator.isLength(data.email, { min: 6, max: 30 })) {
        errors.password = 'Password must be between 6 and 30 characters'
    }

    if (Validator.isEmpty(data.password2)) {
        errors.password2 = 'Confirm Password field is required';
    }

    if (!Validator.equals(data.password2, data.password)) {
        errors.password2 = 'Password should be equal';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}