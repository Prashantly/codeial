class ChatEngine{

    constructor(chatBoxId,userEmail){

        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        this.socket = io.connect("http://localhost:5000");

        if(this.userEmail){
            this.connectionHandler();
        }

    }

    connectionHandler(){

        let self = this;
        console.log(self);
        this.socket.on('connect',function(){
            console.log("connection establshed using sockets.....!");

            self.socket.emit('join_room',{

                user_email : self.userEmail,
                chatroom : 'codeial'
            });

            self.socket.on('user_joined',function(data){
                console.log('a user joined',data);
            })
        });
    }
}