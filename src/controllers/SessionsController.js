const knex = require("../database/knex");
const AppError = require("../utils/appError");

const authConfig = require("../configs/auth");

const { sign } = require("jsonwebtoken");
const { compare } = require("bcrypt");

class SessionsController {
  async create(request, response) {
    const { email, password } = request.body;

    const user = await knex("users").where({ email }).first();

    if (!user) {
      throw new AppError("E-mail e/ou senha incorreta", 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError("E-mail e/ou senha incorreta", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, { expiresIn, subject: String(user.id) });

    return response.json({user, token});
  }
}

module.exports = SessionsController;
