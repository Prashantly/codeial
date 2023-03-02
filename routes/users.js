const express=require("express");
const router=express.Router();
const passport = require('passport');


const usersController=require("../controllers/users_controller");

//map route to userController
router.get("/profile",passport.checkAuthentication,usersController.profile);
router.get("/sign-up",usersController.signup);
router.get("/sign-in",usersController.signIn);


router.post("/create",usersController.create);

//use passport as middleware to autenticate
router.post("/create-session",
passport.authenticate('local', {failureRedirect: '/users/sign-in'}),
usersController.createSession);


module.exports=router;