const chatForm = document.getElementById("chat-form");
const  chatMessages = document.querySelector(".chat-messages");

//GET USERNAME AND ROOM FROM URL
const {username, room} = Qs.parse(location.search, {
    ignoreQueryPrefix : true
});

const socket=io();
socket.emit('joinRoom', {username,room});

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
