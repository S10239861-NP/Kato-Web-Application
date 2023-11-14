let passwordInput = document.getElementById("passwordInput");

let staffIDInput = document.getElementById("staffIDInput");

let loginButton = document.getElementById("loginButton");

loginButton.addEventListener("mousedown", () =>
{
    let request = new XMLHttpRequest();

    request.open("POST", "/login", true);

    request.send(
        JSON.stringify(
            {
                staffID: staffIDInput.value,
                password: passwordInput.value
            }
        )
    );
});
