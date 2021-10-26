"use strict";

class Produto {
  get rules() {
    return {
      nome: "required|min:2",
      descricao: "required",
      preco: "required",
    };
  }
  get messages() {
    return {
      //required: "Campo Faltando",
      "nome.required:": "É preciso informar o nome do produto",
      "nome.min": "Nome inválido",
      "descricao.required": "É preciso informar a descrição do produto",
      "preco.required": "É preciso informar o preço do produto",
    };
  }
}

module.exports = Produto;
