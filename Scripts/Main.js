// [+] For High Performance
const $ = document;

// [+] Variables
const form            = $.querySelector(".form");
const inputFiled      = $.querySelectorAll(".input-filed");
const inputElems      = $.querySelectorAll(".input-filed > input");
const modalElem       = $.querySelector(".modal");
const showPasswordBtn = $.querySelectorAll(".passwordEye");

// [+] Regular expression patterns
const nameValidateRegEx = /^[A-Za-zÀ-ÖØ-öø-ÿءآ-ی ‌]{2,30}$/;
const emailValidateRegEx = /^[A-Za-z0-9.+\-_~!#$%&‘'/=^{}|*?`]+@[A-Za-z0-9][A-Za-z0-9-]*(?:\.[A-Za-z0-9-]+)+[A-Za-z0-9]$/;
const passwordValidateRegEx = /^.{8,16}$/;

// [+] Functions
function focusOnInputHandler(item){
    this.classList.contains("input-filed--active") || this.classList.add("input-filed--active");

    setTimeout(() => {
        for(let el of this.children){
            if(el.nodeName === "INPUT"){
                el.focus();
            }
        }
    },50)
}

function temporaryValidation(event){
    let inputValue = event.value;
    if(!inputValue || inputValue.length < 2){
        invalidInput(event);
    }else{
        PUValidInput(event);
    }
}

function invalidInput(element){
    element.parentElement.classList.add("invalid-input");
}

function validInput(element){
    element.parentElement.classList.add("valid-input");
}

function PUValidInput(element){
    element.parentElement.classList.contains("invalid-input") && element.parentElement.classList.remove("invalid-input");
    element.parentElement.classList.contains("valid-input") && element.parentElement.classList.remove("valid-input");
}

function inputValidate(inputElem, datasetValue, regEx, modalStatus, modalValue){
    let inputValue = inputElem.value.trim();
    let variable = "";
    if(inputElem.dataset.name === datasetValue){
        if(regEx.test(inputValue)){
            PUValidInput(inputElem);
            validInput(inputElem);
            variable = inputValue;
        }else{
            modalValue && showModal(modalStatus, modalValue);
            invalidInput(inputElem);
        }
    }
    return variable;
}

function showModal(modalStatus, modalValue){
    if(modalStatus){
        modalElem.style.cssText = `background-color:#74E291;transform: translateX(0);`
        modalElem.firstElementChild.innerHTML = modalValue;
    }else{
        modalElem.style.cssText = `background-color: #FF6868;transform: translateX(0);`
        modalElem.firstElementChild.innerHTML = modalValue;
    }
    closeModal();
}
function closeModal(){
    setTimeout(function(){
        modalElem.style.transform = "translateX(100%)";
    },2800);
}

function showPasswordHandler(event){
    if(event.target.classList.contains("fa-eye-slash")){
        event.target.classList.replace("fa-eye-slash", "fa-eye");
        event.target.previousElementSibling.setAttribute("type", "text");
    }else{
        event.target.classList.replace("fa-eye", "fa-eye-slash");
        event.target.previousElementSibling.setAttribute("type", "password");
    }
}

function changeLocation (locationX = ""){
    setTimeout(function (){
        location.replace(locationX);
    },1000);
}

function preventDefaultHandler(event){
    event.preventDefault();
}

// [+] Events
inputFiled.forEach(function(item){
    item.addEventListener("click", focusOnInputHandler);
});
showPasswordBtn.forEach(function (btn){
    btn.addEventListener("click", showPasswordHandler);
})
inputElems.forEach(function(item){
    item.addEventListener("blur", () => {
        temporaryValidation(item);
    });
    // Disabled Copy - Cut - Paste on input 
    item.addEventListener("copy", preventDefaultHandler);
    item.addEventListener("cut", preventDefaultHandler);
    item.addEventListener("paste", preventDefaultHandler);
});
