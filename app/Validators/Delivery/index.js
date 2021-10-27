"use strict";
const Validator = use("App/Validators/Validator");
class Delivery extends Validator {
  get rules() {
    return {
      nome_cliente: "required",
      endereco: "required",
      valor: "required",
      cartao: "required",
    };
  }
  get messages() {
    return {
      "nome_cliente.required": "É preciso informar o nome do cliente",
      "endereco.required": "É preciso informar o endereço",
      "valor.required": "É preciso informar o valor da entrega",
      "cartao.required":
        "É preciso informar se o pagamento será efetuado  através do uso de cartão",
    };
  }
}

module.exports = Delivery;
