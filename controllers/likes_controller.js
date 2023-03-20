const Like = require("../models/like");
const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.toggleLike = async function(req,res){

    try{

        //likes/toggle/?id=abc&type=Post
        let likeable;
        let deleted = false;

        if(req.query.type == 'Post'){

            likeable = await Post.findById(req.query.id).populate('likes');

        }
        else{

            likeable = await Comment.findById(req.query.id).populate('likes');

        }

        //check if like is already exists

        let existingLike = await Like.findOne({

            likeable : req.query.id,
            onModel : req.query.type,
            user : req.user._id
        })

        //if like is already exist, delete it
        if(existingLike){

            likeable.likes.pull(existingLike._id);
            likeable.save();

            existingLike.remove();

            deleted = true;


        }else{

            //make new like

            let newLike = await Like.create({

                user : req.user._id,
                likeable : req.query.id,
                onModel : req.query.type
            })

            likeable.likes.push(newLike.id);
            likeable.save();
        }


        return res.status(200).json({

            message : "request successfull",
            data : {
                deleted : deleted
            }
        })



    }catch(err){
       
        console.log(err);
        res.status(500).json({

            message : "Internal server error"
        });

    }
}