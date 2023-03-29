class chatEngine {

    constructor(userName) {
        this.userName = userName;
        this.socket = io.connect("http://localhost:5000");

        if (this.userName) {
            this.connect();
        }
    }

    connect() {

        let textarea = $('#textarea');
        let messageArea = $(".message-area");
        let self = this;
        console.log(this);

        this.socket.on("connect", function () {
            console.log("connection established using sockets...!");

            self.socket.emit('join_room', {
                user_name: self.userName,
                chat_room: 'codeial'
            });

            self.socket.on('user_joined', function (data) {
                console.log("New User Joined", data.user_name);
            })


        });

        textarea.keyup(function (e) {

            if (e.key == 'enter' || e.key == "Enter") {

                sendMessage($(e.target).val());

            }

        })

        function sendMessage(message) {

            let msg = {
                username: self.userName,
                message: message.trim(),
                chat_room: 'codeial'
            }

            // append to DOM
            if(msg.message != ""){
                appendMessage(msg, 'outgoing');
                $(textarea).val("");
                scrollToBottom();

                // send to server
                self.socket.emit("send_message", msg);
            }
        
            
        }

        function appendMessage(msg, msgType) {

            let mainDiv = $("<div>").addClass([msgType, "message"]);

            let markup = `
                 <h4>${msg.username}</h4>
                 <p>${msg.message}</p>
            `

            mainDiv.html(markup);
            messageArea.append(mainDiv);


        }

        //receive messages coming from server

        self.socket.on("receive_message", function (msg) {

            appendMessage(msg, 'incoming');
            scrollToBottom();
        })


        function scrollToBottom() {

            messageArea[0].scrollTop = messageArea[0].scrollHeight;
        }



    }

}



