const urlParams = new URLSearchParams(window.location.search);
const noteId = urlParams.get("noteId");


const cardContainer = document.querySelector(".cardContainer");
const logOutButton = document.querySelector(".logOut");

logOutButton.addEventListener("click", () => {
    localStorage.removeItem("jwt");
    location.href = "../index.html"
})

let noteData = [];

createCard = (array) => {
    cardContainer.innerHTML = '';
    array.forEach(Element => {
        const id = Element.noteId;
        const card =  document.createElement("div");
        card.classList.add("card");
        card.id = id;
        card.innerHTML = `<div class="cardHeader">
        <div class="cardHeading">${Element.heading}</div>
        <a href="./updateNote.html?noteId=${id}">
        <div class="left">
        <div class="editNote"><svg class="editNoteImage"viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M32.185 7.51993L37.48 12.8124L32.185 7.51993ZM35.59 2.85743L21.2725 17.1749C20.5327 17.9137 20.0282 18.8549 19.8225 19.8799L18.5 26.4999L25.12 25.1749C26.145 24.9699 27.085 24.4674 27.825 23.7274L42.1425 9.40993C42.5727 8.97969 42.914 8.46892 43.1469 7.90678C43.3797 7.34464 43.4996 6.74214 43.4996 6.13368C43.4996 5.52523 43.3797 4.92273 43.1469 4.36059C42.914 3.79845 42.5727 3.28768 42.1425 2.85743C41.7123 2.42719 41.2015 2.0859 40.6393 1.85306C40.0772 1.62021 39.4747 1.50037 38.8663 1.50037C38.2578 1.50037 37.6553 1.62021 37.0932 1.85306C36.531 2.0859 36.0202 2.42719 35.59 2.85743V2.85743Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M38.5 31.5V39C38.5 40.3261 37.9732 41.5979 37.0355 42.5355C36.0979 43.4732 34.8261 44 33.5 44H6C4.67392 44 3.40215 43.4732 2.46447 42.5355C1.52678 41.5979 1 40.3261 1 39V11.5C1 10.1739 1.52678 8.90215 2.46447 7.96447C3.40215 7.02678 4.67392 6.5 6 6.5H13.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            </div></a>
            <div class="deleteNote">
                    <img src="../assests/Delete.svg">
                </div> 
            </div> 
    </div>
    <div class="cardContent">${Element.content}</div>`

    
    
    const deleteButton = card.querySelector(".deleteNote > img");
    deleteButton.addEventListener("click", () => {
       
        fetch(`${apiUrl}/note/delete/${id}`, {
            method: "DELETE",
            headers: {
                authorization: token,
            }
        }).then((data) => {
            return data.text() 
        })
        .then((result) => {
            const array = JSON.parse(result);
            console.log(array)
            location.href = "Dashboard.html"
        })
    });
    cardContainer.appendChild(card)
    })
    
}

const apiUrl = "https://aqueous-anchorage-41923.herokuapp.com";
// const apiUrl = "http://localhost:8000";
const token = localStorage.getItem("jwt");
window.addEventListener("load", () => {
    
    if(token) {
        fetch(`${apiUrl}/note/getallnotes`, {
            method: "GET",
            headers: {
                authorization: token,
            } 
        }).then((data) => {
            return data.text()
        }).then((result) => {
            const notesData = JSON.parse(result);
            // console.log(notesData);

            // const alertMessageAfter = document.querySelector(".alertDiv");
            // alertMessageAfter.classList.add("after")
            // const message = notesData.message;
            // const alertMessage = document.createElement("div");
            // alertMessage.classList.add("alertMessage");
            // alertMessage.innerHTML = `${message}`;
            // alertMessageAfter.appendChild(alertMessage);
            

            const userName = notesData.name;
            const welcomeUser = document.querySelector(".welcome");
            const welcomeHeading =  document.createElement("div");
            welcomeHeading.classList.add("welcomeUser");
            welcomeHeading.innerHTML = `Welcome ${userName},`;
            welcomeUser.appendChild(welcomeHeading);
            const array = notesData.data
            // console.log(array)
            array.forEach(element =>{
                // console.log(element.noteId)
                const {noteId, heading, content} = element
            const pushData = {
                noteId,
                heading,
                content
            }
            noteData.push(pushData);
            // console.log(pushData)
            })
            createCard(noteData);
        })
}})

const createNewNoteButton = document.querySelector(".newNote");
createNewNoteButton.addEventListener("click", () => {
    location.href = "Createnotes.html";
})

