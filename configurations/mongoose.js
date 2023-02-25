const mongoose = require("mongoose");

//provide connection to database
mongoose.connect("mongodb://localhost/codeial_development",{family:4});

const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error connecting to MongoDB"));

db.once('open',function(){

    console.log('connected to Database : MongoDB');
})


module.exports = db;