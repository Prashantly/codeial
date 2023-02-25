const express=require('express');
const app= express();
const port=8000;
const db=require('./configurations/mongoose');

//using layout library
const expressLayouts=require("express-ejs-layouts");
app.use(expressLayouts);

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// accessing static files
app.use(express.static("./assets"));

//use express router
app.use('/',require("./routes/index"));

// setting up view Engine
app.set("view engine","ejs");

// accessing view file
app.set("views","./views");


app.listen(port,function(err){

    if(err){
        console.log(`Error in running the server : ${err}`);
    }

    console.log(`server is running on port: ${port}`);
})