const mongoose = require("mongoose");

//provide connection to database
mongoose.connect("mongodb://127.0.0.1:27017/codeial_development");

const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error connecting to MongoDB"));

db.once('open',function(){

    console.log('connected to Database : MongoDB');
})


module.exports = db;