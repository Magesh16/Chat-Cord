const path  =  require("path");
const express = require("express");
const http = require("http");
const socketio = require("socket.io");


const app =express();
const server = http.createServer(app);
const io =socketio(server);

// SET STATIC FOLDER
app.use(express.static(path.join(__dirname, "public")));

//RUN WHEN CLIENT CONNECTS
io.on("connection", socket=>{
    console.log("New WS connection!!");

    socket.emit('message','Welcome to ChatCord');

    socket.broadcast.emit('message', 'A user has joined the chat');

    socket.on('disconnect', ()=>{
        io.emit('message', 'A user had left the chat'); 
    });

    //LISTEN FOR CHAT MESSAGE
    socket.on('chatMessage',(msg)=>{
        //console.log(msg);
        io.emit('message',msg);
    })

});

const PORT =3000 || process.env.PORT;

server.listen(PORT,()=> console.log(`server runing in the port ${PORT}`));
