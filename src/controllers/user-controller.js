const UserService = require("../services/user-service");
const { HTTP_STATUS } = require("../shared/constants");
const Response = require("../shared/response");

class UserController {
  static getUsers(req, res) {
    const users = UserService.getUsers(req.user);

    Response.json(res, HTTP_STATUS.OK, "users retrieved", users);
  }

  static getUserById(req, res) {
    const user = UserService.getUserByIdOrFail(req.params.id);

    Response.json(res, HTTP_STATUS.OK, "user retrieved", user);
  }

  static getLoggedInUser(req, res) {
    Response.json(res, HTTP_STATUS.OK, "logged in user", req.user);
  }
}

module.exports = UserController;
