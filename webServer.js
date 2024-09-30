const http = require('http');
const fs = require('fs');
const data = fs.readFileSync('items.json','utf-8');
const port = 3000;

const server = http.createServer((req,res)=>{
  if (req.url == '/') {
    res.writeHead(200,{'Content-type':'text/html'});
    res.write(
      `<html>
        <style>
          button {background-color: green;}
        </style>
        <body style="text-align:center;">
          <h1 style="color:green;">Home Page</h1>
          <p>This home page was created as a response to the client via server
            lorem epsom blah blah blah blah blah blah bleh
            </p>
            <button><a href="/">Home</a></button>
            <button><a href="/about">About</a></button>
            <button><a href="/contact">Contact</a></button>
        </body>
      </html>`
    );
    res.end();
  }
  else if (req.url == "/about") {
    res.writeHeader(200,{'Content-Type':'text/html'});
    res.write(
      `<html>
        <body style="text-align:center;">
          <h1 style="color:green;">About Page</h1>
          <p>This About page was created as lorem epsom blah blah blah blah blah blah bleh a response to the client via server</p>
          <button><a href="/">Home</a></button>
          <button><a href="/about">About</a></button>
          <button><a href="/contact">Contact</a></button>
        </body>
      </html>`
    )
    res.end();
  }
  else if (req.url == "/contact") {
    res.writeHead(200,{'Content-Type':'text/html'});
    res.write(
      `<html>
        <body style="text-align:center;">
          <h1 style="color:green;">Contact Page</h1>
          <p>This Contact page was lorem epsom blah blah blah blah blah blah bleh created as a response to the client via server</p>
          <button><a href="/">Home</a></button>
          <button><a href="/about">About</a></button>
          <button><a href="/contact">Contact</a></button>
        </body>
      </html>`
    )
  }
  else res.end('Invalid Request!');
}).listen(port, ()=> console.log(`Server is running on http://127.0.0.1:${port}`));