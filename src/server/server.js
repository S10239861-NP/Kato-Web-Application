const http = require("http");

const url = require("url");

const fs = require("fs");

const istextorbinary = require("istextorbinary");

const sqlite = require("sqlite3");

const jwt = require("jsonwebtoken");

const cookie = require("cookie");

const { error } = require("console");

const path = require("path");

const httpExtra = require("./libs/http-extra");

const jwtSecret = "0RAeW74P3LMFUSX";

const serverHostName = "127.0.0.1";

const serverPort = 3000;

let currentFolderPath = __dirname;

let projectRootFolderPath = path.resolve(currentFolderPath, "..", "..");

/**
 * The "public" folder is the root folder containing all of the resources that a client can request from the server (e.g. HTML
 * files, CSS files, JS files etc).
 */
let publicFolderPath = path.resolve(projectRootFolderPath, "public");

let landingPageHTMLFilePath = path.resolve(publicFolderPath, "index.html");

let katoDBFilePath = path.resolve(currentFolderPath, "Kato-DB.db");

let routesRequiringAuth = [
    "/dashboard.html",
    "/training-page.html"
];

/**
 * The main backend server for the Kato web application.
 * @type {http.Server}
 */
let server = http.createServer(onRequestReceived);

/**
 * The main database for the Kato web application.
 * @type {sqlite.Database}
 */
let katoDB = null;

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
 * @param {http.ServerResponse} response
 */
function returnInternalErrorResponse(response)
{
    fs.readFile(path.resolve(publicFolderPath, "internal-server-error-page.html"), "utf8", (error, data) =>
    {
        if (error != null)
        {
            console.error(
                `An error occurred while attempting to read the contents of the HTML file for the Internal Server Error webpage.`
            );

            logError(error);

            return;
        }

        response.writeHead(500, "Internal Server Error");

        response.write(
            data
        );

        response.end();
    });
}

/**
 * 
 * @param {http.ServerResponse} response
 */
function returnNotFoundResponse(response)
{
    fs.readFile(path.resolve(publicFolderPath, "404-not-found-page.html"), "utf8", (error, data) =>
    {
        if (error != null)
        {
            console.error(
                `An error occurred while attempting to read the contents of the HTML file for the 404 Not Found webpage.`
            );

            logError(error);

            returnInternalErrorResponse(response);

            return;
        }

        response.writeHead(404, "Not Found");

        response.write(data);

        response.end();
    });
}

/**
 * 
 * @param {http.ServerResponse} response
 */
function returnAccessDeniedResponse(response)
{
    fs.readFile(path.resolve(publicFolderPath, "access-denied-page.html"), "utf8", (error, data) =>
    {
        if (error != null)
        {
            console.error(
                `An error occurred while attempting to read the contents of the HTML file for the Access Denied webpage.`
            );

            logError(error);

            returnInternalErrorResponse(response);

            return;
        }

        response.writeHead(403, "Forbidden");

        response.write(data);

        response.end();
    });
}

/**
 * Warning: Do not use this function as it might break if there are multiple cookies (with 1 or more cookies having a specified
 * expiry date and time) and return incorrect or misleading values. Use the "cookie" library instead.
 * @param {http.IncomingMessage} request
 */
function getCookies(request)
{
    let cookies = [];

    if (request.headers.cookie == undefined)
    {
        return cookies;
    }

    let cookieKeyValuePairs = request.headers.cookie.split(";");

    for (const cookieKeyValuePair of cookieKeyValuePairs)
    {
        let cookieKeyValuePairParts = cookieKeyValuePair.split("=");

        let cookieKey = cookieKeyValuePairParts[0];

        let cookieValue = cookieKeyValuePairParts[1];

        cookies.push(
            {
                key: cookieKey,
                value: cookieValue
            }
        );
    }

    return cookies;
}

/**
 * 
 * @param {http.IncomingMessage} request
 * @param {string} cookieKey
 * @returns {boolean}
 */
function hasCookie(request, cookieKey)
{
    /*
    Do not use the commented out implementation of this function as it relies on another function (called "getCookies") that might
    break if there are multiple cookies (with 1 or more cookies having a specified expiry date and time).
    */
    /*
    let requestCookies = getCookies(request);

    for (const requestCookie of requestCookies)
    {
        if (requestCookie.key == cookieKey)
        {
            return true;
        }
    }

    return false;
    */

    if (request.headers.cookie == undefined)
    {
        return false;
    }

    let requestCookies = cookie.parse(request.headers.cookie);

    if (requestCookies[cookieKey] == undefined)
    {
        return false;
    }

    return true;
}

/**
 * 
 * @param {http.IncomingMessage} request
 * @returns {boolean}
 */
function verifyAuthToken(request)
{
    if (request.headers.cookie == undefined)
    {
        return false;
    }

    let requestCookies = cookie.parse(request.headers.cookie);

    if (requestCookies["authToken"] == undefined)
    {
        return false;
    }

    try
    {
        jwt.verify(requestCookies["authToken"], jwtSecret);
    }
    catch (error)
    {
        return false;
    }

    return true;
}

/**
 * 
 * @param {http.IncomingMessage} request
 * @param {url.URL} requestURL
 * @param {http.ServerResponse} response
 */
function handleResourceRequest(request, requestURL, response)
{
    let targetResourceFilePath = "";

    let requestURLPathParts = requestURL.pathname.split("/");

    let requestedResourceName = requestURLPathParts[requestURLPathParts.length - 1];

    if (requestURL.pathname != "/")
    {
        if (routesRequiringAuth.includes(requestURL.pathname) == true && verifyAuthToken(request) == false)
        {
            returnAccessDeniedResponse(response);

            return;
        }

        let requestedResourceRelativePath = requestURL.pathname.substring(1);

        targetResourceFilePath = path.resolve(publicFolderPath, requestedResourceRelativePath);
    }
    else
    {
        targetResourceFilePath = landingPageHTMLFilePath;
    }

    fs.readFile(targetResourceFilePath, (error, dataBuffer) =>
    {
        if (error != null)
        {
            console.error(
                `An error occurred while attempting to fetch a requested resource.`
            );

            logError(error);

            returnNotFoundResponse(response);

            return;
        }

        let responseHeaders = {};

        if (requestURL.pathname == "/")
        {
            responseHeaders["set-cookie"] = cookie.serialize(
                "authToken",
                "",
                {
                    expires: new Date(0)
                }
            );
        }
        
        if (path.extname(targetResourceFilePath) == ".js")
        {
            responseHeaders["content-type"] = "text/javascript";
        }

        response.writeHead(
            200,
            "Success",
            responseHeaders
        );

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

function getOnboardingEmployeeFromDB(staffID, password)
{
    return new Promise(
        (resolve, reject) =>
        {
            katoDB.all(
                `SELECT * FROM OnboardingEmployees WHERE StaffID = ? AND Password = ?;`,
                [staffID, password],
                (error, rows) =>
                {
                    if (error != null)
                    {
                        console.log(
                            "An error occurred while attempting to fetch rows from the Employees table of the main database."
                        );
        
                        logError(error);

                        resolve(null);

                        return;
                    }
                    
                    if (rows.length == 0)
                    {
                        resolve(null);

                        return;
                    }

                    resolve(rows[0]);
                }
            );
        }
    );
}

function getAllTrainingModulesFromDB()
{
    return new Promise(
        (resolve, reject) =>
        {
            katoDB.all("SELECT * FROM Training;", [], (error, rows) =>
            {
                if (error != null)
                {
                    logError(error);

                    return;
                }

                let allTrainingModules = [];

                for (const row of rows)
                {
                    allTrainingModules.push(
                        {
                            name: row.Name,
                            description: row.Description
                        }
                    );
                }

                resolve(allTrainingModules);
            });
        }
    );
}

function getLessonsForTrainingModule(trainingModuleName)
{
    return new Promise(
        (resolve, reject) =>
        {
            katoDB.all(
                `SELECT * FROM TrainingModuleLessons WHERE TrainingModuleLessons.TrainingModuleName = '?';`,
                [trainingModuleName],
                (error, rows) =>
                {
                    if (error != null)
                    {
                        logError(error);

                        return;
                    }

                    let lessonsForTrainingModule = [];

                    for (const row of rows)
                    {
                        lessonsForTrainingModule.push(
                            {
                                name: row.Name,
                                trainingModuleName: row.TrainingModuleName,
                                description: row.Description,
                                estimatedNumMinutesToComplete: row.EstimatedNumMinutesToComplete
                            }
                        );
                    }

                    resolve(lessonsForTrainingModule);
                }
            );
        }
    );
}

function getOnboardingEmployee(staffID)
{
    return new Promise(
        (resolve, reject) =>
        {
            katoDB.get(
                "SELECT * FROM OnboardingEmployees WHERE OnboardingEmployees.StaffID = ?;",
                [staffID],
                (error, row) =>
                {
                    if (error != null)
                    {
                        logError(error);

                        resolve(null);

                        return;
                    }

                    resolve(row);
                }
            );
        }
    );
}

/**
 * Returns a list of members in the team that the onboarding employee is assigned to.
 */
function getMembersOfTeamForOnboardingEmployeeFromDB(onboardingEmployeeStaffID)
{
    return new Promise(
        async (resolve, reject) =>
        {
            let onboardingEmployee = await getOnboardingEmployee(onboardingEmployeeStaffID);

            katoDB.all(
                "SELECT * FROM Employees WHERE Employees.TeamID = ?;",
                [onboardingEmployee.TeamID],
                (error, rows) =>
                {
                    if (error != null)
                    {
                        logError(error);

                        resolve(null);

                        return;
                    }

                    resolve(rows);
                }
            );
        }
    );
}

/**
 * 
 * @param {http.IncomingMessage} request 
 * @param {http.ServerResponse} response 
 */
async function onRequestReceived(request, response)
{
    let requestURL = new URL(request.url, `http://localhost:${serverPort}`);

    if (request.method == "GET")
    {
        let requestURLPathParts = requestURL.pathname.split("/");

        let requestURLPathLastPart = requestURLPathParts[requestURLPathParts.length - 1];

        if (requestURL.pathname == "/" || requestURLPathLastPart.includes(".") == true)
        {
            handleResourceRequest(request, requestURL, response);

            return;
        }
    }
    else if (request.method == "POST")
    {
        if (requestURL.pathname == "/login")
        {
            let requestBody = await httpExtra.getRequestBody(
                request
            );

            let requestBodyObj = JSON.parse(requestBody);

            let employee = await getOnboardingEmployeeFromDB(
                requestBodyObj.staffID,
                requestBodyObj.password
            );

            if (employee != null)
            {
                jwt.sign(
                    employee,
                    jwtSecret,
                    (jwtSigningError, token) =>
                    {
                        if (jwtSigningError != null)
                        {
                            console.log("An error occurred while attempting to sign a JSON web token.");

                            logError(jwtSigningError);

                            returnInternalErrorResponse(response);

                            return;
                        }

                        response.writeHead(200, "Success", {
                            "set-cookie": cookie.serialize("authToken", token)
                        });

                        response.write(
                            ""
                        );

                        response.end();
                    }
                );
            }
            else
            {
                response.writeHead(200, "Success");

                response.write(
                    "Incorrect credentials."
                );

                response.end();
            }

            return;
        }
        
        if (requestURL.pathname == "/get-all-training-modules")
        {
            let allTrainingModules = await getAllTrainingModulesFromDB();

            response.writeHead(200, "Success");

            response.write(JSON.stringify(allTrainingModules));

            response.end();

            return;
        }

        if (requestURL.pathname == "/get-lessons-for-training-module")
        {
            let requestBody = await httpExtra.getRequestBody(
                request
            );

            let requestBodyObj = JSON.parse(requestBody);

            let lessonsForTrainingModule = await getLessonsForTrainingModule(
                requestBodyObj.trainingModuleName
            );

            response.writeHead(200, "Success");

            response.write(
                JSON.stringify(lessonsForTrainingModule)
            );

            response.end();

            return;
        }

        if (requestURL.pathname == "/get-team-members-for-onboarding-employee")
        {
            let requestBody = await httpExtra.getRequestBody(
                request
            );

            let requestBodyObj = JSON.parse(requestBody);

            let teamMembersForOnboardingEmployee = await getMembersOfTeamForOnboardingEmployeeFromDB(
                requestBodyObj.onboardingEmployeeStaffID
            );

            response.writeHead(200, "Success");

            response.write(
                JSON.stringify(teamMembersForOnboardingEmployee)
            );

            response.end();

            return;
        }

        if (requestURL.pathname == "/get-staff-id-of-current-user")
        {
            let requestCookies = cookie.parse(request.headers.cookie);

            let authToken = jwt.decode(
                requestCookies["authToken"]
            );

            response.writeHead(200, "Success");

            response.write(authToken.StaffID);

            response.end();

            return;
        }
    }

    returnNotFoundResponse(response);
}

function start()
{
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

/*
For future reference:
We will be using JSON web tokens (JWTs) for authentication (user authentication).

We will be using cookies to allow the browser (client) to automatically send the token (that the client receives only after a
successful login) along with every request (regardless of whether it is a "GET" request, "POST" request or another type of request).

Making use of cookies will also allow us to enforce that certain webpages can only be accessed by clients that have logged in
successfully to an account (as cookies are automatically sent with every "GET" request).

There are 3 ways we can send a token with a "GET" request to the server:
- As a URL query parameter.
- As a cookie.
- Using XMLHttpRequest and including the token in its body or as a separate header.

Disadvantages of sending a token as a URL query parameter:
- The token will be visible in the user's browser history (which they might not clear) and in server logs, if the token has not expired
yet, this could allow a threat actor with access to the user's browser history or the server logs to impersonate the actual user.

Disadvantages of sending a token in the body or as a separate header in an XMLHttpRequest:
- This method cannot be used for ensuring that the browser sends the token with each "GET" request made to the server for a resource
(e.g. a HTML, CSS, JS, or image file etc).

Additional notes regarding cookies:
- By default, cookies are cleared once the user closes their browser.
- A cookie can be deleted by setting its expiry date to a past date.
- Cookies can be set on the browser by a response from the server by setting the value of the "Set-Cookie" header (for the response).
*/
