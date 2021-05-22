const chatForm = document.getElementById("chat-form");
const  chatMessages = document.querySelector(".chat-messages");
const roomName = document.getElementById(".room-name");
const userList = document.getElementById(".users");

//GET USERNAME AND ROOM FROM URL
const {username, room} = Qs.parse(location.search, {
    ignoreQueryPrefix : true
});

const socket=io();
socket.emit('joinRoom', {username,room});

//GET USERS AND ROOM

socket.on('roomUSers',({room,users})=> {
    outputRoomName(room);
    outputUsers(users);
})

//MESSAGE FROM SERVER
socket.on("message",message =>{
    console.log(message);
    outputMessage(message);
//SCROLL DOWN
    chatMessages.scrollTop = chatMessages.scrollHeight;
});  

// MESSAGE SUBMIT
chatForm.addEventListener('submit', (event)=>{
    event.preventDefault();

    //GET MESSAGE TEXT
    const msg = event.target.elements.msg.value;

    // EMIT MESSAGE TO SERVER
    socket.emit("chatMessage", msg);

    //CLEAR INPUTS
    event.target.elements.msg.value ='';
    event.target.elements.msg.focus();
});

//OUTPUT MESSAGE TO DOM
function outputMessage(message){
    const div= document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}


//ADD ROOM TO DOM
function outputRoomName(room){
    roomName.innerText = room;
}

//ADD USERS TO DOM
function outputUsers(users){
    userList.innerHTML= `
    ${users.map(user => `<li> ${user.username}</li>`).join('')}
    `; 
}

document.getElementById('leave-btn').addEventListener('click', () => {
    const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
    if (leaveRoom) {
      window.location = '../index.html';
    } else {
    }
  });
  