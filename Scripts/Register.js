// [+] Variables
const acceptRulesBtn = $.querySelector('#acceptRule');
const subBtn        = $.querySelector(".login-submit-btn");

// [+] Regular Expression
const nameValidateRegEx = /^[A-Za-zÀ-ÖØ-öø-ÿا-ی ]{3,20}$/;
const emailValidateRegEx = /^[A-Za-z0-9.+\-_~!#$%&‘'/=^{}|*?`]+@[A-Za-z0-9][A-Za-z0-9-]*(?:\.[A-Za-z0-9-]+)+[A-Za-z0-9]$/;

// [+] Functions
function acceptTerms(){
    if(acceptRulesBtn.checked){
        acceptRulesBtn.nextElementSibling.style.color = "#000";
        subBtn.classList.add("login-submit-btn--active");
    }else{
        subBtn.classList.contains("login-submit-btn--active") && subBtn.classList.remove("login-submit-btn--active");
    }
}
// Validection input
function checkInputValidection(){
    let firstName, lastName, emailAddress, passStep1, passStep2;
    let isMatch = false;
    if(acceptRulesBtn.checked){
        acceptRulesBtn.nextElementSibling.style.color = "#000";
        inputElems.forEach(function(input){
            (input.dataset.name === "firstName") && (firstName = inputValidate(input, "firstName", nameValidateRegEx));
            (input.dataset.name === "lastName") && (lastName  = inputValidate(input, "lastName", nameValidateRegEx));
            (input.dataset.name === "emailAddress") && (emailAddress = inputValidate(input, "emailAddress", emailValidateRegEx, false, "Please enter a valid email!"));
            if(input.dataset.name === "passStep1"){
                if(input.value.trim().length >= 8){
                    passStep1 = input.value.trim();
                    PUValidInput(input);
                    validInput(input);;
                }else{
                    invalidInput(input);
                }
            }
            if(input.dataset.name === "passStep2"){
                if(input.value.trim().length >= 8){
                    if(passStep1 === input.value){
                        passStep2 = input.value.trim();
                        isMatch = true;
                        PUValidInput(input);
                        validInput(input);
                    }else{
                        showModal(false, "The passwords do not match !");
                        invalidInput(input);
                        PUValidInput(inputElems[inputElems.length-2]);
                        invalidInput(inputElems[inputElems.length-2]);
                    }
                }else{
                    invalidInput(input)
                }
            }
        });
        if(firstName && lastName && emailAddress && isMatch && passStep2){
            form.submit();
        }
    }else{
        acceptRulesBtn.nextElementSibling.style.color = "#C10905";
    }
}
// [+] Events
acceptRulesBtn.addEventListener("click", acceptTerms);
subBtn.addEventListener("click", checkInputValidection)
inputElems[inputElems.length - 1].addEventListener("keydown", function(event){
    if(event.key === "Enter"){
        checkInputValidection();
    }
})
