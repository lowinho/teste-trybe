const Yup = require('yup');
const { CustomError } = require('express-handler-errors');
const Model = require('../models/userModel');

class UserService {
  static async store(params) {
    const schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().email().required(),
        password: Yup.string().required(),
    });
    if (!(await schema.isValid(params))) {
        throw new CustomError({ message: 'Invalid entries. Try again.', status: 400 });
      }
    await this.validEmailExists(params);
    const data = await this.saveMongo(params, 'user');
    return data;
  }

  static async createAdmin(params, userAdmin) {
    const schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().email().required(),
        password: Yup.string().required(),
    });
    if (await userAdmin.role !== 'admin') {
      throw new CustomError({ message: 'Only admins can register new admins', status: 403 });
    }
    if (!(await schema.isValid(params))) {
        throw new CustomError({ message: 'Invalid entries. Try again.', status: 400 });
      }
    await this.validEmailExists(params);
    const data = await this.saveMongo(params, 'admin');
    return data;
  }

  static async saveMongo(params, roleValue) {
    const { name, email, password } = params;
    const role = roleValue;
    const user = await Model.createUser(name, email, password, role);
    const { _id: idUser } = user;
      const data = {
        user: {
          _id: idUser,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      };
      return data;
  }

  static async validEmailExists(params) {
    const emailExists = await Model.getUserByEmail(params.email);
    if (emailExists) {
      throw new CustomError({
        message: 'Email already registered',
        status: 409,
      });
    }
  }
}

module.exports = UserService;