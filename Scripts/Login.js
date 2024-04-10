// [+] Events
const subBtn = $.querySelector(".login-submit-btn");

// [+] Functions
function performLoginOperation() {
    let usernameValue = usernameInput.value.trim();
    let passwordValue = passwordInput.value.trim();
}

// [+] Events
inputElems[1].addEventListener("keydown", function(event) {
    if(event.key === "Enter"){
        performLoginOperation();
    }
});

subBtn.addEventListener("click", function() {
    form.submit();
});
