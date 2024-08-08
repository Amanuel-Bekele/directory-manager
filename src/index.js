const readline = require('readline');
const http = require('http');
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

// Create HTTP server - this is just to keep the program running on Replit
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('File System Simulator\n  Enter commands (CREATE, LIST, DELETE, MOVE) in the console below.');
});

// Start the server
const port = process.env.PORT || 3000;
server.listen(port, () => {
  logger.log(`Server running on port ${port}`);
});

