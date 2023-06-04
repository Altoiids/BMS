
const express = require('express');
const bodyParser = require('body-parser');

const db = require("./database");
const app = express();
const path = require('path');


const homerouter = require("./routes/home");
const books_inventory = require("./routes/book_admin");
const books_browse = require("./routes/book_client");
const login_page = require("./routes/login_signup");
const profile_page = require("./routes/profile");

app.set('views', path.join(__dirname, 'views'));


app.use(express.json());



app.use(bodyParser.urlencoded({ extended: false }));

app.use(homerouter);
app.use(books_inventory);
app.use(books_browse);
app.use(login_page);
app.use(profile_page);

app.use(express.static(path.join(__dirname, '/public')));

app.delete('/api/deleteRecord/:id/:quantity', (req, res) => {
    const recordId = req.params.id;
    const quantity = req.params.quantity;
  
    
    const query = `UPDATE books SET quatity = quantity - ${quantity} WHERE id = ${recordId}`;
    connection.query(query, (err, result) => {
      if (err) {
       
        console.error(err);
        res.sendStatus(500);
      } else {
        console.log("success")
      }
      
    });
    });


    app.delete('/api/deleteRecord/:id/:quantity', (req, res) => {
        const recordId = req.params.id;
        const quantity = req.params.quantity;
      
        
        const query = `UPDATE your_table SET qty = qty - ${quantity} WHERE id = ${recordId} AND qty >= ${quantity}`;
        connection.query(query, (err, result) => {
          if (err) {
            console.error(err);
            res.sendStatus(500);
          } else {
            if (result.affectedRows > 0) {
              res.sendStatus(200); 
            } else {
              res.sendStatus(404); 
            }
          }
        });
      });







app.listen(3000, (error)=>{
  if(!error){
      console.log("server running successful");
  }
  else{
      console.log("error", error)
  }
  
  });