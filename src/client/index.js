import * as utils from "./libs/utils.js";

let passwordInput = document.getElementById("passwordInput");

let staffIDInput = document.getElementById("staffIDInput");

let loginButton = document.getElementById("loginButton");

loginButton.addEventListener("mousedown", async () =>
{
    let request = new XMLHttpRequest();

    request.open("POST", "/login", true);

    request.onerror = (progressEvent) =>
    {
        console.error(request.statusText);
    };

    request.send(
        JSON.stringify(
            {
                staffID: staffIDInput.value,
                password: passwordInput.value
            }
        )
    );

    await utils.waitForResponse(request);

    if (request.status == 200 && request.responseText != "Incorrect credentials.")
    {
        let getStaffIDOfCurrentUserRequest = new XMLHttpRequest();

        getStaffIDOfCurrentUserRequest.open("POST", "/get-staff-id-of-current-user");

        getStaffIDOfCurrentUserRequest.send();

        await utils.waitForResponse(getStaffIDOfCurrentUserRequest);

        if (getStaffIDOfCurrentUserRequest.status == 200)
        {
            sessionStorage.setItem(
                "staffIDOfCurrentUser",
                getStaffIDOfCurrentUserRequest.responseText
            );
        }

        window.location.href = "/dashboard.html";
    }
});
