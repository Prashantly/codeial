const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailer/comments_mailer');
const Like = require("../models/like");



module.exports.create = async function(req,res){

      try{
        //req.body.post "post" is name of input value in comment form
       let post = await Post.findById(req.body.post);

       if(post){

        let comment = new Comment({

            content : req.body.content,
            post : req.body.post,
            user : req.user._id

        });

        console.log(comment);

        //adding comments to post or updating comment to post
        post.comments.push(comment);
        post.save();
        
        await comment.save();
        await comment.populate('user');
        commentsMailer.newComment(comment);
        
        
        if(req.xhr){

            return res.status(200).json({

                data: {
                    comment : comment
                },
                message : "comment created"
            });
        }
        
        req.flash('success','comment added!!');
        return res.redirect('back');
    }

    }catch(err){
        // console.log("Error",err);
        req.flash('error',err);
        return res.redirect('back');
      }
    }


module.exports.destroy = async function(req,res){

    try{

    let comment = await Comment.findById(req.params.id);

    if(comment){

        if(comment.user == req.user.id){

            let postId = comment.post;

            comment.remove();

            await Post.findByIdAndUpdate(postId,{$pull : {comments : req.params.id}});

            // CHANGE :: destroy the associated likes for this comment
            await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});

            if(req.xhr){

                return res.status(200).json({

                    data : {

                        comment_id : comment._id
                    },
                    message : "Comment deleted"
                })
            }

            req.flash('success',"comment deleted!")
            return res.redirect('back');
        }
        else{
            req.flash('error',"Not authorized to delete this comment");
            return res.redirect('back');
        }
    }

    }catch(err){
        // console.log("Error",err);
        req.flash('error',err);
        return res.redirect('back');
    }
}