const { Router } = require("express");
const UserController = require("../../controllers/user-controller");
const messages = require("./messages");

const users = Router();

users.use("/messages", messages);
users.get("/", UserController.getUsers);
users.get("/me", UserController.getLoggedInUser);
users.get("/:id", UserController.getUserById);

module.exports = users;
