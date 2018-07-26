const {Router} = require('express');
const passport = require('passport');

const routes = Router();

const ctrl = require('./auth.controller');
const mdl = require('../middlewares');
const validation = require('./auth.validation');

/**
 * @api {POST} /auth/register Register new user
 * @apiVersion 0.0.1
 * @apiGroup Auth
 * @apiPermission all
 * 
 * @apiParam {String{5..100}} email User email
 * @apiParam {String{5..100}} email User email
 * 
 * @apiParamExample {json} Request-Example:
 * {
 *     "email": "d@d.dd",
 *     "password": "12345"
 * }
 * @apiSuccess {String{24}} _id User ObjectId
 * @apiSuccess {String{5..100}} email User email
 * @apiSuccess {String{5..100}} email User email
 * @apiSuccess {String{5..100}} addedAt User creation date
 * @apiSuccess {String{5..100}} updatedAt User last update date
 * 
 *  @apiSuccessExample {json} Request-Example:
 * {
 *     "_id": "123456789123456789123456"
 *     "email": "d@d.dd",
 *     "password": "12345"
 * }
 * 
 */

routes.get('/', ctrl.getTest);

routes.post('/register', mdl.validate(validation.register), ctrl.registerNewUser);

routes.post('/', passport.authenticate('local', {}), ctrl.login);

module.exports = routes;
