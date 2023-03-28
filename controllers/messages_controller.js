const User = require("../models/user");
const Chatroom = require("../models/chatroom");


module.exports.userChats = async function(req,res){

    try{

        let signInUserFriends;
        if(req.user){
            signInUserFriends = await User.findById(req.user._id).populate('friendships','name email avatar');
            console.log(signInUserFriends);
        }

        return res.render('_chat_box',{

            title : 'chats',
            friends : signInUserFriends,
        });

    }catch(err){
        console.log("ERROR", err);
        return;
    }
};