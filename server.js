// Load local `.env` for non-container runs (Docker/ECS inject env vars directly).
require("dotenv").config();

const app = require("./app");
const config = require("./config");
const logger = require("./logger");

app.listen(config.PORT, () => {
  logger.info({ port: config.PORT }, "Server is listening");
  logger.info({ domain: config.DOMAIN }, "Application URL");
});
