function main()
{
    let mainContainer = document.getElementById("mainContainer");

    let sidebar = document.getElementById("sidebar");

    function updateMainContainerPosition()
    {
        let sidebarComputedStyle = window.getComputedStyle(sidebar);

        mainContainer.style["marginLeft"] = Utils.getFloatFromPixelMeasurementString(
            sidebarComputedStyle["left"]
        ) + Utils.getActualWidthOfElement(sidebar) + "px";
    }

    updateMainContainerPosition();

    addEventListener("resize", (uiEvent) =>
    {
        updateMainContainerPosition();
    });
}

main();
