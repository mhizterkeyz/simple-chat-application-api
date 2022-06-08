const { Router } = require("express");
const MessageController = require("../../../controllers/message-controller");

const messages = Router();

messages.get("/:id", MessageController.getMessages);
messages.post("/:id", MessageController.sendMessage);

module.exports = messages;
