const { HTTP_STATUS } = require("../constants");
const HttpException = require("./http-exception");

class NotFoundException extends HttpException {
  constructor({ message = "NotFound" } = {}) {
    super({ message, status: HTTP_STATUS.NOT_FOUND });
  }
}

module.exports = NotFoundException;
