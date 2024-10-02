const http = require('http');
const url = require('url');

let items = [
    {
        id:1,
        name: 'Shabbeer'
    },
    {
        id:2,
        name: 'Ibtishaam'
    },
];

const server = http.createServer((req,res)=>{
    const parsedUrl = url.parse(req.url, true);
    const method = req.method;

    // Set response header
    res.setHeader('Content-Type','application/json');

    if (method === 'GET') {
        if (parsedUrl.pathname === '/items') {
            res.writeHead(200);
            res.end(JSON.stringify(items));
        } else if (parsedUrl.pathname.startsWith('/items/')){
            const id = parseInt(parsedUrl.pathname.split('/')[2]);
            const item = items.find(i => i.id === id);
            if (item) {
                res.writeHead(200);
                res.end(JSON.stringify(item));
            } else {
                res.writeHead(404);
                res.end(JSON.stringify({message: 'Item was not found'}))
            }
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({message: 'Not Found'}))
        }
    }
    
// POST: Create a new item
    else if (method === 'POST' && parsedUrl.pathname === '/items') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const newItem = JSON.parse(body);
            newItem.id = items.length + 1; // simple ID assignment
            items.push(newItem);
            res.writeHead(201);
            res.end(JSON.stringify(newItem));
        });
    }

    // PUT: Update an existing item
    else if (method === 'PUT' && parsedUrl.pathname.startsWith('/items/')) {
        const id = parseInt(parsedUrl.pathname.split('/')[2]);
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const updatedItem = JSON.parse(body);
            const index = items.findIndex(i => i.id === id);
            if (index !== -1) {
                items[index] = { id, ...updatedItem };
                res.writeHead(200);
                res.end(JSON.stringify(items[index]));
            } else {
                res.writeHead(404);
                res.end(JSON.stringify({ message: 'Item not found' }));
            }
        });
    }

    // DELETE: Remove an item
    else if (method === 'DELETE' && parsedUrl.pathname.startsWith('/items/')) {
        const id = parseInt(parsedUrl.pathname.split('/')[2]);
        const index = items.findIndex(i => i.id === id);
        if (index !== -1) {
            items.splice(index, 1);
            res.writeHead(204);
            res.end();
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({ message: 'Item not found' }));
        }
    }
    

    else {
        res.writeHead(405);
        res.end(JSON.stringify({message: 'Method Not Allowed'}));
    }
});



server.listen(3000,()=>{
    console.log('server is running at http://localhost:3000/')
});