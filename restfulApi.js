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

    else {
        res.writeHead(405);
        res.end(JSON.stringify({message: 'Method Not Allowed'}));
    }
});



server.listen(3000,()=>{
    console.log('server is running at http://localhost:3000/')
});