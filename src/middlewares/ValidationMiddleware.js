const DirectoryUtils = require('../utils/DirectoryUtils');
const Logger = require('../utils/Logger');

const logger = new Logger();

class ValidationMiddleware {
  static validatePath(path) {
    try {
      if (typeof path !== 'string') {
        throw new Error('Invalid path: path must be a string');
      }

      // Split the path and validate each part
      const parts = path.split('/').filter(Boolean);

      for (const part of parts) {
        if (!DirectoryUtils.isValidDirectoryName(part)) {
          throw new Error(`Invalid directory name: ${part}`);
        }
      }

      return true;
    } catch (error) {
      logger.logError('ERR', path, error.message);
    }
  }
}

module.exports = ValidationMiddleware;
