import * as utils from "./utils.js";

function updateMainContainerPosition(mainContainer, sidebar)
{
    let sidebarComputedStyle = window.getComputedStyle(sidebar);

    mainContainer.style["marginLeft"] = utils.getFloatFromPixelMeasurementString(
        sidebarComputedStyle["left"]
    ) + utils.getActualWidthOfElement(sidebar) + "px";
}

function enable()
{
    let mainContainer = document.getElementById("mainContainer");

    let sidebar = document.getElementById("sidebar");

    updateMainContainerPosition(mainContainer, sidebar);

    addEventListener("resize", (uiEvent) =>
    {
        updateMainContainerPosition(mainContainer, sidebar);
    });
}

export {
    enable
};