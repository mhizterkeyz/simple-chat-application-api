const { CronJob } = require("cron");
const moment = require("moment");
const User = require("../schemas/user-schema");
const getConfig = require("../shared/config");
const { WEB_SOCKET_EVENTS } = require("../shared/constants");
const NotFoundException = require("../shared/exceptions/not-found-exception");
const MessageService = require("./message-service");

const users = [];

class UserService {
  static websocketGateWay() {
    return require("./web-socket-gateway");
  }

  static createUser(payload) {
    const { username } = payload;
    const id = users.length;
    const user = new User({ id, username });
    users.push(user);

    UserService.websocketGateWay().emitInRoom(
      "general",
      WEB_SOCKET_EVENTS.NEW_USER,
      user
    );

    return user;
  }

  static getUsers(user) {
    const groupedMessages = MessageService.getGroupedMessages();

    return users
      .filter((_user) => !!_user && _user.id !== user.id)
      .map((_user) => {
        const [lastMessage] = [
          (groupedMessages[`${_user.id}:${user.id}`] || [])[0],
          (groupedMessages[`${user.id}:${_user.id}`] || [])[0],
        ]
          .filter((m) => m)
          .sort((a, b) => (moment(a.createdAt).isAfter(b.createdAt) ? -1 : 1));

        return { user: _user, lastMessage };
      })
      .sort((user1, user2) => {
        return (user1.lastMessage?.createdAt && !user2.lastMessage) ||
          moment(user1.lastMessage?.createdAt || user1.createdAt).isAfter(
            moment(user2.lastMessage?.createdAt || user2.createdAt)
          )
          ? -1
          : 1;
      });
  }

  static getUserByIdOrFail(id) {
    const user = users[id];
    if (!user) {
      throw new NotFoundException({ message: "user not found" });
    }

    return user;
  }

  static deleteUser(id) {
    const user = users.splice(id, 1, null);
    UserService.websocketGateWay().emitInRoom(
      "general",
      WEB_SOCKET_EVENTS.USER_DELETE,
      user
    );

    return user;
  }

  static updateUser(id, update) {
    const user = UserService.getUserByIdOrFail(id);
    users[id] = { ...user, ...update };
    UserService.websocketGateWay().emitInRoom(
      "general",
      WEB_SOCKET_EVENTS.USER_UPDATE,
      users[id]
    );

    return users[id];
  }

  static removeInactiveUsers() {
    const { inactivityTimeLimit } = getConfig();
    const inactiveUsers = users.filter((user) => {
      if (!user) {
        return false;
      }

      return (
        !user.isOnline &&
        moment().diff(user.lastSeen, "minutes") > inactivityTimeLimit
      );
    });

    inactiveUsers.forEach(({ id }) => {
      UserService.deleteUser(id);
      MessageService.deleteUserMessages(id);
    });
  }
}

new CronJob(
  "0 */1 * * * *",
  UserService.removeInactiveUsers,
  null,
  true,
  "Africa/Lagos"
);

module.exports = UserService;
