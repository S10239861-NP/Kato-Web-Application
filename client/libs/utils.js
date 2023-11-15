/**
 * The Utils library.
 * @type {object}
 */
let Utils = {
    /**
     * 
     * @param {string} measurementString 
     * @returns 
     */
    getFloatFromPixelMeasurementString: function(measurementString)
    {
        return parseFloat(measurementString.replace("px", ""));
    },
    /**
     * 
     * @param {HTMLElement} element 
     * @returns 
     */
    getActualWidthOfElement: function(element)
    {
        let elementComputedStyle = window.getComputedStyle(element);
    
        return this.getFloatFromPixelMeasurementString(elementComputedStyle["paddingLeft"]) + this.getFloatFromPixelMeasurementString(elementComputedStyle["width"]) + this.getFloatFromPixelMeasurementString(elementComputedStyle["paddingRight"]);
    }
};
