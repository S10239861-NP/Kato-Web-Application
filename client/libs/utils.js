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
    
        return this.getFloatFromPixelMeasurementString(elementComputedStyle["marginLeft"]) + this.getFloatFromPixelMeasurementString(elementComputedStyle["paddingLeft"]) + this.getFloatFromPixelMeasurementString(elementComputedStyle["width"]) + this.getFloatFromPixelMeasurementString(elementComputedStyle["marginRight"]) + this.getFloatFromPixelMeasurementString(elementComputedStyle["paddingRight"]);
    },
    /**
     * 
     * @param {HTMLElement} element 
     * @returns 
     */
    getActualHeightOfElement: function(element)
    {
        let elementComputedStyle = window.getComputedStyle(element);
    
        return this.getFloatFromPixelMeasurementString(elementComputedStyle["marginTop"]) + this.getFloatFromPixelMeasurementString(elementComputedStyle["paddingTop"]) + this.getFloatFromPixelMeasurementString(elementComputedStyle["height"]) + this.getFloatFromPixelMeasurementString(elementComputedStyle["marginBottom"]) + this.getFloatFromPixelMeasurementString(elementComputedStyle["paddingBottom"]);
    }
};
