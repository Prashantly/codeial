const express=require("express");

const router=express.Router();

const usersController=require("../controllers/users_controller");

//map route to userController
router.get("/profile",usersController.profile);
router.get("/posts",usersController.posts);


module.exports=router;