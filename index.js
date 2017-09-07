const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const mimeTypes = require('./mimeTypes');

// you can pass the parameter in the command line. e.g. node index.js 3000
const port = process.argv[2] || 8080;

http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  const parsedUrl = url.parse(req.url);
  let pathname = `./dist${parsedUrl.pathname}`;

  fs.exists(pathname, (exist) => {
    if (!exist) {
      res.statusCode = 404;
      res.end(`File not found!`);
      return;
    }
    // if is a directory, then look for index.html
    if (fs.statSync(pathname).isDirectory()) {
      pathname += '/index.html';
    }
    fs.readFile(pathname, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        const ext = path.parse(pathname).ext;
        res.setHeader('Content-type', mimeTypes[ext] || 'text/plain');
        res.end(data);
      }
    });
  });
})
  .listen(parseInt(port), () => {
    console.log(`Server listening on port ${port}`);
  });
