const http = require("http");
const url = require("url");
const fs = require("fs");
const { resolve } = require("path");
/////Server//////
//create and start a server to listen to incoming requests

async function readFileAsync(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, "utf-8", (err, data) => {
      if (err) reject(data);
      resolve(data);
    });
  });
}
const server = http.createServer(async (req, res) => {
  const pathName = req.url;
  //overview page
  if (pathName === "/" || pathName === "/overview") {
    const overviewData = await readFileAsync("/template-overview.html");
    log(overviewData);
    res.end("THIS IS OVERVIEW");
    //products page
  } else if (pathName === "/product") {
    const productData = await readFileAsync("./template-product.html");
    console.log(productData);
    res.end("THIS IS PRODUCT");
    //API
  } else if (pathName === "/api") {
    try {
      const data = await readFileAsync("./data.json");
      const jsonFileData = JSON.parse(data);
      res.writeHead(200, { "content-type": "application/json" });
      console.log(jsonFileData);
      res.end(data);
    } catch (err) {
      console.log(err);
    }
  } else {
    res.writeHead(404, {
      "content-type": "text/html",
      "my-own-http-header": "hello world",
    });
    res.end("<h1>this page is not found<h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("listening to requests on port 8000");
});

//routing means implementing different actions for different urls
//inilize URL
//module called url
