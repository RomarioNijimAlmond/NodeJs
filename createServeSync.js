const http1 = require('http');
const url = require('url');
const fs = require('fs');
const { rejects } = require('assert');
const { isJSDocPublicTag } = require('typescript');

//sync because we are executing these only once when we load these applications and they load in order

const templateOverview = fs.readFileSync('./template-overview.html', 'utf-8');
const templateProduct = fs.readFileSync('./template-product.html', 'utf-8');
const templateCard = fs.readFileSync('./template-card.html', 'utf-8')

const data = fs.readFileSync('./data.json', 'utf-8');
const dataObj = JSON.parse(data);

const server = http1.createServer((req, res) => {
    const url = req.url;

    if (url === '/' || url === '/overview') {
        res.end(templateOverview);
        res.writeHead(200, { 'content-type': 'text/html' })
    } else if (url === '/product') {
        res.end(templateProduct);
    } else if (url === '/api') {
        res.writeHead(202, { 'content-type': 'application/json' });
        res.end(data);

        // try {
        //     await res.writeHead(200, { 'content-type': 'application/json' })
        //     fs.readFile('./data.json', 'utf-8', (err, data) => {
        //         if (err) {
        //             console.log('error was thrown when switching to the API route');
        //         } else {
        //             const parseJson = JSON.parse(data);
        //             console.log(parseJson);

        //         }
        //     })

        // } catch (err) {
        //     console.error('SOMETHING WRONG WITH SERVER');
        // }
    } else {
        res.writeHead(404, {
            "content-type": 'text/html',
            "my-own-conent": "hello world"
        })

        res.end('<h1>content not found</h1>')
    }
})

server.listen(8000, '127.0.0.1', () => {
    console.log('listening to server!!');
});
