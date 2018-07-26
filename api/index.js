const {Router} = require('express');

const routes = Router();

// Auth API
routes.use('/auth', require('./auth/index'));

// posts API
routes.use('/posts', require('./posts/index'));

// Files API
routes.use('/files', require('./files/index'));

module.exports = routes;

