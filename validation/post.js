const Validator = require('validator'),
    isEmpty = require('./is-empty');

module.exports = validatePostInput = data => {
    let errors = {};

    data.text = !isEmpty(data.text) ? data.text : '';

    if(!Validator.isLength(data.text, {
        min: 5,
        max: 50
    })) {
        errors.text = 'Post must be between 5 and 50 characters'
    }

    if(Validator.isEmpty(data.text)) {
        errors.text = 'Text field is required'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};