// [+] For High Performance
const $ = document;

// [+] Variables
const subBtn        = $.querySelector(".login-submit-btn");
const usernameInput = $.querySelector("#usernameLoginInput");
const passwordInput = $.querySelector("#passwordLoginInput");
let inputLabels     = $.querySelectorAll(".input-filed > label");
let inputElems      = $.querySelectorAll(".input-filed > input");
let modalElem       = $.querySelector(".modal");
let showPasswordBtn = $.querySelectorAll(".passwordEye");

// [+] Users Data
let userDataBase = [];

// [+] Functions
function focusOnInputHandler(item){
    item.target.style.cssText = "position: static;padding: 0;font-size:12px;";
    item.target.parentElement.style.cssText = "background-color: #fff;border-color:#0671E0";
    item.target.nextElementSibling.style.cssText = "visibility: visible;";
    item.target.parentElement.lastElementChild.style.visibility = "visible";
}
function temporaryValidation(event){
    let inputValue = event.value;
    if(!inputValue || inputValue.length < 3){
        invalidInput(event);
    }else{
        validInput(event);
    }
}
function invalidInput(element){
    element.parentElement.style.cssText = "background-color:#FFF1F0;border-color:#C10905;";
}
function validInput(element){
    element.parentElement.style.cssText = "background-color: #fff;border-color:#0671E0";
}
function showModal(color = '',text = ''){
    modalElem.style.cssText = `background-color: ${color};transform: translateX(0);`
    modalElem.firstElementChild.innerHTML = text;
    closeModal();
}
function closeModal(){
    setTimeout(function(){
        modalElem.style.transform = "translateX(100%)";
    },2900)
}
function showPasswordHandler(event){
    if(event.target.classList.contains("fa-eye-slash")){
        event.target.classList.replace("fa-eye-slash", "fa-eye")
        event.target.previousElementSibling.setAttribute("type", "text");
    }else{
        event.target.classList.replace("fa-eye", "fa-eye-slash")
        event.target.previousElementSibling.setAttribute("type", "password");
    }
}
function changeLocation (locationX = ""){
    setTimeout(function (){
        location.replace(locationX)
    },1000)
}

// [+] Events
subBtn.addEventListener("click", function (){
    inputElems.forEach(function (item){
        temporaryValidation(item);
    })
});
inputLabels.forEach(function(item){
    item.addEventListener("click", focusOnInputHandler)
});
showPasswordBtn.forEach(function (btn){
    btn.addEventListener("click", showPasswordHandler)
})
inputElems.forEach(function(item){
    item.addEventListener("blur", function(){
        temporaryValidation(item)
    });
    item.addEventListener("copy", function (event){
        event.preventDefault();
    })
    item.addEventListener("cut", function (event){
        event.preventDefault();
    })
    item.addEventListener("paste", function (event){
        event.preventDefault();
    })
});
