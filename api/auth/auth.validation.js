const Joi = require('joi');

module.exports = {
    register: {
        body: {
            nickname: Joi.string().trim().min(3).max(100).required(),
            email: Joi.string().trim().email().min(5).max(100).required(),
            password: Joi.string().trim().min(5).max(100).required()
        }
    }
};