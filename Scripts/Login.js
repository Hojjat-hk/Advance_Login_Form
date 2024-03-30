// [+] Events
const subBtn = $.querySelector(".login-submit-btn");

// [+] Functions
function performLoginOperation () {
    let usernameValue = usernameInput.value;
    let passwordValue = passwordInput.value;
    let userObjectStore = returnTransactionObject(dataBase, "usersInformation", "readonly");
    let req = userObjectStore.getAll();
    req.addEventListener("success", (event) => {
       let allUser = event.target.result;

       let hasAccountExist = allUser.some(user => user.email === usernameValue);

       if(hasAccountExist){
           allUser.forEach(user => {
              if(user.email === usernameValue){
                  if(user.password === passwordValue){
                      showModal("#74E291", "Your login was successful");
                      changeLocation("Success/Login-Successful.html");
                  }else{
                      showModal("#FF6868", "Your password does not match");
                  }
              }
           });
       }else{
           showModal("#FF6868", "Your account does not exist");
       }
    });
    if(usernameValue){
        // Concat Data
        let data = JSON.parse(localStorage.getItem("UsersData"));
        if(data){
            userDataBase = data;
        }  
        //
        userDataBase.forEach(function (user){
            if(usernameValue === user.email){
                if(user.password === passwordValue){
                    showModal("#74E291", "Your login was successful");
                    changeLocation("Success/Login-Successful.html")
                }else{
                    showModal("#FF6868", "Your password does not match");
                }
            }else{
                count++;
            }
        });
        if(count === (userDataBase.length )){
            showModal("#FF6868", "Your account does not exist");
        }
    }
}

// [+] Events
subBtn.addEventListener("click", () => {
    performLoginOperation();
    inputElems.forEach(input => {
        temporaryValidation(input);
    })
});
inputElems[1].addEventListener("keydown", function (event){
    if(event.key === "Enter"){
        performLoginOperation();
    }
})