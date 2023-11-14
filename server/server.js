const http = require("http");

const url = require("url");

const fs = require("fs");

const istextorbinary = require("istextorbinary");

const sqlite = require("sqlite3");

const serverHostName = "127.0.0.1";

const serverPort = 3000;

/**
 * 
 * @param {NodeJS.ErrnoException} error 
 */
function logError(error)
{
    console.log(`Error code: ${error.code}`);

    console.log(`Error name: ${error.name}`);

    console.log(`Error message: ${error.message}`);

    console.log(`Error path: ${error.path}`);

    console.log(`Error errno: ${error.errno}`);

    console.log(`Error syscall: ${error.syscall}`);

    console.log(`Error stack trace:\n${error.stack}\n`);
}

/**
 * 
 * @param {url.URL} requestURL 
 * @param {http.ServerResponse} response 
 */
function handleResourceRequest(requestURL, response)
{
    let targetResourceFilePath = "";

    if (requestURL.pathname != "/")
    {
        targetResourceFilePath = "./client" + requestURL.pathname;
    }
    else
    {
        targetResourceFilePath = "./client" + landingPageResourcePath;
    }

    fs.readFile(targetResourceFilePath, (error, dataBuffer) =>
    {
        if (error != null)
        {
            console.error(
                `An error occurred while attempting to fetch a requested resource.`
            );

            logError(error);

            return;
        }

        response.writeHead(200, "Success");

        if (istextorbinary.isText(targetResourceFilePath) == true)
        {
            response.write(dataBuffer.toString("utf8"));
        }
        else
        {
            response.write(dataBuffer);
        }

        response.end();
    });
}

/**
 * 
 * @param {http.IncomingMessage} request 
 * @param {http.ServerResponse} response 
 */
function onRequestReceived(request, response)
{
    let requestURL = new URL(request.url, "http://localhost:3000");

    if (request.method == "GET")
    {
        let requestURLPathParts = requestURL.pathname.split("/");

        let requestURLPathLastPart = requestURLPathParts[requestURLPathParts.length - 1];

        if (requestURL.pathname == "/" || requestURLPathLastPart.includes(".") == true)
        {
            handleResourceRequest(requestURL, response);

            return;
        }
    }
    else if (request.method == "POST")
    {
        if (requestURL.pathname == "/login")
        {
            let requestBody = "";

            request.on("data", (chunk) =>
            {
                requestBody += chunk;
            });

            request.on("end", () =>
            {
                let requestBodyObj = JSON.parse(requestBody);


            });
        }
    }

    response.writeHead(404, "Not Found");

    response.end();
}

function start()
{
    katoDB.serialize(() =>
    {
        if (setupKatoDB == true)
        {
            katoDB.run(
                `CREATE TABLE Employees (
                    StaffID TEXT PRIMARY KEY,
                    Password TEXT,
                    FirstName TEXT,
                    LastName TEXT
                );`
            );
    
            katoDB.run(
                `INSERT INTO Employees VALUES (
                    'S001',
                    'abc',
                    'John',
                    'Doe'
                );`
            );
        
            katoDB.run(
                `INSERT INTO Employees VALUES (
                    'S002',
                    'def',
                    'Jane',
                    'Doe'
                );`
            );
        
            katoDB.run(
                `INSERT INTO Employees VALUES (
                    'S003',
                    'ghi',
                    'Mary',
                    'Poppins'
                );`
            );
        }
    });

    server.listen(
        serverPort,
        serverHostName,
        null,
        () =>
        {
            console.log(`Server started.`);
    
            console.log(`Listening on port ${serverPort}...`);
        }
    );
}

let server = http.createServer(onRequestReceived);

let landingPageResourcePath = "/index.html";

let katoDBFilePath = __dirname + "/databases/Kato-DB.db";

let katoDB = null;

let setupKatoDB = false;

if (fs.existsSync(katoDBFilePath) == false)
{
    setupKatoDB = true;
}

katoDB = new sqlite.Database(katoDBFilePath, sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE, (error) =>
{
    if (error != null)
    {
        console.log("An error occurred while attempting to connect to the database.");

        logError(error);

        return;
    }

    start();
});
