const Validator = require('validator'),
    isEmpty = require('./is-empty');

module.exports = validateExperienceInput = data => {
    let errors = {};

    data.company = !isEmpty(data.company) ? data.company : '';
    data.title = !isEmpty(data.title) ? data.title : '';
    data.from = !isEmpty(data.from) ? data.from : '';

    if(Validator.isEmpty(data.title)) {
        errors.title = 'Job title field is required'
    }

    if(Validator.isEmpty(data.company)) {
        errors.company = 'Company title field is required'
    }

    if(Validator.isEmpty(data.from)) {
        errors.from = 'From date field is required'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};