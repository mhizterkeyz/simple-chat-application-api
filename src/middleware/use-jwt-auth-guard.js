const AuthService = require("../services/auth-service");
const UnauthorizedException = require("../shared/exceptions/uanauthorized-exception");

const useJWTAuthGuard = () => {
  return (req, _res, next) => {
    try {
      const user = AuthService.authorize(
        req.headers.authorization?.replace(/bearer /gi, "")
      );

      req.user = user;
      next();
    } catch (error) {
      throw new UnauthorizedException();
    }
  };
};

module.exports = useJWTAuthGuard;
