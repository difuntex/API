"use strict";
const Delivery = use("App/Models/Delivery");
const { validateAll } = use("Validator");
const Database = use("Database");
const { isSalesmanHelper } = use("App/Helpers");
class DeliveryController {
  async index({ response }) {
    try {
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
      const verify = await isSalesmanHelper(user);
      if (!verify) return response.status(401).send("Usuário sem permissão");
      const errorMessage = {
        "nome_cliente.required": "É preciso informar o nome do cliente",
        "endereco.required": "É preciso informar o endereço",
        "valor.required": "É preciso informar o valor da entrega",
        "cartao.required":
          "É preciso informar se o pagamento será efetuado  através do uso de cartão",
      };
      const validation = await validateAll(
        request.all(),
        {
          nome_cliente: "required",
          endereco: "required",
          valor: "required",
          cartao: "required",
        },
        errorMessage
      );
      if (validation.fails()) {
        return response.status(401).send({ message: validation.messages() });
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
