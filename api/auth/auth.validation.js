const Joi = require('joi');
console.log('here');

module.exports = {
    register: {
        body: {
            email: Joi.string().trim().email().min(5).max(100).required(),
            password: Joi.string().trim().min(5).max(100).required(),
        }
    }
};