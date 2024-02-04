const http = require("http");

const https = require("https");

/**
 * 
 * @param {http.IncomingMessage} request
 * @returns {Promise<string>}
 */
function getRequestBody(request)
{
    return new Promise(
        (resolve, reject) =>
        {
            let requestBodyAsString = "";

            request.on("data", (chunk) =>
            {
                requestBodyAsString += chunk.toString("utf8");
            });

            request.on("end", () =>
            {
                resolve(requestBodyAsString);
            });
        }
    );
}

module.exports = {
    getRequestBody
};
