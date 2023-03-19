const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailer/comments_mailer');


module.exports.create = async function(req,res){

      try{
        //req.body.post "post" is name of input value in comment form
       let post = await Post.findById(req.body.post);

       if(post){

        let comment = await Comment.create({

            content : req.body.content,
            post : req.body.post,
            user : req.user._id

        });

        //adding comments to post or updating comment to post
        post.comments.push(comment);
        post.save();

        comment = await comment.populate('user','name email');
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