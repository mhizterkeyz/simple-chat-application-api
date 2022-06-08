const groupBy = require("lodash.groupby");
const Message = require("../schemas/message-schema");
const { WEB_SOCKET_EVENTS } = require("../shared/constants");

let messages = [];

class MessageService {
  static websocketGateWay() {
    return require("./web-socket-gateway");
  }

  static getGroupedMessages() {
    return groupBy([...messages].reverse(), (message) => {
      if (!message) {
        return "";
      }
      const { sender, recipient } = message;

      return `${sender}:${recipient}`;
    });
  }

  static getMessages(user, userId) {
    return messages.filter((message) => {
      const { sender, recipient } = message || {};
      return (
        (sender === userId && recipient === user.id) ||
        (sender === user.id && recipient === userId)
      );
    });
  }

  static deleteUserMessages(id) {
    messages = messages.map((message) => {
      if (message?.sender === id || message?.recipient === id) {
        return null;
      }

      return message;
    });
  }

  static sendMessage(user, text, recipient) {
    const id = messages.length;
    const message = new Message({
      message: text,
      recipient,
      sender: user.id,
      id,
    });
    messages.push(message);

    MessageService.websocketGateWay().emitToClient(
      recipient,
      WEB_SOCKET_EVENTS.NEW_MESSAGE,
      {
        message,
        sender: user,
      }
    );

    return message;
  }
}

module.exports = MessageService;
