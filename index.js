const http = require('http');

const app = require('./server/app');

// Get port from environment and store in Express.
const port = normalizePort(process.env.PORT || '5000');

// Create HTTP server
const server = http.createServer(app);

function normalizePort(value) {
  const parsedPort = parseInt(value, 10);

  if (isNaN(parsedPort)) {
    return value;
  }

  if (parsedPort >= 0) {
    return parsedPort;
  }

  return false;
}

// Event listener for HTTP server "error" event
function onError(err) {
  if (err.syscall !== 'listen') {
    throw err;
  }
}

/**
 * Event listener for HTTP server "listen" event.
 */

server.listen(port, () => {
  console.info(`Listening on http://localhost:${port}`);
});