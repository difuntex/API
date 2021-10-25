"use strict";
const Delivery = use("App/Models/Delivery");
const { validateAll } = use("Validator");
const Database = use("Database");
class DeliveryController {
  async index({ response }) {
    try {
      let deliveries = await Database.raw(
        "SELECT nome_cliente, endereco FROM deliveries WHERE entregue = 0 "
      );
      deliveries = deliveries.rows;
      return deliveries;
    } catch (error) {
      return response.status(500).send({ error: `Erro: ${error.message}` });
    }
  }

  async store({ request, response }) {
    try {
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

  async show({ params, request, response, view }) {}

  /**
   * Render a form to update an existing delivery.
   * GET deliveries/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update delivery details.
   * PUT or PATCH deliveries/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a delivery with id.
   * DELETE deliveries/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = DeliveryController;
