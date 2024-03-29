const Post = require("../models/post");
const Comment = require("../models/comment");
const postMailer = require("../mailer/posts_mailer");
const Like = require("../models/like");
const path = require("path");

module.exports.create = async function (req, res) {
  try {
    let post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });

    post = await post.populate("user", "name email");
    postMailer.newPost(post);

    //check if request is ajax request
    if (req.xhr) {
      return res.status(200).json({
        data: {
          post: post,
        },
        message: "Post created!",
      });
    }

    req.flash("success", "Post Published!");
    return res.redirect("back");
  } catch (err) {
    // console.log('Error', err);
    req.flash("error", err);
    return res.redirect("back");
  }
};

module.exports.upload = async function (req, res) {
  try {
    await Post.uploadedImage(req, res, async function (err) {
      if (err) {
        console.log("***multerError: ", err);
        return;
      }

      let mainPath = path.join(Post.imagePath, "/", req.file.filename);

      let post = await Post.create({
        user: req.user._id,
        postImage: mainPath,
      });

      req.flash("success", "Post created successfully");
      console.log("File response", req.file);
      return res.redirect("back");
    });
  } catch (err) {
    req.flash("error", err);
    console.log("image uplpoad error", err);
    return res.redirect("back");
  }
};

module.exports.destroy = async function (req, res) {
  try {
    let post = await Post.findById(req.params.id);

    // .id means converting the object id into string
    if (post.user == req.user.id) {
      //delete thr associated like for the posts and its comments like too
      await Like.deleteMany({ likeable: post, onModel: "Post" });
      await Like.deleteMany({ likeable: { $in: post.comments } });

      post.remove();

      await Comment.deleteMany({ post: req.params.id });

      if (req.xhr) {
        return res.status(200).json({
          data: {
            post_id: req.params.id,
          },
          message: "Post deleted!",
        });
      }

      req.flash("success", "Post and associated comments deleted");

      return res.redirect("back");
    } else {
      req.flash("error", "You cannot delete this post");
      return res.redirect("back");
    }
  } catch (err) {
    req.flash("error", err);
    return res.redirect("back");
  }
};
