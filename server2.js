const http = require('http');
const fs = require('fs');
const url = require('url');

const PORT = 3000;
const DATA_FILE = 'items.json';

// Helper function to read data from JSON file
const readDataFromFile = () => {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// Helper function to write data to JSON file
const writeDataToFile = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
};

// Helper function to find an item based on a key-value pair
const findItemByKey = (items, key, value) => {
  return items.find(item => item[key] && item[key] === value);
};

// Create the server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true); // Parse query params
  const path = parsedUrl.pathname;
  const method = req.method;

  // Extract key-value pair from query parameters
  const query = parsedUrl.query;
  const key = Object.keys(query)[0];  // e.g., 'name', 'id', 'username'
  const value = query[key];           // e.g., 'John', '3'

  // Handle GET /items
  if (path === '/items' && method === 'GET') {
    const items = readDataFromFile();

    // If a query is present, filter items based on key-value pair
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
      // If no query, return all items
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(items));
    }

  // Handle POST /items
  } else if (path === '/items' && method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const newItem = JSON.parse(body);
      const items = readDataFromFile();
      newItem.id = items.length ? items[items.length - 1].id + 1 : 1; // Auto-increment ID
      items.push(newItem);
      writeDataToFile(items);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newItem));
    });

  // Handle PUT /items?key=value
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

  // Handle DELETE /items?key=value
  } else if (path === '/items' && method === 'DELETE' && key && value) {
    const items = readDataFromFile();
    const filteredItems = items.filter(item => item[key] !== value); // Remove items with matching key-value
    if (items.length !== filteredItems.length) {
      writeDataToFile(filteredItems);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Item deleted' }));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Item not found' }));
    }

  // Handle unknown routes
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    //res.end(JSON.stringify({ message: 'Route not found' }));
  }
});

// Start listening on the specified port
server.listen(PORT, () => {
  console.log(`Server is listening on http://127.0.0.1:${PORT}/items`);
});
