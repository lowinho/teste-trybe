const UserService = require('../service/UserService');

class UserController {
    static async store(req, res) {
        const params = req.body;
        try {
            const user = await UserService.store(params);
            return res.status(201).json(user);
        } catch (err) {
            return res.status(err.error.status).json({
                message: err.message,
            });
        }
    }

    static async createAdmin(req, res) {
        const params = req.body;
        const userAdmin = req.userInfo;
        try {
            const user = await UserService.createAdmin(params, userAdmin);
            return res.status(201).json(user);
        } catch (err) {
            return res.status(err.error.status).json({
                message: err.message,
            });
        }
    }
}

module.exports = UserController;