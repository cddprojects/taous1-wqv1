// Local preview server — run with: npm start  (or: node server.js)
const http = require('http');
const fs   = require('fs');
const path = require('path');

const ROOT = __dirname;
// Cursor Ports panel maps this VM port to the user's PC (e.g. 3000 → 3001).
// Do not also bind 3001 here — that fights the local forward.
const PORT = Number(process.env.PORT) || 3000;

const MIME = {
  '.html': 'text/html',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.woff2':'font/woff2',
  '.woff': 'font/woff',
};

function handler(req, res) {
  let urlPath = req.url.split('?')[0];

  if (urlPath.endsWith('/')) urlPath += 'index.html';

  const filePath = path.join(ROOT, urlPath);
  const ext      = path.extname(filePath).toLowerCase();
  const mime     = MIME[ext] || 'text/plain';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      const indexPath = path.join(ROOT, urlPath, 'index.html');
      fs.readFile(indexPath, (err2, data2) => {
        if (err2) {
          send(res, 404, 'text/html', Buffer.from('<h2>404 — Page not found</h2><a href="/">Go Home</a>'));
        } else {
          send(res, 200, 'text/html', data2);
        }
      });
    } else {
      send(res, 200, mime, data);
    }
  });
}

function send(res, status, mime, body) {
  res.writeHead(status, {
    'Content-Type': mime,
    'Content-Length': Buffer.byteLength(body),
    Connection: 'close',
  });
  res.end(body);
}

function listen(port) {
  const server = http.createServer(handler);
  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`  Port ${port} already in use — leaving the existing preview in place.`);
      return;
    }
    console.error(err);
  });
  // Dual-stack so both 127.0.0.1 and ::1 / localhost work.
  server.listen({ port, host: '::', ipv6Only: false }, () => {
    console.log(`  Open in browser: http://127.0.0.1:${port}  (also http://localhost:${port})`);
  });
}

console.log('');
console.log('  FraudFund Recovery — Local Preview Server');
console.log('  ------------------------------------------');
listen(PORT);
console.log('');
