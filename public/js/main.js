const chatForm = document.getElementById("chat-form");
const socket=io();

//MESSAGE FROM SERVER
socket.on("message",message =>{
    console.log(message);
    outputMessage(message);
});  

// MESSAGE SUBMIT
chatForm.addEventListener('submit', (event)=>{
    event.preventDefault();

    //GET MESSAGE TEXT
    const msg = event.target.elements.msg.value;

    // EMIT MESSAGE TO SERVER
    socket.emit("chatMessage", msg);
});

//OUTPUT MESSAGE TO DOM
function outputMessage(message){
    const div= document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">MAGI <span>9:12pm</span></p>
    <p class="text">
        ${message}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}
