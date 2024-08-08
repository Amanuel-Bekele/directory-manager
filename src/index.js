const readline = require('readline');
const http = require('http');
const processCommand = require('./app');
const Logger = require('./utils/Logger');

const logger = new Logger();
const port = process.env.PORT || 3000;

// Create a minimal HTTP server
const server = http.createServer();

// Respond to basic health check endpoint
server.on('request', (req, res) => {
  if (req.url === '/') {
    // Health check endpoint
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('File System Simulator is running');
    res.end();
  }
});

server.on('error', (error) => {
  logger.logError(`ERR: Server error: ${error.message}`);
});

// Start the server
server.listen(port, () => {
  // Initialize readline interface after server starts
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on('line', (input) => {
    processCommand(input);
  });

  logger.log('File System Simulator');
  logger.log('Enter commands (CREATE, LIST, DELETE, MOVE). One command at a time.');
});
