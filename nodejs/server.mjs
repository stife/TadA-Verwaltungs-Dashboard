// server.mjs
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname } from 'node:path';

const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World!\n');
});

// starts a simple http server locally on port 3000
server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
});

// run with `node server.mjs`
server.on('request', async (req, res) => {
  let filePath = '';
  if (req.url === '/') {
    filePath = './test.htm';
  } else if (req.url === '/test.css') {
    filePath = './test.css';
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found\n');
    return;
  }

  try {
    const data = await readFile(filePath);
    const ext = extname(filePath);
    let contentType = 'text/plain';

    if (ext === '.htm' || ext === '.html') {
      contentType = 'text/html';
    } else if (ext === '.css') {
      contentType = 'text/css';
    }

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error\n');
  }
});