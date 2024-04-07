// [+] Variables
const acceptRulesBtn = $.querySelector('#acceptRule');
const subBtn        = $.querySelector(".login-submit-btn");

// [+] Regular Expression
const nameValidateRegEx = /^[A-Za-zÀ-ÖØ-öø-ÿا-ی ]{3,}$/;
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
function checkInputValidection(){
    let firstName, lastName, emailAddress, passStep1, passStep2;
    let isMatch = false;
    if(acceptRulesBtn.checked){
        acceptRulesBtn.nextElementSibling.style.color = "#000";
        inputElems.forEach(function(input){
            if(input.dataset.name === "firstName"){
                if(nameValidateRegEx.test(input.value.trim())){
                    firstName = input.value.trim();
                    validInput(input)
                }else{
                    invalidInput(input)
                }
            }
            if(input.dataset.name === "LastName"){
                if(nameValidateRegEx.test(input.value.trim())){
                    lastName = input.value.trim();
                    validInput(input)
                }else{
                    invalidInput(input)
                }
            }
            if(input.dataset.name === "emailAddress"){
                if(emailValidateRegEx.test(input.value.trim())){
                    emailAddress = input.value.trim();
                    validInput(input)
                }else{
                    showModal("#FF6868", "Please enter a valid email!");
                    invalidInput(input)
                }
            }
            if(input.dataset.name === "PassStep1"){
                if(input.value.trim().length >= 8){
                    passStep1 = input.value.trim();
                    validInput(input)
                }else{
                    invalidInput(input)
                }
            }
            if(input.dataset.name === "PassStep2"){
                if(input.value.trim().length >= 8){
                    if(passStep1 === input.value){
                        passStep2 = input.value.trim();
                        isMatch = true;
                        validInput(input)
                    }else{
                        showModal("#FF6868", "The passwords do not match !");

                        invalidInput(input)
                        invalidInput(inputElems[inputElems.length-2])
                    }
                }else{
                    invalidInput(input)
                }
            }
        });
        if(firstName && lastName && emailAddress && isMatch && passStep2){
            let newUser = {
                userID : Math.round(Math.random() * 9999),
                firstName : firstName,
                lastName : lastName,
                email : emailAddress,
                password : passStep2
            }
            avoidDuplicateEmails(emailAddress, newUser);
        }
    }else{
        acceptRulesBtn.nextElementSibling.style.color = "#C10905";
    }
}
function avoidDuplicateEmails(emailAddress, newUser){
    let userObjectStore = returnTransactionObject(dataBase, "usersInformation", "readonly");
    let req = userObjectStore.getAll();
    req.addEventListener("success", () => {
        let allUser = req.result;

        let isDuplicateEmail = allUser.some(user => user.email === emailAddress);

        if(!isDuplicateEmail){
            addUserToDataBase(newUser);
        }else{
            showModal("#FF6868", "The email you entered already exists!");
            invalidInput(inputElems[inputElems.length - 3]);
        }
    });
}
function addUserToDataBase(newUser){
    let userObjectStore = returnTransactionObject(dataBase, "usersInformation", "readwrite");
    let req = userObjectStore.add(newUser);
    req.addEventListener("success", () => {
        showModal("#74E291", "Account created Successful");
        changeLocation("Success/Registration-Successful.html");
    });
}
// [+] Events
acceptRulesBtn.addEventListener("click", acceptTerms);
subBtn.addEventListener("click", checkInputValidection)
inputElems[inputElems.length - 1].addEventListener("keydown", function(event){
    if(event.key === "Enter"){
        checkInputValidection();
    }
})
