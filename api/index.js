const {Router} = require('express');

const routes = Router();

// Auth API
routes.use('/auth', require('./auth/index'));

// Messages API
routes.use('/messages', require('./messages/index'));

// Users API
routes.use('/users', require('./users/index'));

// Files API
routes.use('/files', require('./files/index'));

module.exports = routes;

