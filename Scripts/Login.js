// [+] Events
const subBtn = $.querySelector(".login-submit-btn");

// [+] Functions
function performLoginOperation() {
    let usernameValue, passwordValue;
    inputElems.forEach((input) => {
        usernameValue = (input.dataset.name === "usernameLoginInput") && (inputValidate(input, "usernameLoginInput", emailValidateRegEx, false, "Please enter a valid email !"));
        passwordValue = (input.dataset.name === "passwordLoginInput") && (inputValidate(input, "passwordLoginInput", passwordValidateRegEx));

        console.log(usernameValue, passwordValue)
        if(usernameValue && passwordValue){
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
