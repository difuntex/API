"use strict";

const Route = use("Route");

Route.post("/user", "UserController.store");
Route.post("/login", "UserController.login");
Route.post("/produtos", "ProdutoController.store");
Route.get("/produtos", "ProdutoController.index");
