const { WEB_SOCKET_EVENTS } = require("../shared/constants");
const AuthService = require("./auth-service");
const UserService = require("./user-service");

let server;
const clients = new Map();
const subscribers = () => [
  [WEB_SOCKET_EVENTS.IS_TYPING, WebSocketGateWay.emitTyping],
  [WEB_SOCKET_EVENTS.STOPPED_TYPING, WebSocketGateWay.emitStoppedTyping],
];

class WebSocketGateWay {
  static initialize(_server) {
    server = _server;
    server.on("connection", WebSocketGateWay.handleConnection);
  }

  static registerSubscribers(client, user) {
    client.on("disconnect", () => WebSocketGateWay.handleDisconnect(user.id));
    subscribers().forEach(([event, subscriber]) => {
      client.on(event, (data) => subscriber(data, user, client));
    });
  }

  static handleConnection(client) {
    try {
      const user = AuthService.validateWebsocketClient(client);
      WebSocketGateWay.registerSubscribers(client, user);
      UserService.updateUser(user.id, { isOnline: true });
      clients.set(user.id, client);
      client.join(["general"]);
    } catch (error) {
      console.error(`error handling client connection - ${error.message}`);
      client.disconnect();
    }
  }

  static handleDisconnect(key) {
    UserService.updateUser(key, { isOnline: false, lastSeen: new Date() });
    clients.delete(key);
  }

  static emitInRoom(room, type, data) {
    server?.to(room)?.emit(type, data);
  }

  static getClient(user, callback) {
    const client = clients.get(user);
    if (client) {
      callback(client);
    }
  }

  static emitToClient(user, type, data) {
    WebSocketGateWay.getClient(user, (client) => {
      client.emit(type, data);
    });
  }

  static emitTyping(recipient, user) {
    WebSocketGateWay.emitToClient(
      +recipient,
      WEB_SOCKET_EVENTS.IS_TYPING,
      user
    );
  }

  static emitStoppedTyping(recipient, user) {
    WebSocketGateWay.emitToClient(
      +recipient,
      WEB_SOCKET_EVENTS.STOPPED_TYPING,
      user
    );
  }
}

module.exports = WebSocketGateWay;
