import * as utils from "./libs/utils.js";

import * as components from "./libs/components.js";

let cardContainer = document.getElementById("cardContainer");

let mainContainer = document.getElementById("mainContainer");

let trainingDetailsContainer = document.getElementById("trainingDetailsContainer");

let closeTrainingDetailsButton = document.getElementById("closeTrainingDetailsButton");

let trainingDetailsContainerCourseNameLabel = document.getElementById("trainingDetailsContainerCourseNameLabel");

let trainingDetailsContainerCategoryNameLabel = document.getElementById("trainingDetailsContainerCategoryNameLabel");

let trainingDetailsContainerDescriptionLabel = document.getElementById("trainingDetailsContainerDescriptionLabel");

let startTrainingModuleLessonButton = document.querySelector("#startTrainingModuleLessonButton");

let sidebar = null;

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
    let trainingModuleLessonName = this.getAttribute("course-name");

    trainingDetailsContainerCourseNameLabel.innerText = trainingModuleLessonName;

    trainingDetailsContainerCategoryNameLabel.innerText = this.getAttribute("category-name");

    trainingDetailsContainerDescriptionLabel.innerText = this.getAttribute("description");

    sessionStorage.setItem("mostRecentlySelectedTrainingModuleLessonName", trainingModuleLessonName);

    trainingDetailsContainer.classList.add("active");

    sidebar.classList.add("fully-hidden");

    mainContainer.classList.add("invisible");
}

function onStartTrainingModuleLessonButtonMouseDown()
{
    window.location.href = "/elearning.html";
}

async function updateDisplayedTrainings()
{
    let getLessonsRequest = new XMLHttpRequest();

    getLessonsRequest.open("POST", "/get-lessons-for-training-module", true);

    getLessonsRequest.onerror = (progressEvent) =>
    {
        console.error(getLessonsRequest.statusText);
    };

    let trainingModuleName = sessionStorage.getItem("mostRecentlySelectedTrainingModuleName");

    getLessonsRequest.send(
        JSON.stringify(
            {
                trainingModuleName: trainingModuleName
            }
        )
    );

    await utils.waitForResponse(getLessonsRequest);

    if (getLessonsRequest.status == 200)
    {
        let lessons = JSON.parse(getLessonsRequest.responseText);

        for (const lesson of lessons)
        {
            let trainingModuleLessonCard = document.createElement("training-card");

            trainingModuleLessonCard.setAttribute("course-name", lesson.Name);

            trainingModuleLessonCard.setAttribute("category-name", lesson.TrainingModuleName);

            trainingModuleLessonCard.setAttribute("duration", lesson.EstimatedNumMinutesToComplete);

            trainingModuleLessonCard.setAttribute("description", lesson.Description);

            trainingModuleLessonCard.addEventListener("mousedown", onTrainingCardMouseDown.bind(trainingModuleLessonCard));

            cardContainer.appendChild(
                trainingModuleLessonCard
            );
        }
    }
}

async function main()
{
    components.init();

    sidebar = document.querySelector("#sidebar").shadowRoot.querySelector(".sidebar");

    window.addEventListener("resize", (uiEvent) =>
    {
        // updateCardContainer();
    });

    await updateDisplayedTrainings();

    // updateCardContainer();

    closeTrainingDetailsButton.addEventListener("mousedown", (mouseEvent) =>
    {
        trainingDetailsContainer.classList.remove("active");

        sidebar.classList.remove("fully-hidden");

        mainContainer.classList.remove("invisible");
    });

    startTrainingModuleLessonButton.addEventListener("mousedown", onStartTrainingModuleLessonButtonMouseDown);
}

main();