const getConfig = require("../shared/config");
const HttpException = require("../shared/exceptions/http-exception");
const ServerException = require("../shared/exceptions/server-excepiton");

const catchAllExceptions = () => {
  return (error, _req, res, _next) => {
    let _error = error;
    if (!(_error instanceof HttpException)) {
      _error = new ServerException();
      if (getConfig().isDev()) {
        console.debug(error);
      }
    }

    _error.respond(res);
  };
};

module.exports = catchAllExceptions;
