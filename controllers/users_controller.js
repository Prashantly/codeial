module.exports.profile=function(req,res){

    // res.end("<h2>User profile</h2>");
    res.end("<h1>User profile</h1>");
}

module.exports.posts=function(req,res){

    // res.end("<h2>User Posts</h2>");
    res.send("<h2>User Posts</h2>");
}