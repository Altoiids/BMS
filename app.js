
const express = require('express');
const bodyParser = require('body-parser');

const db = require("./database");
const app = express();
const path = require('path')


const homerouter = require("./routes/home");
const books_inventory = require("./routes/book_admin");
app.set('views', path.join(__dirname, 'views'));

app.use(express.json())

app.use(bodyParser.urlencoded({ extended: false }));

app.use(homerouter);
app.use(books_inventory);

app.use(express.static(path.join(__dirname, '/public')));

app.listen(3000, (error)=>{
if(!error){
    console.log("server running successful");
}
else{
    console.log("error", error)
}

});