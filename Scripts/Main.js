// [+] For High Performance
const $ = document;

// [+] Variables
const usernameInput = $.querySelector("#usernameLoginInput");
const passwordInput = $.querySelector("#passwordLoginInput");
let inputLabels     = $.querySelectorAll(".input-filed > label");
let inputElems      = $.querySelectorAll(".input-filed > input");
let modalElem       = $.querySelector(".modal");
let showPasswordBtn = $.querySelectorAll(".passwordEye");
let dataBase        = null;

// [+] Users Data
let userDataBase = [];

// [+] Functions
function focusOnInputHandler(item){
    this.parentElement.classList.add("input-filed--active")
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
    element.parentElement.classList.add("invalid-input");
}
function validInput(element){
    element.parentElement.classList.contains("invalid-input") && element.parentElement.classList.remove("invalid-input");
}
function showModal(color = '',text = ''){
    modalElem.style.cssText = `background-color: ${color};transform: translateX(0);`
    modalElem.firstElementChild.innerHTML = text;
    closeModal();
}
function closeModal(){
    setTimeout(function(){
        modalElem.style.transform = "translateX(100%)";
    },2900);
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
    },1000)
}
// Use Indexed DB ++
function createIndexedDB () {
    let dbOpenReq = indexedDB.open("RealWorld", 3);
    dbOpenReq.addEventListener("success", event => {
        dataBase = event.target.result;
    });
    dbOpenReq.addEventListener("upgradeneeded", event => {
        dataBase = event.target.result;
        if(!dataBase.objectStoreNames.contains("usersInformation")){
            dataBase.createObjectStore("usersInformation", {
                keyPath : "userID"
            });
        }
    });
}
// Use Indexed DB ++
function returnTransactionObject (databaseName, objectStoreName, txMode) {
    let transaction = databaseName.transaction(objectStoreName, txMode);
    let store = transaction.objectStore(objectStoreName);
    return store;
}

// [+] Events
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
window.addEventListener("load", createIndexedDB);