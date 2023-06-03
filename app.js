
const express = require('express');
const bodyParser = require('body-parser');

const db = require("./database");
const app = express();
const path = require('path')
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { createTokens, validateToken } = require("./JWT");


const homerouter = require("./routes/home");
const books_inventory = require("./routes/book_admin");
const books_browse = require("./routes/book_client");
app.set('views', path.join(__dirname, 'views'));


app.use(express.json());
app.use(cookieParser());
app.use(express.json())

app.use(bodyParser.urlencoded({ extended: false }));

app.use(homerouter);
app.use(books_inventory);
app.use(books_browse);

app.use(express.static(path.join(__dirname, '/public')));

app.delete('/api/deleteRecord/:id/:quantity', (req, res) => {
    const recordId = req.params.id;
    const quantity = req.params.quantity;
  
    // Construct and execute the DELETE query with the specified quantity
    const query = `UPDATE books SET quatity = quantity - ${quantity} WHERE id = ${recordId}`;
    connection.query(query, (err, result) => {
      if (err) {
        // Handle error case
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
      
        // Construct and execute the DELETE query with the specified quantity
        const query = `UPDATE your_table SET qty = qty - ${quantity} WHERE id = ${recordId} AND qty >= ${quantity}`;
        connection.query(query, (err, result) => {
          if (err) {
            console.error(err);
            res.sendStatus(500);
          } else {
            if (result.affectedRows > 0) {
              res.sendStatus(200); // Record deleted successfully
            } else {
              res.sendStatus(404); // Record not found or invalid quantity
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


app.post("/register", (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    db.create({
      username: username,
      password: hash,
    })
      .then(() => {
        res.json("USER REGISTERED");
      })
      .catch((err) => {
        if (err) {
          res.status(400).json({ error: err });
        }
      });
  });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await db.findOne({ where: { username: username } });

  if (!user) res.status(400).json({ error: "User Doesn't Exist" });

  const dbPassword = user.password;
  bcrypt.compare(password, dbPassword).then((match) => {
    if (!match) {
      res
        .status(400)
        .json({ error: "Wrong Username and Password Combination!" });
    } else {
      const accessToken = createTokens(user);

      res.cookie("access-token", accessToken, {
        maxAge: 60 * 60 * 24 * 30 * 1000,
        httpOnly: true,
      });

      res.json("LOGGED IN");
    }
  });
});

app.get("/profile", validateToken, (req, res) => {
  res.json("profile");
});

