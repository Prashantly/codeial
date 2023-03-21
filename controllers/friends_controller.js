const User = require("../models/user");
const Frienship = require("../models/freindship");


module.exports.create = async function(req,res){

    try{

        let fromUser = await User.findById(req.user._id);
        let toUser = await User.findById(req.query.toid);

        if(!fromUser.friendships.includes(req.query.toid)){
            fromUser.friendships.push(req.query.toid);
            fromUser.save();
            toUser.friendships.push(req.user._id);
            toUser.save();
            req.flash('success','Friend Created!!');
        }else{
            req.flash('error','Friend already exists');
        }

        return res.redirect('back');

    }catch(err){

        console.log("Error in creating friends", err);
        return res.redirect('back');
    }


}

module.exports.destroy = async function(req,res){
    try{
        
        let fromUser = await User.findById(req.user._id);
        let toUser = await User.findById(req.query.toid);

        await User.findByIdAndUpdate(fromUser,{$pull : {friendships : req.query.toid}});
        await User.findByIdAndUpdate(toUser,{$pull : {friendships : req.user._id}});

        req.flash('success','Friend deleted');
        return res.redirect('back');

    }catch(err){
        console.log("Error in creating friends", err);
        return res.redirect('back');
    }
}