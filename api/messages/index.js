const {Router} = require('express');

const routes = Router();

const ctrl = require('./messages.controller');
const mdl = require('../middlewares');
const validation = require('./messages.validation');

routes.get('/', ctrl.showMessages);

routes.post('/', mdl.validate(validation.addNewMessage), ctrl.addNewMessage);

module.exports = routes;
