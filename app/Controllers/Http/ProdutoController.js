"use strict";
const Produto = use("App/Models/Produto");
const { validateAll } = use("Validator");
class ProdutoController {
  async index({ request, response, view }) {}

  async store({ request, response }) {
    try {
      const errorMessage = {
        "nome.required": "É preciso informar o nome do produto",
        "nome.min": "Nome inválido",
        "descircao.required": "É preciso informar a descirção do produto",
        "preco.required": "É preciso informar o preço do produto",
      };
      const validation = await validateAll(
        request.all(),
        {
          nome: "required|min:2",
          descricao: "required",
          preco: "required",
        },
        errorMessage
      );

      if (validation.fails()) {
        return response.status(401).send({ message: validation.messages() });
      }
      const data = request.only(["nome", "descricao", "preco"]);
      const produto = await Produto.create(data);
      return produto;
    } catch (error) {
      return response.status(500).send({ error: `Erro: ${error.message}` });
    }
  }

  async show({ params, request, response, view }) {}

  async edit({ params, request, response, view }) {}

  async update({ params, request, response }) {}

  async destroy({ params, request, response }) {}
}

module.exports = ProdutoController;
