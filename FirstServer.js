const http = require("http");

const requestHandler = require('./RequestHandler');


const firstServer = http.createServer(requestHandler);

firstServer.listen(3000);



