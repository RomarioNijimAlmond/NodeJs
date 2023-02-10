const http1 = require('http');
const url = require('url');
const fs = require('fs');
const { rejects } = require('assert');
const { isJSDocPublicTag } = require('typescript');

//function to replace template which takes a template and a product, we pass in our place hodler and replace with our product name
const replaceTemplate = (template, product) => {
    let output = template.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    if (!product.organic) {
        output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
        return output;
    }
}

//sync because we are executing these only once when we load these applications and they load in order
//loop through the array of the json object and for each of them repalce the placeholders in the templates with the actul data from the current product
//return something with a new array by using map
//call the replace template function (call back function)

const templateOverview = fs.readFileSync('./template-overview.html', 'utf-8');
const templateProduct = fs.readFileSync('./template-product.html', 'utf-8');
const templateCard = fs.readFileSync('./template-card.html', 'utf-8')

const data = fs.readFileSync('./data.json', 'utf-8');
const dataObj = JSON.parse(data);

const server = http1.createServer((req, res) => {
    const url = req.url;

    if (url === '/' || url === '/overview') {
        res.writeHead(200, { 'content-type': 'text/html' })
        const cardsHtml = dataObj.map(el => replaceTemplate(templateCard, el)).join('')
        const output = templateOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        res.end(output);
    } else if (url === '/product') {
        res.end(templateProduct);
    } else if (url === '/api') {
        res.writeHead(202, { 'content-type': 'application/json' });
        res.end(data);
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
