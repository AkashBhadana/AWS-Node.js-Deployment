const pino = require("pino");

const level = process.env.LOG_LEVEL || "info";
const isProduction = process.env.NODE_ENV === "production";

const logger = isProduction
  ? pino({ level })
  : pino({
      level,
      transport: {
        target: "pino-pretty",
        options: {
          colorize: true,
          ignore: "pid,hostname",
        },
      },
    });

module.exports = logger;
