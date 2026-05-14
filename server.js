// Local preview server — run with: node server.js
const http = require('http');
const fs   = require('fs');
const path = require('path');

const PORT = 3000;
const ROOT = __dirname;

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

http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0]; // strip query string

  // Default to index.html for directory requests
  if (urlPath.endsWith('/')) urlPath += 'index.html';

  const filePath = path.join(ROOT, urlPath);
  const ext      = path.extname(filePath).toLowerCase();
  const mime     = MIME[ext] || 'text/plain';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      // Try appending /index.html for clean URLs
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
}).listen(PORT, () => {
  console.log('');
  console.log('  FraudFund Recovery — Local Preview Server');
  console.log('  ------------------------------------------');
  console.log(`  Open in browser: http://localhost:${PORT}`);
  console.log('');
  console.log('  Press Ctrl + C to stop the server.');
  console.log('');
});
