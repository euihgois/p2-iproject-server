const { User } = require("../models");
const { signToken } = require("../helpers/jwt");
const { comparePassword } = require("../helpers/bcrypt");

class Controller {
  static async register(req, res, next) {
    try {
      const { id, email } = await User.create({ ...req.body });

      res.status(201).json({ id, email });
    } catch (error) {
      next(error);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) throw { name: "emptyEmail" };
      if (!password) throw { name: "emptyPassword" };

      const user = await User.findOne({ where: { email } });

      if (!user || !comparePassword(password, user.password))
        throw { name: "invalid" };

      const access_token = signToken({
        id: user.id,
      });

      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
