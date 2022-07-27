const { CustomError } = require('express-handler-errors');
const jwt = require('jsonwebtoken');
const Model = require('../models/userModel');

const authConfig = require('../configs/auth');

class LoginService {
    static async store(params) {
      await this.requireFields(params);
      const user = await Model.getUserByEmail(params.email);
      if (!user) {
        throw new CustomError({ message: 'Incorrect username or password', status: 401 });
      }
      if (user.password !== params.password) {
        throw new CustomError({ message: 'Incorrect username or password', status: 401 });
      }
      const authUser = (await user);
      const data = await this.generateToken(authUser);
      return data;
  }

  static async requireFields(params) {
    if (!(params.email && params.password)) {
      throw new CustomError({ message: 'All fields must be filled', status: 401 });
    }
  }

  static async generateToken(authUser) {
    const { _id: id } = authUser;
    const dataUser = {
      id,
      name: authUser.name,
      email: authUser.email,
      role: authUser.role,
    };
    const token = {
      user: dataUser,
      token: jwt.sign({ dataUser }, authConfig.secret, { expiresIn: authConfig.expiresIn }),
    };
    return { token: token.token };
  }
}
module.exports = LoginService;
