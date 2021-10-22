"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Produto extends Model {
  static get table() {
    return "produtos";
  }
  static get primaryKey() {
    return "id";
  }

  static get createdAtColumn() {
    return "created_at";
  }
  static get updatedAtColumn() {
    return "updated_at";
  }
}

module.exports = Produto;
