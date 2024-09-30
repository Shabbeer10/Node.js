const {createServer} = require("node:http")
const fs = require("fs")
const hostname = "127.0.0.1";
const port = 3000;
const DATA_FILE = 'items.json';
const data = fs.readFileSync(DATA_FILE, 'utf-8');
JSON.parse(data);
const server = createServer((req,res) =>{
  res.statusCode =200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello Shabbeer");

  const filteredItem = findItemByKey(items, key, value);
  if (filteredItem) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(filteredItem));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Item not found' }));
  }
});

server.listen(port, hostname, ()=>{
  console.log(`Shabbeer! Server is running at http://${hostname}:${port}`);
});