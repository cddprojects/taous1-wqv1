// If a preview is already serving, stay alive instead of crashing.
// Cursor's "Start remote server" retries npm start; a second bind would
// EADDRINUSE and loop. Holding this process open stops that retry.
const http = require('http');

function isUp(port) {
  return new Promise((resolve) => {
    const req = http.get({ host: '127.0.0.1', port, path: '/', timeout: 800 }, (res) => {
      res.resume();
      resolve(res.statusCode > 0);
    });
    req.on('error', () => resolve(false));
    req.on('timeout', () => {
      req.destroy();
      resolve(false);
    });
  });
}

(async () => {
  if ((await isUp(3001)) || (await isUp(3000))) {
    console.log('Preview already running on 3000/3001. Holding this process open.');
    setInterval(() => {}, 1 << 30);
    return;
  }
  require('./server.js');
})();
