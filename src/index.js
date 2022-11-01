const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config/config");
const logger = require("./config/logger");
var http = require("http");
var httpServer = http.createServer(app);
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info("Connected to MongoDB");
  httpServer.listen(config.httpPort, () => {
    logger.info(`HTTP Server Listening on port ${config.httpPort}`);
  });
});
const exitHandler = () => {
  if (httpServer) {
    httpServer.close(() => {
      logger.info("httpServer closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (httpServer) {
    httpServer.close();
  }
});
