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

export {
    getFloatFromPixelMeasurementString,
    getActualWidthOfElement,
    getActualHeightOfElement
};