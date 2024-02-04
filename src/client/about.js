import * as components from "./libs/components.js";

import Swiper from "swiper";

import * as utils from "./libs/utils.js";

let teamContainer = document.querySelector(".team-container");

async function updateTeamContainer()
{
    let getTeamMembersForUserRequest = new XMLHttpRequest();

    getTeamMembersForUserRequest.open("POST", "/get-team-members-for-onboarding-employee", true);

    getTeamMembersForUserRequest.send(
        JSON.stringify(
            {
                onboardingEmployeeStaffID: sessionStorage.getItem("staffIDOfCurrentUser")
            }
        )
    );

    await utils.waitForResponse(getTeamMembersForUserRequest);

    let teamMembers = JSON.parse(getTeamMembersForUserRequest.responseText);

    for (const teamMember of teamMembers)
    {
        let teamMemberCard = document.createElement("team-member-card");

        teamMemberCard.setAttribute("name", teamMember.FirstName + " " + teamMember.LastName);

        teamMemberCard.setAttribute("role", teamMember.JobPositionName);

        teamContainer.appendChild(teamMemberCard);
    }
}

components.init();

let swiper = new Swiper(".slide-content",{
    slidesPerView:3,
    spaceBetween:30,
    slidesPerGroup:3,
    loop:true,
    loopFillGroupWithBlank:true,
    pagination:{
        el:".swiper-pagination",
        clickable:true,
    },
    navigation:{
        nextEL:".swiper-button-next",
        prevEl:".swiper-button-prev",
    },
});

updateTeamContainer();