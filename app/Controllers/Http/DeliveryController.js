"use strict";
const Delivery = use("App/Models/Delivery");
const { validateAll } = use("Validator");
const Database = use("Database");
const { is } = use("App/Helpers");
class DeliveryController {
  async index({ response }) {
    try {
      const user = await auth.getUser();
      const verify = await is(user, "salesman");
      if (!verify) {
        const verify = await is(user, "admin");
        if (!verify) return response.status(401).send("Usuário sem permissão");
      }
      let deliveries = await Database.raw(
        "SELECT nome_cliente, endereco, valor, troco FROM deliveries WHERE entregue = 0 ORDER BY created_at ASC "
      );
      deliveries = deliveries.rows;
      return deliveries;
    } catch (error) {
      return response.status(500).send({ error: `Erro: ${error.message}` });
    }
  }

  async store({ request, response, auth }) {
    try {
      const user = await auth.getUser();
      const verify = await is(user, "salesman");
      if (!verify) {
        const verify = await is(user, "admin");
        if (!verify) return response.status(401).send("Usuário sem permissão");
      }

      const data = request.only([
        "nome_cliente",
        "endereco",
        "valor",
        "cartao",
        "troco",
      ]);
      const delivery = await Delivery.create(data);
      return delivery;
    } catch (error) {
      return response.status(500).send({ error: `Erro: ${error.message}` });
    }
  }

  async entrega({ params, response, auth }) {
    try {
      const user = await auth.getUser();
      const verify = await is(user, "salesman");
      if (!verify) {
        const verify = await is(user, "admin");
        if (!verify) return response.status(401).send("Usuário sem permissão");
      }
      let delivery = await Delivery.findBy("id", params.id);
      const entregue = {
        entregue: 1,
      };
      delivery.merge(entregue);
      await delivery.save();
      return "Entrega marcada como ja efetuada, com sucesso!";
    } catch (error) {
      return response.status(500).send({ error: `Erro: ${error.message}` });
    }
  }

  async update({ params, request, response }) {
    try {
      const data = request.all();
    } catch (error) {}
  }
  async destroy({ params, request, response }) {}
}

module.exports = DeliveryController;
