const http1 = require("http");
const urlModule = require("url");
const fs = require("fs");
const slugify = require("slugify");
const replaceTemplate = require("./modules/replaceTemplate");
//function to replace template which takes a template and a product, we pass in our place hodler and replace with our product name

//sync because we are executing these only once when we load these applications and they load in order
//loop through the array of the json object and for each of them repalce the placeholders in the templates with the actul data from the current product
//return something with a new array by using map
//call the replace template function (call back function)

const templateOverview = fs.readFileSync("./template-overview.html", "utf-8");
const templateProduct = fs.readFileSync("./template-product.html", "utf-8");
const templateCard = fs.readFileSync("./template-card.html", "utf-8");

const data = fs.readFileSync("./data.json", "utf-8");
const dataObj = JSON.parse(data);
const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs);

console.log(slugify("Fresh product", { lower: true }));

const server = http1.createServer((req, res) => {
  const pathname = urlModule.parse(req.url).pathname;
  const { query } = urlModule.parse(req.url, true);

  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "content-type": "text/html" });
    const cardsHtml = dataObj.map((el) => replaceTemplate(templateCard, el)).join("");
    const output = templateOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    res.end(output);
    console.log(cardsHtml);

  } else if (pathname === "/product") {
    const product = dataObj[query.id];
    const output = replaceTemplate(templateProduct, product);
    res.end(output);

  } else if (pathname === "/api") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(data);

  } else {
    res.writeHead(404, {
      "content-type": "text/html",
      "my-own-conent": "hello world",
    });

    res.end("<h1>content not found</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("listening to server!!");
});
