/**
 * 
 * @param {string} measurementString 
 * @returns 
 */
function getFloatFromPixelMeasurementString(measurementString)
{
    return parseFloat(measurementString.replace("px", ""));
}

/**
 * 
 * @param {HTMLElement} element 
 * @returns 
 */
function getActualWidthOfElement(element)
{
    let elementComputedStyle = window.getComputedStyle(element);
    
    return getFloatFromPixelMeasurementString(elementComputedStyle["marginLeft"]) + getFloatFromPixelMeasurementString(elementComputedStyle["paddingLeft"]) + getFloatFromPixelMeasurementString(elementComputedStyle["width"]) + getFloatFromPixelMeasurementString(elementComputedStyle["marginRight"]) + getFloatFromPixelMeasurementString(elementComputedStyle["paddingRight"]);
}

/**
 * 
 * @param {HTMLElement} element 
 * @returns 
 */
function getActualHeightOfElement(element)
{
    let elementComputedStyle = window.getComputedStyle(element);
    
    return getFloatFromPixelMeasurementString(elementComputedStyle["marginTop"]) + getFloatFromPixelMeasurementString(elementComputedStyle["paddingTop"]) + getFloatFromPixelMeasurementString(elementComputedStyle["height"]) + getFloatFromPixelMeasurementString(elementComputedStyle["marginBottom"]) + getFloatFromPixelMeasurementString(elementComputedStyle["paddingBottom"]);
}

function getViewportSize()
{
    let viewportWidth = window.screen.width;

    let viewportHeight = window.screen.height;

    return {
        viewportWidth: viewportWidth,
        viewportHeight: viewportHeight
    };
}

/**
 * 
 * @param {XMLHttpRequest} request 
 * @returns 
 */
function waitForResponse(request)
{
    return new Promise(
        (resolve, reject) =>
        {
            request.onreadystatechange = (event) =>
            {
                if (request.readyState == XMLHttpRequest.DONE)
                {
                    resolve();
                }
            };
        }
    );
}

/**
 * 
 * @param {XMLHttpRequest} request 
 */
async function getResponseText(request)
{
    await waitForResponse(request);

    return request.responseText;
}

/**
 * 
 * @param {number} minValue An inclusive minimum value.
 * @param {number} maxValue An inclusive maximum value.
 */
function getRandomInteger(minValue, maxValue)
{
    return Math.floor(
        Math.random() * maxValue
    ) + minValue;
}

export {
    getFloatFromPixelMeasurementString,
    getActualWidthOfElement,
    getActualHeightOfElement,
    getViewportSize,
    waitForResponse,
    getResponseText,
    getRandomInteger,
};