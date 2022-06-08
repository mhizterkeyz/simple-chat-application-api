const { Router } = require("express");
const AuthController = require("../controllers/auth-controller");
const useJWTAuthGuard = require("../middleware/use-jwt-auth-guard");
const users = require("./users");

const routes = Router();

routes.use("/users", useJWTAuthGuard(), users);
routes.post("/start", AuthController.start);
routes.delete("/stop", useJWTAuthGuard(), AuthController.stop);

module.exports = routes;
