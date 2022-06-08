const AuthService = require("../services/auth-service");
const { HTTP_STATUS } = require("../shared/constants");
const Response = require("../shared/response");

class AuthController {
  static start(req, res) {
    const data = AuthService.start(req.body);

    Response.json(res, HTTP_STATUS.CREATED, "successfully started", data);
  }

  static stop(req, res) {
    AuthService.stop(req.user);

    Response.json(res, HTTP_STATUS.OK, "successfully stopped");
  }
}

module.exports = AuthController;
