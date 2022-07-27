const RecipesService = require('../service/RecipesService');

class RecipesController {
    static async index(req, res) {
        try {
            const recipes = await RecipesService.index();
            return res.status(200).json(recipes);
        } catch (err) {
            return res.status(400).json({
                message: err.message,
            });
        }
    }

    static async show(req, res) {
        const { id } = req.params;
        try {
            const recipes = await RecipesService.show(id);
            return res.status(200).json(recipes);
        } catch (err) {
            return res.status(404).json({
                message: err.message,
            });
        }
    }
    
    static async store(req, res) {
        const params = req.body;
        const user = req.userInfo;
        try {
            const recipes = await RecipesService.store(params, user);
            return res.status(201).json(recipes);
        } catch (err) {
            return res.status(400).json({
                message: err.message,
            });
        }
    }

    static async update(req, res) {
        const { id } = req.params;
        const data = req.body;
        try {
            const recipes = await RecipesService.update(id, data);
    
            return res.status(200).json(recipes);
        } catch (err) {
            return res.status(400).json({
                message: err.message,
            });
        }
    }

    static async delete(req, res) {
        const { id } = req.params;
        try {
            const recipes = await RecipesService.delete(id);
            return res.status(204).json(recipes);
        } catch (err) {
            return res.status(400).json({
                message: err.message,
            });
        }
    }

    static async storeImage(req, res) {
        const { id } = req.params;
        const params = req.file;
        const user = req.userInfo;
        try {
            const recipes = await RecipesService.storeImage(id, params, user);
            return res.status(200).json(recipes);
        } catch (err) {
            return res.status(400).json({
                message: err.message,
            });
        }
    }
}

module.exports = RecipesController;