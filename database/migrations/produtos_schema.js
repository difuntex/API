"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ProdutosSchema extends Schema {
  up() {
    this.create("produtos", (table) => {
      table.increments();
      table.timestamps();
      table.string("nome").notNullable();
      table.string("descricao").notNullable();
      table.integer("vendendo").notNullable().default(1);
      table.float("preco").notNullable();
    });
  }

  down() {
    this.drop("produtos");
  }
}

module.exports = ProdutosSchema;
