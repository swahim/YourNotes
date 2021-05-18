const createButton = document.querySelector(".Button");
const apiUrl = "http://localhost:8000";
const token = localStorage.getItem("jwt");
createButton.addEventListener("click", () => {
    if(token) {
        const inputHeading = document.querySelector(".EnterHeading");
        const text = document.querySelector(".inputNote");
        const heading = inputHeading.value;
        const content = text.value;
        const addNote = {
            heading,
            content
        }
        // console.log(addNote);
        fetch(`${apiUrl}/note/add`, {
            method: "POST",
            body : JSON.stringify(addNote),
            headers: { 
                "Content-Type": "application/json",
                authorization : token,
            }
    
        }).then((res) => res.json()).then((data) => {
            if(data.message){
                location.href = "Dashboard.html"
            }
        })
        
}})