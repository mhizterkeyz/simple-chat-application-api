const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const catchAllExceptions = require("./middleware/catch-all-exceptions");
const routes = require("./routes");
const WebSocketGateWay = require("./services/web-socket-gateway");
const getConfig = require("./shared/config");

const app = express();

const server = http.createServer(app);
WebSocketGateWay.initialize(new Server(server));
if (getConfig().isDev()) {
  app.use(require("morgan")("dev"));
}

app.use(require("cors")());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use("/api", routes);

app.use(catchAllExceptions());

module.exports = server;
