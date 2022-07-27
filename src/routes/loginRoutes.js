const Router = require('express');

const LoginController = require('../controller/LoginController');
// import { checkJwt } from '../middleware/auth';

const loginRoutes = Router();

loginRoutes.post('/', LoginController.store);

module.exports = loginRoutes;