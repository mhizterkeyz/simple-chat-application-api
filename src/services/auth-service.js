const { verify } = require("jsonwebtoken");
const { sign } = require("jsonwebtoken");
const getConfig = require("../shared/config");
const MessageService = require("./message-service");
const UserService = require("./user-service");

class AuthService {
  static start(payload) {
    const user = UserService.createUser(payload);
    const { jwt } = getConfig();
    const token = sign({ id: user.id, username: user.username }, jwt.secret);

    return { user, token };
  }

  static authorize(token) {
    const { jwt } = getConfig();
    const { id, username } = verify(token, jwt.secret);
    const user = UserService.getUserByIdOrFail(id);
    if (!user || user.username !== username) {
      throw new Error();
    }

    return user;
  }

  static stop(user) {
    UserService.deleteUser(user.id);
    MessageService.deleteUserMessages(user.id);
  }

  static validateWebsocketClient(client) {
    const authorization =
      client.handshake.headers.authorization ||
      `${client.handshake.query.authorization}`;
    const token = authorization?.replace(/bearer /gi, "");

    return AuthService.authorize(token);
  }
}

module.exports = AuthService;
