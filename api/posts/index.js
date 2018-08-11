const {Router} = require('express');

const routes = Router();

const ctrl = require('./posts.controller');
const mdl = require('../middlewares');
const validation = require('./posts.validation');
const ctrlComments = require('../comments/controller');

routes.get('/', mdl.isAuth, ctrl.showposts);

routes.delete('/:postId', mdl.isAuth, ctrl.deletePost);

routes.get('/:postId', mdl.isAuth, ctrl.postDetails);

routes.post('/', mdl.isAuth, mdl.validate(validation.addNewpost), ctrl.addNewpost);

routes.post('/addComment', mdl.isAuth, ctrlComments.addComment);

routes.post('/file', mdl.isAuth, ctrl.imageUpload);

module.exports = routes;
