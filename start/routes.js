"use strict";

const Route = use("Route");

Route.post("/user", "UserController.store");
Route.post("/login", "UserController.login");
Route.post("/produtos", "ProdutoController.store");
Route.get("/produtos", "ProdutoController.index");
Route.get("/busca_produtos", "ProdutoController.show");
Route.put("/produtos/:id", "ProdutoController.update");
Route.delete("/produtos/:id", "ProdutoController.destroy");
Route.get("/deliveries", "DeliveryController.index");
Route.post("/deliveries", "DeliveryController.store");
