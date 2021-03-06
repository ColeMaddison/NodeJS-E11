// const path = require('path');
const { celebrate } = require('celebrate');


exports.validate = (schema) => {
    return celebrate(schema, {
        stripUnknown: {
            objects: true
        }
    });
};

exports.isAuth = (req, res, next) => {
    if(req.user) {
        return next();
    } 

    // redirect to main if user not authorized
    res.clearCookie('connected.sid');
    res.status(401).redirect('/');
};