const urlParams = new URLSearchParams(window.location.search);
const noteId = urlParams.get("noteId");

const token = localStorage.getItem("jwt");
const apiUrl = "https://aqueous-anchorage-41923.herokuapp.com";
// const apiUrl = "http://localhost:8000";

let Noteheading = document.querySelector(".EnterHeading");
let Notecontent = document.querySelector(".inputNote");
window.addEventListener("load",  () => {
    fetch(`${apiUrl}/note/update/${noteId}`, {
        method: "GET",
        headers: {
            authorization: token,
        }

    }).then((data) => {
        return data.text()
    }).then((result) => {
        const array = JSON.parse(result)
        Noteheading.value = array[0].heading;
        Notecontent.value = array[0].content;
    })
})

const updateNoteButton = document.querySelector(".Button");
updateNoteButton.addEventListener("click", () => {
    const heading = Noteheading.value;
    const content = Notecontent.value;
    if(token){

        fetch(`${apiUrl}/note/update/${noteId}`, {
            method: "PUT",
            headers: {
                authorization: token,
                "Content-Type": "application/json",
            },
            body : JSON.stringify({heading, content}),
        }).then((data) => {
            return data.text()
        }).then((result) => {
            const array = JSON.parse(result);
            // console.log(array);
            const alertMessageAfter = document.querySelector(".alertDiv");
                alertMessageAfter.classList.add("after");
                const message = document.createElement("div");
                message.classList.add("alertMessage");
                message.innerHTML = `${array.message}`;
                alertMessageAfter.appendChild(message);

                setTimeout(function(){
                    location.href = "Dashboard.html";
                   },2000);
            // location.href = "Dashboard.html "
            
        })
    }
})