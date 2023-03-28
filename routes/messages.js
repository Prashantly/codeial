const express = require("express");
const router = express.Router();
const passport = require('passport');

const messageController = require("../controllers/messages_controller");

router.get("/chats",passport.checkAuthentication,messageController.userChats);



module.exports = router;