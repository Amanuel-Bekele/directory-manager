const DirectoryService = require('./services/DirectoryService');
const { validatePath } = require('./middlewares/ValidationMiddleware');
const Logger = require('./utils/logger');

const ds = new DirectoryService();
const logger = new Logger();

function processCommand(input) {
  const [command, ...args] = input.split(' ');
  args.forEach((arg) => validatePath(arg.trim()));

  try {
    switch (command.toUpperCase()) {
      case 'CREATE':
        ds.create(args[0]);
        break;
      case 'LIST':
        logger.log(ds.list(args[0]));
        break;
      case 'DELETE':
        ds.delete(args[0]);
        break;
      case 'MOVE':
        ds.move(args[0], args[1]);
        break;
      default:
        throw new Error('Invalid command: Enter commands (CREATE, LIST, DELETE, MOVE)');
    }
  } catch (error) {
    logger.logError(`ERR: ${error.message}`);
  }
}

module.exports = processCommand;
