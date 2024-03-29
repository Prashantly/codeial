const Post = require("../models/post");
const User = require("../models/user");

module.exports.home = async function (req, res) {
  // Post.find({},function(err,posts){
  //     return res.render("home",{
  //         title:"Codeial | Home",
  //         // user : req.user
  //         posts : posts
  //     })
  // })

  //populate the user of each posts
  try {
    let posts = await Post.find({})
      .sort("-createdAt")
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user likes",
        },
      })
      .populate("likes");

    let users = await User.find({});

    if (req.user) {
      let users = await User.find({});

      let friends = await User.findById(req.user._id).populate("friendships");

      return res.render("home", {
        title: "Codeial | Home",
        posts: posts,
        all_users: users,
        all_friends: friends.friendships,
      });
    }

    return res.render("home", {
      title: "Codeial | Home",
      posts: posts,
      all_users: users,
    });
  } catch (err) {
    console.log("Error", err);
    return;
  }
};
