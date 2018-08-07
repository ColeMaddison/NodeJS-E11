const Joi = require('joi');

exports.addNewpost = {
    body: {
        title: Joi.string().trim().min(3).max(100).required(),
        post: Joi.string().trim().min(3).required(),
        // file: Joi.any(),
        show: Joi.number().min(1).max(60).integer().default(30)
    }
};