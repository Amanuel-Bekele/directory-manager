const readline = require('readline');
const processCommand = require('./app');
const Logger = require('./utils/Logger');

const logger = new Logger();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (input) => {
  processCommand(input);
});

logger.log('File System Simulator');
logger.log('Enter commands (CREATE, LIST, DELETE, MOVE):');
