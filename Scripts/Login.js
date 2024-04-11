// [+] Events
const subBtn = $.querySelector(".login-submit-btn");

// [+] Functions
function performLoginOperation() {
    let usernameValue, passwordValue;
    inputElems.forEach((input) => {
        (input.dataset.name === "usernameLoginInput") && (usernameValue = inputValidate(input, "usernameLoginInput", emailValidateRegEx, false, "Please enter your email correctly."));
        (input.dataset.name === "passwordLoginInput") && (passwordValue = inputValidate(input, "passwordLoginInput", passwordValidateRegEx, false, "Password must be between 8 and 16 characters long."));
        if(usernameValue && passwordValue) {
            form.submit();
        }
    });
}

// [+] Events
inputElems[1].addEventListener("keydown", function(event) {
    if(event.key === "Enter"){
        performLoginOperation();
    }
});

subBtn.addEventListener("click", performLoginOperation);
