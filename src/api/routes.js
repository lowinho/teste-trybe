const Router = require('express');
const userRoutes = require('../routes/userRoutes');
const recipesRoutes = require('../routes/recipesRoutes');
const loginRoutes = require('../routes/loginRoutes');

const routes = Router();
routes.use('/users', userRoutes);
routes.use('/recipes', recipesRoutes);
routes.use('/login', loginRoutes);

module.exports = routes;