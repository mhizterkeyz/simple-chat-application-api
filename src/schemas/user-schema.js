const Schema = require("./schema");

class User extends Schema {
  constructor(params = {}) {
    super(params);
    const { username, lastSeen = new Date(), isOnline = false } = params;
    this.lastSeen = lastSeen;
    this.username = username;
    this.isOnline = isOnline;
  }
}

module.exports = User;
