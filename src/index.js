const readline = require('readline');
const processCommand = require('./app');
const Logger = require('./utils/logger');

const logger = new Logger();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (input) => {
  processCommand(input);
});

logger.log('File System Simulator');
logger.log('Enter commands (CREATE, LIST, DELETE, MOVE). Only one command at a time.');

// Keep the program running
setInterval(() => {}, 1000);
