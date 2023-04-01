const express = require("express");
const router = express.Router();
const passport = require('passport');
const postController = require("../controllers/post_controller");


router.post('/addPost',passport.checkAuthentication,postController.create);
router.get('/destroy/:id',passport.checkAuthentication,postController.destroy);
router.post('/uploadImage',passport.checkAuthentication,postController.upload);


module.exports = router;