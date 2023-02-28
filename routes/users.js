const express=require("express");

const router=express.Router();

const usersController=require("../controllers/users_controller");

//map route to userController
router.get("/profile",usersController.profile);
router.get("/sign-up",usersController.signup);
router.get("/sign-in",usersController.signIn);


router.post("/create",usersController.create);


module.exports=router;