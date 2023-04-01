const mongoose = require("mongoose");
const multer = require('multer');
const path = require('path');

const IMAGE_PATH = path.join("/uploads/users/postImage");

const postSchema = new mongoose.Schema({

    content : {
        type : String,
    },

    user: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },

    //include the array of ids of all comments in this post schema itself
    comments : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Comment"
    }],

    likes : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Like"
    }],

    postImage : {
        type : String,
    }
},{
    timestamps : true
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,"..", IMAGE_PATH))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

postSchema.statics.uploadedImage = multer({
    storage : storage,
    fileFilter : function(req, file, callback){
        var ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            callback(new Error('Only images are allowed'), false);
        }
        callback(null, true)
    },
    limits : {
        fileSize : 1024 * 1024
    }
}).single('postImage');

postSchema.statics.imagePath = IMAGE_PATH;

const Post = mongoose.model('Post',postSchema);

module.exports = Post;