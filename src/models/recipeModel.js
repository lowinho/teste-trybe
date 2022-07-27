const { ObjectId } = require('mongodb');
const mongoConnection = require('./mongoConnection');

const getRecipes = async () => {
  const db = await mongoConnection.connection();
  const recipes = await db.collection('recipes').find().toArray();
  return recipes;
};

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) return false;
  const db = await mongoConnection.connection();
  const recipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return recipe;
};

const createRecipe = async (name, ingredients, preparation, userId) => {
  const db = await mongoConnection.connection();
  const { insertedId: _id } = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });
  return { _id, name, ingredients, preparation, userId };
};

const updateRecipe = async (_id, name, ingredients, preparation) => {
  if (!ObjectId.isValid(_id)) return false;
  const db = await mongoConnection.connection();
  await db.collection('recipes').updateOne(
    { _id: ObjectId(_id) }, { $set: { name, ingredients, preparation } },
    );
  return { _id, name, ingredients, preparation };
};

const deleteRecipe = async (id) => {
  if (!ObjectId.isValid(id)) return false;
  const db = await mongoConnection.connection();
  const excludeRecipe = await db.collection('recipes').deleteOne({ _id: ObjectId(id) });
  return excludeRecipe;
};

const storeImage = async (_id, image) => {
  if (!ObjectId.isValid(_id)) return false;
  const db = await mongoConnection.connection();
  const imagem = await db.collection('recipes').updateOne(
    { _id: ObjectId(_id) }, { $set: { image } },
    );
  return imagem;
};

module.exports = {
  createRecipe,
  updateRecipe,
  getRecipes,
  getRecipeById,
  deleteRecipe,
  storeImage,
};