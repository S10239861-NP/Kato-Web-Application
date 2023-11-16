let logoutButton = document.getElementById("logout");

let menu_btn = document.querySelector("#menu_btn");

let cardContainer = document.getElementById("cardContainer");

let mainContainer = document.getElementById("mainContainer");

let trainingDetailsContainer = document.getElementById("trainingDetailsContainer");

let closeTrainingDetailsButton = document.getElementById("closeTrainingDetailsButton");

let sidebar = document.getElementById("sidebar");

/*
This implementation has been tested and works on the default window size as well as other window sizes.
*/
function updateCardContainer()
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

    /*
    Do not remove or change this variable.
    
    This variable is required to be subtracted from the window's inner height so as to obtain the actual inner height of the
    window (or rather the webpage in this case).

    This variable is required for this implementation to work correctly (not just on the default size, but also on other sizes so as
    to allow the webpage to be responsive).
    */
    let requiredNegativeOffset = 18;

    cardContainer.style["maxHeight"] = (window.innerHeight - totalTopSpace - requiredNegativeOffset) + "px";
}

menu_btn.onclick = function(){
    sidebar.classList.toggle("active");
};

logoutButton.addEventListener("mousedown", (mouseEvent) =>
{
    window.location.href = "/";
});

addEventListener("resize", (uiEvent) =>
{
    updateCardContainer();
});

updateCardContainer();

closeTrainingDetailsButton.addEventListener("mousedown", (mouseEvent) =>
{
    trainingDetailsContainer.classList.remove("active");

    sidebar.classList.remove("fully-hidden");
});

for (const wrapperContainer of cardContainer.children)
{
    wrapperContainer.addEventListener("mousedown", () =>
    {
        trainingDetailsContainer.classList.add("active");

        sidebar.classList.add("fully-hidden");
    });
}
