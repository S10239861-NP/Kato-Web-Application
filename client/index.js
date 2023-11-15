let passwordInput = document.getElementById("passwordInput");

let staffIDInput = document.getElementById("staffIDInput");

let loginButton = document.getElementById("loginButton");

loginButton.addEventListener("mousedown", () =>
{
    let request = new XMLHttpRequest();

    request.open("POST", "/login", true);

    request.onload = (progressEvent) =>
    {
        if (request.readyState == XMLHttpRequest.DONE && request.status == 200 && request.responseText != "Incorrect credentials.")
        {
            window.location.href = "home.html";
        }
    };

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
});
