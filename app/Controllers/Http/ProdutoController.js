"use strict";
const Produto = use("App/Models/Produto");
const { validateAll } = use("Validator");
const Database = use("Database");
const { is } = use("App/Helpers");

class ProdutoController {
  async index({ response }) {
    try {
      let produtos = await Database.raw(
        "SELECT id, nome, descricao, preco FROM produtos WHERE vendendo  = 1"
      );
      produtos = produtos.rows;
      return produtos;
    } catch (error) {
      return response.status(500).send({ error: `Erro: ${error.message}` });
    }
  }

  async store({ request, response, auth }) {
    try {
      const user = await auth.getUser();
      const verify = await is(user, "admin");
      if (!verify) return response.status(401).send("Usuário sem permissão");
      /*console.log(ProdutoValidator.rules());

      const validation = await validateAll(
        request.all(),
        await ProdutoValidator.rules(),
        await ProdutoValidator.messages()
      );

      if (validation.fails()) {
        return response.status(401).send({ message: validation.messages() });
      }*/
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

  async destroy({ params, response }) {
    try {
      await Produto.query().where("id", params.id).delete();
      return "Produto excluido com sucesso";
    } catch (error) {
      return response.status(500).send({ error: `Erro: ${error.message}` });
    }
  }
}

module.exports = ProdutoController;
