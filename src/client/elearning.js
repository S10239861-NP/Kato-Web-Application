import * as components from "./libs/components.js";

import * as utils from "./libs/utils.js";

let trainingModuleLessonNameLabel = document.querySelector("#trainingModuleLessonNameLabel");

let trainingModuleLessonDescriptionLabel = document.querySelector("#trainingModuleLessonDescriptionLabel");

async function main()
{
    components.init();

    let trainingModuleLessonName = sessionStorage.getItem("mostRecentlySelectedTrainingModuleLessonName");

    let getTrainingModuleLessonRequest = new XMLHttpRequest();

    getTrainingModuleLessonRequest.open("POST", "/get-training-module-lesson", true);

    getTrainingModuleLessonRequest.send(
        JSON.stringify(
            {
                trainingModuleLessonName: trainingModuleLessonName
            }
        )
    );
    
    await utils.waitForResponse(getTrainingModuleLessonRequest);

    let trainingModuleLesson = JSON.parse(getTrainingModuleLessonRequest.responseText);

    trainingModuleLessonNameLabel.innerText = trainingModuleLesson.Name;

    trainingModuleLessonDescriptionLabel.innerText = trainingModuleLesson.Description;
}

main();

