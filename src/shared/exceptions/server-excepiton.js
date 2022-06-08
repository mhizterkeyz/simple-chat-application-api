const { HTTP_STATUS } = require("../constants");
const HttpException = require("./http-exception");

class ServerException extends HttpException {
  constructor({ message = "ServerError" } = {}) {
    super({ message, status: HTTP_STATUS.SERVER_ERROR });
  }
}

module.exports = ServerException;
