const http = require('http');

/////Server//////
//create and start a server to listen to incoming requests 
const server = http.createServer((req, res) => {
    res.end('hello from the server!!');
})


//listen to a server, expects a port and a host=> localHost 
server.listen(8000, '127.0.0.1', () => {
    
});