/* Promise -------------------------------------------------------------
function fetchData(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = "Data fetched from server";
            resolve(data); // Simulates successful data fetching
        },2000);
    });
}

fetchData()
    .then((data) => {
        console.log(data); // Handles the resolved promise
    })
    .catch((error) =>{
        console.error("there was an error"); // handles any errors that occur
    });
*/

/* Async -------------------------------------------------------------
async function fetchData(){
    try {
        const data = await new Promise((resolve, reject) =>{
            setTimeout(() => {
                resolve("Data fetched from server");
            }, 2000);
        });
        console.log(data); // This will run after the promise is resolved
    }
    catch (error) {
        console.error("unable to fetch data"); // handles any errors that occur
    }
}

fetchData();
*/
/*
function divideNumbers(a,b){
    try {
        if (b === 0 || a === 0){
            throw new Error("Division by zero is not allowed.");
        }
        let result = a / b;
        console.log(`Result: ${result}`)
    }
    catch (error) {
        console.error(`Error Message: ${error.message}`);
    }
    finally {
        console.log("Division operation attempted.");
    }
}

divideNumbers(10,2); // outputs try and finally functions
divideNumbers(10,0); // Outputs the catch and finally functions
*/
/*
async function fetchData() {
    try {
        let response = await fetch("https://api.example.com/data");
        let data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Error fetching data, check connectivity:", error);
    }
}

fetchData()
*/
/* create a server --------------------------------------------------
const http = require("node:http");
const fs = require("fs")

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.write("Hello, Shabbeer! The server is running\n")
    fs.readFile("index.html", function(error,data) {
        if(error) {
            res.writeHead(404);
            res.write("Not found");
        }
        else{ res.write(data)}
        res.end();
    })
    
    
});

server.listen(port, hostname, () =>{
    console.log(`server running at http://${hostname}:${port}/`)
});
*/

const http = require('http'); // require() is used to import modules
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

// Create the server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;

  // Handle GET /items
  if (path === '/items' && method === 'GET') {
    const items = readDataFromFile();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(items));

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

  // Handle PUT /items/:id
  } else if (path.startsWith('/items/') && method === 'PUT') {
    const id = parseInt(path.split('/')[2]);
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const updatedItem = JSON.parse(body);
      const items = readDataFromFile();
      const index = items.findIndex(item => item.id === id);
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

  // Handle DELETE /items/:id
  } else if (path.startsWith('/items/') && method === 'DELETE') {
    const id = parseInt(path.split('/')[2]);
    const items = readDataFromFile();
    const filteredItems = items.filter(item => item.id !== id);
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
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
});


// Start listening on the specified port
server.listen(PORT, () => {
  console.log(`Server is listening on  http://127.0.0.1:${PORT}/items`);
});
