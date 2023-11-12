let showPasswordCheckbox = document.getElementById("showPasswordCheckbox");

let passwordInput = document.getElementById("passwordInput");

let staffIDInput = document.getElementById("staffIDInput");

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
