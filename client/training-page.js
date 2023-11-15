let logoutButton = document.getElementById("logout");

let menu_btn = document.querySelector("#menu_btn");

let sidebar = document.getElementById("sidebar");

let mainContainer = document.getElementById("mainContainer");

function updateSearchContainerPosition()
{
    let sidebarComputedStyle = window.getComputedStyle(sidebar);

    console.log(Utils.getFloatFromPixelMeasurementString(
        sidebarComputedStyle["left"]
    ));

    console.log(
        Utils.getFloatFromPixelMeasurementString(
            sidebarComputedStyle["left"]
        ) + Utils.getActualWidthOfElement(sidebar)
    );

    mainContainer.style["marginLeft"] = Utils.getFloatFromPixelMeasurementString(
        sidebarComputedStyle["left"]
    ) + Utils.getActualWidthOfElement(sidebar) + "px";
}

menu_btn.onclick = function(){
    sidebar.classList.toggle("active");
};

logoutButton.addEventListener("mousedown", (mouseEvent) =>
{
    window.location.href = "/";
});

document.addEventListener("resize", (uiEvent) =>
{
    updateSearchContainerPosition();
});

updateSearchContainerPosition();

