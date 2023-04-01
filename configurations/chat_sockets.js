// const Chat = require("../models/chat");
// const Chatroom = require("../models/chatroom");

module.exports.chatSockets = async function (socketServer) {

    let io = require("socket.io")(socketServer, {
        cors: {
            origin: "http://localhost:8000",
            methods: ["GET", "POST"]
        }
    });

    io.sockets.on('connection', function (socket) {

        // console.log("New connection received : ", socket.id);

        socket.on('disconnect', function () {
            console.log("Connection Disconnected---------->");
        });

        socket.on('join_room', async function (data) {
            // console.log("joining request received", data);

            socket.join(data.chat_room);

            io.in(data.chat_room).emit("user_joined", data);
        })

        socket.on("send_message", function (msg) {

            //we have to send "msg" to all clients(who connected to this chat app browser throghh this socket)
            //broadcast means message will be sent to all the users who are connected throgh this socket connection except user who sent 
            //that message first. message won't return back to user who sent first
            // we already inserted sent message from sender in dom 
            socket.broadcast.emit('receive_message', msg);
        })
    });


}