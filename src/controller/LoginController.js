const LoginService = require('../service/LoginService');

class LoginController {
    static async store(req, res) {
        const user = req.body;
        try {
          const response = await LoginService.store(user);
          return res.status(200).json(response);
        } catch (err) {
          return res.status(err.error.status).json({
              message: err.message,
          });
      }
    }
}

module.exports = LoginController;