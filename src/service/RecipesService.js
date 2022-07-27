const Yup = require('yup');
const { CustomError } = require('express-handler-errors');
const Model = require('../models/recipeModel');
const authConfig = require('../configs/auth');

class RecipesService {
  static async index() {
    const recipes = await Model.getRecipes();
    return recipes;
  }

  static async show(id) {
      const recipes = await Model.getRecipeById(id);
      if (!recipes) {
        throw new CustomError({ message: 'recipe not found', status: 404 });
      }
      return recipes;
  }

  static async store(params, user) {
    const schema = Yup.object().shape({
        name: Yup.string().required(),
        ingredients: Yup.string().required(),
        preparation: Yup.string().required(),
    });
    if (!(await schema.isValid(params))) {
        throw new CustomError({
          message: 'Invalid entries. Try again.',
          status: 400,
        });
      }
      const data = this.saveMongo(params, user);
      return data;
  }

  static async update(id, params) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      ingredients: Yup.string().required(),
      preparation: Yup.string().required(),
  });

  if (!(await schema.isValid(params))) {
      throw new CustomError({
        message: 'Invalid entries. Try again.',
        status: 400,
      });
    }
    return this.updateMongo(id, params);
  }

  static async delete(id) {
    const recipes = await Model.deleteRecipe(id);
    return recipes;
  }

  static async storeImage(id, params, user) {
    const recipesUser = await Model.getRecipeById(id);
    if (user.role !== 'admin' && recipesUser.userId !== user.id) {
      throw new CustomError({
        message: 'permission denied',
        status: 401,
      });
    }
    const { _id: idRecipes } = recipesUser;
    const url = `${authConfig.url}/src/uploads/${idRecipes}.jpeg`;
    await Model.storeImage(id, url);
    const image = await Model.getRecipeById(id);
    return image;
  }

  static async saveMongo(params, user) {
    const { name, ingredients, preparation } = params;
    const { id } = user;
    const recipes = await Model.createRecipe(name, ingredients, preparation, id);
    const { _id: idRecipes } = recipes;
    const data = {
      recipe: {
        _id: idRecipes,
        name: recipes.name,
        ingredients: recipes.ingredients,
        preparation: recipes.preparation,
      },
    };
    return data;
  }

  static async updateMongo(id, params) {
    const { name, ingredients, preparation } = params;
    await Model.updateRecipe(id, name, ingredients, preparation);
    const recipes = await Model.getRecipeById(id);
    return recipes;
  }
}

module.exports = RecipesService;