"use strict";
const User = use("App/Models/User");
const { validateAll } = use("Validator");
class UserController {
  async store({ request, response }) {
    try {
      const errorMessage = {
        "username.required": "É necessário informar um nome de usuário",
        "username.unique": "Esse usuário ja existe",
        "username.min": "É preciso ter mais de 5 caracteres no nome de usuário",
        "email.required": "É necessário informar um email",
        "email.min": "É preciso ter mais de 5 caracteres no campo de email",
        "email.unique": "Esse email ja esta cadastrado",
        "password.required": "A senha precisa ter ao menos 6 digitos",
      };

      const validation = await validateAll(
        request.all(),
        {
          username: "required|min:5|unique:users",
          email: "required|email|unique:users",
          password: "required|min:6",
        },
        errorMessage
      );

      if (validation.fails()) {
        return response.status(401).send({ message: validation.messages() });
      }

      const data = request.only(["username", "email", "password"]);
      const user = await User.create(data);

      return user;
    } catch (error) {
      return response.status(500).send({ error: `Erro: ${error.message}` });
    }
  }
  async login({ request, response, auth }) {
    try {
      const { email, password } = request.all();
      const validaToken = await auth.attempt(email, password);
      return validaToken;
    } catch (error) {
      return response.status(500).send({ error: `Erro: ${error.message}` });
    }
  }
}

module.exports = UserController;
