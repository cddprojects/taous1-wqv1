// Local preview server — run with: npm start  (or: node server.js)
const http = require('http');
const fs   = require('fs');
const path = require('path');

const ROOT = __dirname;
const PRIMARY = Number(process.env.PORT) || 3000;
const EXTRA = PRIMARY === 3001 ? 3000 : 3001;
const PORTS = process.env.PORT ? [PRIMARY] : [PRIMARY, EXTRA];

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
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end('<h2>404 — Page not found</h2><a href="/">Go Home</a>');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(data2);
        }
      });
    } else {
      res.writeHead(200, { 'Content-Type': mime });
      res.end(data);
    }
  });
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
  server.listen(port, '0.0.0.0', () => {
    console.log(`  Open in browser: http://localhost:${port}`);
  });
}

console.log('');
console.log('  FraudFund Recovery — Local Preview Server');
console.log('  ------------------------------------------');
PORTS.forEach(listen);
console.log('');
