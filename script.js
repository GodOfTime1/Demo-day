
const database = firebase.database().ref();


const allMessages = document.getElementById("all-messages");
const usernameElem = document.getElementById("username");
const messageElem = document.getElementById("message");
const sendBtn = document.getElementById("send-btn");
sendBtn.onclick = updateDB;

// hompage.html
const list = document.querySelector(".list")
const users = document.querySelector(".users")
const profiles = document.querySelector(".profiles")

// edit_info.html
const profile_info = document.getElementsByClassName("info")


function updateDB(event) {
    // prevent default behavior of form refresh
    event.preventDefault();

    // store the input values in a temp object called data
    const data = {
        USERNAME: usernameElem.value,
        MESSAGE: messageElem.value
    };

    // write to database
    database.push(data);

    // reset message value
    messageElem.value = "";
}


database.on("child_added", addMessageToBoard);

function addMessageToBoard(rowData) {
    // get the "object form" of the data passed from firebase
    const data = rowData.val();
    
    // print the data for good measure
    console.log(data);

    // get the singleMessageElem
    let singleMessage = makeSingleMessageHTML(data.USERNAME, data.MESSAGE);

    // append this to #allMessages
    allMessages.append(singleMessage);
}

function makeSingleMessageHTML(usernameTxt, messageTxt) {
    // create a parent div
    let parentDiv = document.createElement("div");
    // add .message class
    parentDiv.classList.add("single-message");

    // create the first p tag for username
    let usernameP = document.createElement("p");
    // add .message-username class
    usernameP.classList.add("single-message-username");
    // update the innerHTML to the appropriate data
    usernameP.innerHTML = usernameTxt + ":";
    // append to parentDiv
    parentDiv.append(usernameP);

    // create the second p tag for message
    let messageP = document.createElement("p");
    // update the innerHTML to the appropriate data
    messageP.innerHTML = messageTxt;
    // append to parent Div
    parentDiv.append(messageP);

    // return the parent div
    return parentDiv;
}

let formElem = document.getElementById('textbox');
formElem.onkeyup = (event) => {
    // check if the key released is the Enter key
    if (event.keyCode === 13) {
        // call the updateDB function manually
        updateDB(event);
    }
}