const http = require('http');
const fs = require('fs');
const url = require('url');

const PORT = 3000;
const DATA_FILE = 'items.json';

// Function to read data from file with the data
const readDataFromFile = () => {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// Function to write data to the file
const writeDataToFile = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
};

// Function to find an item depending on what the key and value is.
const findItemByKey = (items, key, value) => {
  return items.find(item => item[key] && item[key] === value);
};

// Create the server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true); // Parse the url path
  const path = parsedUrl.pathname;
  const method = req.method;

  // Get the key-value from query parameters
  const query = parsedUrl.query;
  const key = Object.keys(query)[0];
  const value = parseInt(query[key]);

  // GET Method
  if (path === '/items' && method === 'GET') {
    const items = readDataFromFile();

    // If there is a query, filter items based on key-value
    if (key && value) {
      const filteredItem = findItemByKey(items, key, value);
      if (filteredItem) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(filteredItem));
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Item not found' }));
      }
    } else {
      // If there is no query, GET all items in the data file
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(items));
    }

  // POST Method
  } else if (path === '/items' && method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const newItem = JSON.parse(body);
      const items = readDataFromFile();
      // Add 1 to ID with a value greater than the last item's ID
      newItem.id = items.length ? items[items.length - 1].id + 1 : 1;
      items.push(newItem);
      writeDataToFile(items);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newItem));
    });

  // PUT Method
  } else if (path === '/items' && method === 'PUT' && key && value) {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const updatedItem = JSON.parse(body);
      const items = readDataFromFile();
      const index = items.findIndex(item => item[key] && item[key] === value);
      if (index !== -1) {
        items[index] = { ...items[index], ...updatedItem };
        writeDataToFile(items);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(items[index]));
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Item not found' }));
      }
    });

  // DELETE Method
  } else if (path === '/items' && method === 'DELETE' && key && value) {
    const items = readDataFromFile();
    // Remove items with matching key-value
    const filteredItems = items.filter(item => item[key] !== value); 
    if (items.length !== filteredItems.length) {
      writeDataToFile(filteredItems);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Item deleted' }));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Item not found' }));
    }

  // Error for unknown routes
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
});

// Listening for requests on port
server.listen(PORT, () => {
  console.log(`Server is listening on http://127.0.0.1:${PORT}/items`);
});
