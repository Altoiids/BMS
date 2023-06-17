
const express = require('express');
const bodyParser = require('body-parser');

const db = require("./database");
const app = express();
const path = require('path');


const homerouter = require("./routes/home");
const books_inventory = require("./routes/book_admin");

const login_page = require("./routes/login_signup");
const profile_page = require("./routes/profile");
const userissuerequestpage = require("./routes/user_issuerequest");
const userreturnrequestpage = require("./routes/user_returnrequest");
const browse = require("./routes/browse");
const adminlogin = require("./routes/admin_login");
const acceptreturn = require("./routes/accept_issue");
const acceptissue = require("./routes/accept_return");
const addadmin = require("./routes/add_admin");
const viewadmin = require("./routes/view_admin");


app.set('views', path.join(__dirname, 'views'));


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(homerouter);
app.use(books_inventory);
app.use(login_page);
app.use(profile_page);
app.use(userissuerequestpage);
app.use(userreturnrequestpage);
app.use(browse);
app.use(adminlogin);
app.use(acceptissue);
app.use(acceptreturn);
app.use(addadmin);
app.use(viewadmin);

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







app.listen(3000, (error) => {
  if (!error) {
    console.log("server running successful");
  }
  else {
    console.log("error", error)
  }

});