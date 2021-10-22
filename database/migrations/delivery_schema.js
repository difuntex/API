"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class DeliverySchema extends Schema {
  up() {
    this.create("deliveries", (table) => {
      table.increments();
      table.timestamps();
      table.integer("entregue").notNullable().default(0);
      table.string("endereco").notNullable();
      table.float("valor").notNullable();
      table.float("troco").notNullable();
      table.integer("cartao").notNullable().default(0);
      table.string("nome_cliente").notNullable();
    });
  }

  down() {
    this.drop("deliveries");
  }
}

module.exports = DeliverySchema;
