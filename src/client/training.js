import * as utils from "./libs/utils.js";

import * as components from "./libs/components.js";

components.init();

let cardContainer = document.getElementById("cardContainer");

let mainContainer = document.getElementById("mainContainer");

let trainingDetailsContainer = document.getElementById("trainingDetailsContainer");

let closeTrainingDetailsButton = document.getElementById("closeTrainingDetailsButton");

let trainingDetailsContainerCourseNameLabel = document.getElementById("trainingDetailsContainerCourseNameLabel");

let trainingDetailsContainerCategoryNameLabel = document.getElementById("trainingDetailsContainerCategoryNameLabel");

let trainingDetailsContainerDescriptionLabel = document.getElementById("trainingDetailsContainerDescriptionLabel");

// let categoryFilterContainer = document.getElementById("categoryFilterContainer");

let sidebar = document.querySelector("#sidebar").shadowRoot.querySelector(".sidebar");

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

        totalTopSpace += utils.getActualHeightOfElement(mainContainerChildElement);
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

function onTrainingCardMouseDown()
{
    trainingDetailsContainerCourseNameLabel.innerText = this.getAttribute("course-name");

    trainingDetailsContainerCategoryNameLabel.innerText = this.getAttribute("category-name");

    trainingDetailsContainerDescriptionLabel.innerText = this.getAttribute("description");

    trainingDetailsContainer.classList.add("active");

    sidebar.classList.add("fully-hidden");

    mainContainer.classList.add("invisible");
}

function updateDisplayedTrainings()
{
    let getTrainingsRequest = new XMLHttpRequest();

    getTrainingsRequest.open("POST", "/get-trainings", true);

    getTrainingsRequest.onload = (progressEvent) =>
    {
        if (getTrainingsRequest.readyState == XMLHttpRequest.DONE && getTrainingsRequest.status == 200)
        {
            // let uniqueCategoryNames = [];

            let trainings = JSON.parse(getTrainingsRequest.responseText);

            for (const training of trainings)
            {
                let trainingCard = document.createElement("training-card");

                trainingCard.setAttribute("course-name", training.courseName);

                trainingCard.setAttribute("category-name", training.categoryName);

                trainingCard.setAttribute("duration", training.duration);

                trainingCard.setAttribute("description", training.description);

                trainingCard.addEventListener("mousedown", onTrainingCardMouseDown.bind(trainingCard));

                cardContainer.appendChild(
                    trainingCard
                );

                // if (uniqueCategoryNames.includes(training.categoryName) == false)
                // {
                //     let newCategoryFilterButton = document.createElement("button");

                //     newCategoryFilterButton.classList.add("filter_btn");

                //     newCategoryFilterButton.innerText = training.categoryName;

                //     categoryFilterContainer.appendChild(newCategoryFilterButton);

                //     uniqueCategoryNames.push(training.categoryName);
                // }
            }
        }
    };

    getTrainingsRequest.onerror = (progressEvent) =>
    {
        console.error(getTrainingsRequest.statusText);
    };

    getTrainingsRequest.send();
}

addEventListener("resize", (uiEvent) =>
{
    // updateCardContainer();
});

updateDisplayedTrainings();

// updateCardContainer();

closeTrainingDetailsButton.addEventListener("mousedown", (mouseEvent) =>
{
    trainingDetailsContainer.classList.remove("active");

    sidebar.classList.remove("fully-hidden");

    mainContainer.classList.remove("invisible");
});
