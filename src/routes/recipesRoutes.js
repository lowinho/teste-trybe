const Router = require('express');
const multer = require('multer');
const multerConfig = require('../configs/multerConfig');
const RecipesController = require('../controller/RecipesController');
const { checkJwt, checkJwtNoAuth } = require('../middleware/auth');

const upload = multer(multerConfig).single('image');
const recipesRoutes = Router();

recipesRoutes.get('/', RecipesController.index);
recipesRoutes.get('/:id', checkJwtNoAuth, RecipesController.show);
recipesRoutes.post('/', checkJwt, RecipesController.store);
recipesRoutes.put('/:id', checkJwt, RecipesController.update);
recipesRoutes.delete('/:id', checkJwt, RecipesController.delete);
recipesRoutes.put('/:id/image', upload, checkJwt, RecipesController.storeImage);

module.exports = recipesRoutes;