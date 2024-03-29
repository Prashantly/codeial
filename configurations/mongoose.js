const mongoose = require("mongoose");
const env = require('./environment');

//provide connection to database
mongoose.connect(`mongodb://127.0.0.1:27017/${env.db}`);

const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error connecting to MongoDB"));

db.once('open',function(){

    console.log('connected to Database : MongoDB');
})


module.exports = db;