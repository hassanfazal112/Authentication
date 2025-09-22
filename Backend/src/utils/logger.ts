import fs from 'fs';
import path from 'path';
import winston from 'winston';

const logDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Define log format
const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf(({ timestamp, level, message }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
  }),
);

// Create logger instance
const logger = winston.createLogger({
  level: 'info', // Default logging level
  format: logFormat,
  transports: [
    new winston.transports.Console(), // Logs to console
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }), // Logs errors to a file
    new winston.transports.File({ filename: 'logs/combined.log' }), // Logs everything to a file
  ],
});

// If not in production, log to console with a more readable format
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  );
}

export default logger;
