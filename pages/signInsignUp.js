const signUpButton = document.querySelector("#signUpButton");
const Useremail = document.querySelector(".signUpEmail");
const Username = document.querySelector(".nameSignUp");
const UserPassword = document.querySelector("#signUpPassword");
const signInReEnterPassword = document.querySelector(".signInReEnterPassword");
const apiUrl = "https://aqueous-anchorage-41923.herokuapp.com";
// const apiUrl = "http://localhost:8000";

signUpButton.addEventListener("click", () => {
    if(UserPassword.value != signInReEnterPassword.value){
        alert("Password did not match");
    }
    else{
        const name = Username.value;
        const email = Useremail.value;
        const password = UserPassword.value

        Userbody = {
            name,
            email,
            password
        }
        fetch(`${apiUrl}/auth/signup`, {
            method: "POST",
            body: JSON.stringify(Userbody),
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }

        }).then((data) => {
            return data.text();
        }).then((result) => {
            const userdata = JSON.parse(result)
           const{token} = userdata
           const alertMessageAfter = document.querySelector(".alertDiv");
                alertMessageAfter.classList.add("after");
                
                const message = document.createElement("div");
                message.classList.add("alertMessage");
                message.innerHTML = `${userdata.message}`;
                alertMessageAfter.appendChild(message);
        
                
            if(token) {
                localStorage.setItem("jwt", token);
                // location.href = "Dashboard.html"
                setTimeout(function(){
                    
                    location.href = "Dashboard.html";
                },2000);
            }
            
        })
    }
})

const signInButton = document.querySelector("#signInButton");
const signInEmail = document.querySelector(".signInEmail");
const signInPassword = document.querySelector(".signInPassword");

signInButton.addEventListener("click", () => {
    const email = signInEmail.value;
    const password = signInPassword.value;
    const signInUserBody = {
        email,
        password
    }
    fetch(`${apiUrl}/auth/signin`, {
        method : "POST",
        body : JSON.stringify(signInUserBody),
        headers : {
            "Content-Type" : "application/json; charset=utf-8"
        }
    }).then((data) => {
        return data.text()
    }).then((result) => {
        const userData = JSON.parse(result);
        // console.log(userData)
        const {token} = userData
        const alertMessageAfter = document.querySelector(".alertDiv");
                alertMessageAfter.classList.add("after");
                
                const message = document.createElement("div");
                message.classList.add("alertMessage");
                message.innerHTML = `${userData.message}`;
                alertMessageAfter.appendChild(message);
        
                setTimeout(function(){
                    
                    alertMessageAfter.removeChild(message);
                },2000);


        if(token){
        localStorage.setItem("jwt", token);
        
                setTimeout(function(){
                    location.href = "Dashboard.html";
                },2000);
    }})
})