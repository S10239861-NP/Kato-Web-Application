const http = require("http");

const serverHostName = "127.0.0.1";

const serverPort = 3000;

function onRequestReceived(request, response)
{
    if (request.url == "/")
    {
        
    }
}

let server = http.createServer(onRequestReceived);

server.listen(
    serverPort,
    serverHostName,
    null,
    () =>
    {
        console.log(`Server started.`);

        console.log(`Listening on ${serverPort}...`);
    }
);
