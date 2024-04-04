/**
 * logger.ts
 *
 * This module uses the winston library to create a logger for the application.
 * The logger is configured to log messages of level 'debug' and above.
 * It uses a custom format that includes the timestamp, log level, and the log message.
 * The logs are output to the console.
 */

import winston from "winston";

/**
 * Create a new winston logger.
 *
 * The logger is configured to log messages of level 'debug' and above.
 * It uses a custom format that includes the timestamp, log level, and the log message.
 * The logs are output to the console.
 */
const logger = winston.createLogger({
  level: "debug",
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.printf(
      (info) => `${info.timestamp} ${info.level}: ${info.message}`,
    ),
  ),
  transports: [new winston.transports.Console()],
});

export default logger;
