const { HTTP_STATUS } = require("./constants");

class Response {
  static json(res, status = HTTP_STATUS.OK, message, data) {
    res.status(status).json({ message, data });
  }
}

module.exports = Response;
