const MessageService = require("../services/message-service");
const { HTTP_STATUS } = require("../shared/constants");
const Response = require("../shared/response");

class MessageController {
  static getMessages(req, res) {
    const messages = MessageService.getMessages(req.user, +req.params.id);

    Response.json(res, HTTP_STATUS.OK, "messages retrieved", messages);
  }

  static sendMessage(req, res) {
    const message = MessageService.sendMessage(
      req.user,
      req.body.message,
      +req.params.id
    );

    Response.json(res, HTTP_STATUS.CREATED, "message sent", message);
  }
}

module.exports = MessageController;
