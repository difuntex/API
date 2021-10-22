"use strict";
const Produto = use("App/Models/Produto");
const { validateAll } = use("Validator");
const Database = use("Database");
class ProdutoController {
  async index({ response }) {
    try {
      let produtos = await Database.raw(
        "SELECT nome, descricao, preco FROM produtos WHERE vendendo  = 1"
      );
      produtos = produtos.rows;
      return produtos;
    } catch (error) {
      return response.status(500).send({ error: `Erro: ${error.message}` });
    }
  }

  async store({ request, response }) {
    try {
      const errorMessage = {
        "nome.required": "É preciso informar o nome do produto",
        "nome.min": "Nome inválido",
        "descricao.required": "É preciso informar a descrição do produto",
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

  async show({ request, response }) {
    try {
      let requisicao = request.only(["nome"]);
      let data = await Database.raw(
        `SELECT nome,descricao,preco FROM produtos WHERE nome LIKE '%${requisicao.nome}%'`
      );
      data = data.rows;
      return data;
    } catch (error) {
      return response.status(500).send({ error: `Erro: ${error.message}` });
    }
  }

  async update({ params, request, response }) {
    try {
      const data = request.all();
      let produto = await Produto.findByOrFail("id", params.id);
      let produtoAtualizado = {
        nome: data.nome,
        descricao: data.descricao,
        preco: data.preco,
      };
      produto.merge(produtoAtualizado);
      await produto.save();
      return "Produto atualizado com sucesso!";
    } catch (error) {
      return response.status(500).send({ error: `Erro: ${error.message}` });
    }
  }

  async destroy({ params, request, response }) {}
}

module.exports = ProdutoController;
