let logoutButton = document.getElementById("logout");

let menu_btn = document.querySelector("#menu_btn");

let sidebar = document.getElementById("sidebar");

let searchContainer = document.getElementById("searchContainer");

let paddingContainer = document.getElementById("paddingContainer");

function updateSearchContainerPosition()
{
    let sidebarComputedStyle = window.getComputedStyle(sidebar);

    searchContainer.style["paddingLeft"] = Utils.getFloatFromPixelMeasurementString(
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


