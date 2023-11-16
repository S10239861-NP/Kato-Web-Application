let logoutButton = document.getElementById("logout");

let menu_btn = document.querySelector("#menu_btn");

let sidebar = document.getElementById("sidebar");

let mainContainer = document.getElementById("mainContainer");

let cardContainer = document.getElementById("cardContainer");

function updateSearchContainerPosition()
{
    let sidebarComputedStyle = window.getComputedStyle(sidebar);

    mainContainer.style["marginLeft"] = Utils.getFloatFromPixelMeasurementString(
        sidebarComputedStyle["left"]
    ) + Utils.getActualWidthOfElement(sidebar) + "px";
}

function initCardContainer()
{
    let totalTopSpace = 0;

    for (const mainContainerChildElement of mainContainer.children)
    {
        if (mainContainerChildElement.id == "cardContainer")
        {
            break;
        }

        totalTopSpace += Utils.getActualHeightOfElement(mainContainerChildElement);
    }

    cardContainer.style["maxHeight"] = (window.innerHeight - totalTopSpace) + "px";
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

initCardContainer();


