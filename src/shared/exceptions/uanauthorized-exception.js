const { HTTP_STATUS } = require("../constants");
const HttpException = require("./http-exception");

class UnauthorizedException extends HttpException {
  constructor({ message = "Unauthorized" } = {}) {
    super({ message, status: HTTP_STATUS.UNAUTHORIZED });
  }
}

module.exports = UnauthorizedException;
