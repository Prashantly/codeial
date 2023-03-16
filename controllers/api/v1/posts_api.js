const Post = require("../../../models/post");
const Comment = require("../../../models/comment");

module.exports.index = async function(req,res){

    let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user','-password')
    .populate({

        path : 'comments',
        populate : {
            path : 'user'
        }
    })

    return res.status(200).json({

        message : "List of Posts",
        Posts : posts
    })
}

module.exports.destroy = async function (req, res) {

    try {

        let post = await Post.findById(req.params.id);

        if(post){

            post.remove();

            await Comment.deleteMany({ post: req.params.id });

            return res.status(200).json({
                message : "post and associated comments deleted successfully"
            });
        
        }

    } catch (err) {
        console.log(err);
        return res.status(500).json({
                message : "Internal Server Error"
            });

    }
}