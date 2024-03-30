// [+] Variables
const acceptRulesBtn = $.querySelector('#acceptRule');
const subBtn        = $.querySelector(".login-submit-btn");
userDataBase = [
    {email:"Admin", password: "Admin", firstName: "Hojjat", lastName: "Hekmatipour"}
]
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
                if(input.value.trim().length >= 3){
                    firstName = input.value.trim();
                    validInputX(input)
                }else{
                    invalidInputX(input)
                }
            }
            if(input.dataset.name === "LastName"){
                if(input.value.trim().length >= 4){
                    lastName = input.value.trim();
                    validInputX(input)
                }else{
                    invalidInputX(input)
                }
            }
            if(input.dataset.name === "emailAddress"){
                if(input.value.trim().length >= 7){
                    emailAddress = input.value.trim();
                    validInputX(input)
                }else{
                    invalidInputX(input)
                }
            }
            if(input.dataset.name === "PassStep1"){
                if(input.value.trim().length >= 8){
                    passStep1 = input.value.trim();
                    validInputX(input)
                }else{
                    invalidInputX(input)
                }
            }
            if(input.dataset.name === "PassStep2"){
                if(input.value.trim().length >= 8){
                    if(passStep1 === input.value){
                        passStep2 = input.value.trim();
                        isMatch = true;
                        validInputX(input)
                    }else{
                        invalidInput(input)
                        invalidInput(inputElems[inputElems.length-2])
                    }
                }else{
                    invalidInput(input)
                }
            }
        });
        avoidDuplicateEmails(firstName, lastName, emailAddress, isMatch, passStep2)
    }else{
        acceptRulesBtn.nextElementSibling.style.color = "#C10905";
    }
}
function avoidDuplicateEmails(firstName, lastName, emailAddress, isMatch, pass){
    if(firstName && lastName && emailAddress && isMatch){
        if(JSON.parse(localStorage.getItem("UsersData"))){
            userDataBase = JSON.parse(localStorage.getItem("UsersData"));
        }
        let isDuplicateEmail = userDataBase.some(function (user){
            return user.email === emailAddress;
        });
        if(isDuplicateEmail){
            showModal("#FF6868", "The email you entered already exists!");
            invalidInput(inputElems[inputElems.length - 3])
        }else{
            let newUser = {email : emailAddress, password:pass, firstName:firstName, lastName:lastName};
            userDataBase.push(newUser);
            localStorage.setItem("UsersData", JSON.stringify(userDataBase));
            showModal("#74E291", " Account created Successful");
            changeLocation("Success/Registration-Successful.html")
        }
    }
}
function validInputX(element){
    element.parentElement.style.cssText = "background-color:#FDFAF6;border-color:#74E291;";
}
function invalidInputX(element){
    element.parentElement.style.cssText = "background-color:#FFF1F0;border-color:#C10905;";
}
// [+] Events
acceptRulesBtn.addEventListener("click", acceptTerms);
subBtn.addEventListener("click", checkInputValidection)
inputElems[inputElems.length - 1].addEventListener("keydown", function(event){
    if(event.key === "Enter"){
        checkInputValidection();
    }
})
