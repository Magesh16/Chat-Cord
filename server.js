const path  =  require("path");
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const formatMessage =require("./utils/messages");
const {userJoin, getCurrentUser} = require ("./utils/users");


const app =express();
const server = http.createServer(app);
const io =socketio(server);

// SET STATIC FOLDER
app.use(express.static(path.join(__dirname, "public")));
const BotName = "Admin";

//RUN WHEN CLIENT CONNECTS
io.on("connection", socket=>{

    socket.on('joinRoom', ({username, room})=>{
        const user =    userJoin(socket.id, username, room);
        socket.join(user.room);

        // WELCOME CURRENT USER
        socket.emit('message',formatMessage(BotName,'Welcome to ChatCord'));
        // BROADCAST WHEN A USER CONNECTS
        socket.broadcast.to(user.room).emit('message',formatMessage(BotName, `${user.username} has joined the chat`));    
    })

    //LISTEN FOR CHAT MESSAGE
    socket.on('chatMessage',(msg)=>{
        //console.log(msg);
        io.emit('message',formatMessage('BOT',msg));
    });
    // RUN WHEN CLIENT DISCONNECTS
    socket.on('disconnect', ()=>{
        io.emit('message',formatMessage(BotName, 'A user had left the chat')); 
    });

});

const PORT =3000 || process.env.PORT;

server.listen(PORT,()=> console.log(`server runing in the port ${PORT}`));
