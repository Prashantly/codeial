const socket = io();

let Name;
let textarea = $('#textarea');
let messageArea = $(".message-area");

do{

    Name = prompt("Enter your name: ")

}while(!Name);

textarea.keyup(function(e){

    if( e.key == 'enter' || e.key=="Enter"){

        sendMessage($(e.target).val());
        
    }

})

function sendMessage(message){

    let msg = {
        username : Name,
        message : message.trim()
    }

    // append to DOM
    appendMessage(msg,'outgoing');
    $(textarea).val("");
    scrollToBottom();

    // send to server
    socket.emit("send_message",msg);
}

function appendMessage(msg,msgType){

    let mainDiv = $("<div>").addClass([msgType,"message"]);

    let markup = `
         <h4>${msg.username}</h4>
         <p>${msg.message}</p>
    `

    mainDiv.html(markup);
    messageArea.append(mainDiv);


}


//receive messages coming from server

socket.on("receive_message",function(msg){
    
    appendMessage(msg,'incoming');
    scrollToBottom();
})


function scrollToBottom(){

    messageArea[0].scrollTop = messageArea[0].scrollHeight;
}

