const {Router} = require('express');
const passport = require('passport');

const routes = Router();

const ctrl = require('./auth.controller');
const mdl = require('../middlewares');
const validation = require('./auth.validation');

routes.get('/', ctrl.getTest);

routes.post('/register', mdl.validate(validation.register), ctrl.registerNewUser);

routes.post('/', passport.authenticate('local', {}), ctrl.login);

module.exports = routes;
