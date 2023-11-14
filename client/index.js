let showPasswordCheckbox = document.getElementById("showPasswordCheckbox");

let passwordInput = document.getElementById("passwordInput");

let staffIDInput = document.getElementById("staffIDInput");

let loginButton = document.getElementById("loginButton");

showPasswordCheckbox.addEventListener("click", () =>
{
    if (passwordInput.type === "password")
    {
        passwordInput.type = "text";
    }
    else
    {
        passwordInput.type = "password";
    }
});

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
