const {Router} = require('express');

const routes = Router();

const ctrl = require('./posts.controller');
const mdl = require('../middlewares');
const validation = require('./posts.validation');

routes.get('/', mdl.isAuth, ctrl.showposts);

routes.get('/:postId', mdl.isAuth, ctrl.postDetails);

routes.post('/', mdl.isAuth, mdl.validate(validation.addNewpost), ctrl.addNewpost);

module.exports = routes;
