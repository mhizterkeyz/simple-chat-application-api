const { HTTP_STATUS } = require("../constants");

class HttpException extends Error {
  constructor({
    message = "BadRequest",
    status = HTTP_STATUS.BAD_REQUEST,
  } = {}) {
    super(message);
    this.status = status;
  }

  respond(res) {
    res.status(this.status).json({ message: this.message });
  }
}

module.exports = HttpException;
