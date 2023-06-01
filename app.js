
const express = require('express');
const bodyParser = require('body-parser');

const db = require("./database");
const app = express();



const homerouter = require("./routes/home");

app.use(express.json())

app.use(bodyParser.urlencoded({ extended: false }));

app.use(homerouter);

app.listen(3000, (error)=>{
if(!error){
    console.log("server running successful");
}
else{
    console.log("error", error)
}

});