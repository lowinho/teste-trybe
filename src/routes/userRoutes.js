const Router = require('express');

const UserController = require('../controller/UserController');
const { checkJwt } = require('../middleware/auth');

const userRoutes = Router();

userRoutes.post('/', UserController.store);
userRoutes.post('/admin', checkJwt, UserController.createAdmin);

module.exports = userRoutes;