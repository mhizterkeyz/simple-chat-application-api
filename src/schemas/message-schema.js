const Schema = require("./schema");

class Message extends Schema {
  constructor(params = {}) {
    super(params);
    const { message, sender, recipient } = params;
    this.message = message;
    this.sender = sender;
    this.recipient = recipient;
  }
}

module.exports = Message;
