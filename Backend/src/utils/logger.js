/**
 * Logger Utility
 * Centralized logging for the application
 */

const fs = require('fs');
const path = require('path');

const logsDir = path.join(__dirname, '../../logs');

// Create logs directory if it doesn't exist
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const logger = {
  info: (message, data = null) => {
    const timestamp = new Date().toISOString();
    const log = `[${timestamp}] INFO: ${message}${data ? ' - ' + JSON.stringify(data) : ''}\n`;
    console.log(log);
    appendToLogFile(log);
  },

  error: (message, error = null) => {
    const timestamp = new Date().toISOString();
    const errorMsg = error instanceof Error ? error.message : error;
    const log = `[${timestamp}] ERROR: ${message}${errorMsg ? ' - ' + errorMsg : ''}\n`;
    console.error(log);
    appendToLogFile(log);
  },

  warn: (message, data = null) => {
    const timestamp = new Date().toISOString();
    const log = `[${timestamp}] WARN: ${message}${data ? ' - ' + JSON.stringify(data) : ''}\n`;
    console.warn(log);
    appendToLogFile(log);
  },

  debug: (message, data = null) => {
    if (process.env.NODE_ENV === 'development') {
      const timestamp = new Date().toISOString();
      const log = `[${timestamp}] DEBUG: ${message}${data ? ' - ' + JSON.stringify(data) : ''}\n`;
      console.log(log);
      appendToLogFile(log);
    }
  },
};

function appendToLogFile(log) {
  const logFile = path.join(logsDir, `app-${new Date().toISOString().split('T')[0]}.log`);
  fs.appendFileSync(logFile, log);
}

module.exports = logger;
