class Logger {
  /**
   * Logs an info message in green to the console.
   *
   * @param {string} message - The message to log.
   */
  log(message) {
    console.log('\x1b[32m%s\x1b[0m', message);
  }

  /**
   * Logs a standardized red error message to the console.
   *
   * @param {string} type - The command type that threw error (e.g., CREATE, DELETE).
   * @param {string} path - The path involved in the action.
   * @param {string} reason - The reason for the error.
   */
  logError(type, path, reason) {
    console.log('\x1b[31m%s\x1b[0m', `${type}, ${path}, ${reason}`);
  }
}

module.exports = Logger;
