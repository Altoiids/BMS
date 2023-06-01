let mysql = require('mysql');
require("dotenv").config()
const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_DATABASE = process.env.DB_DATABASE
const DB_PORT = process.env.DB_PORT
const port = process.env.PORT


let connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: DB_PORT

});


  


connection.connect(function(err) {
  // execute query
  // ...

        if (err) {
          return console.error('error: ' + err.message);
        }
        console.log("connected")
      
        let createtable1 = `create table if not exists user(
                                user_id int primary key auto_increment,
                                name varchar(255)not null,
                                email varchar(255)not null,
                                salt char(60) NOT NULL,
                                hash char(60) NOT NULL, 
                                Admin_id int(1) NOT NULL
                            )`;

        let createtable2 = `create table if not exists books(
                                book_id int primary key auto_increment,
                                book_name varchar(255)not null,
                                publisher varchar(255)not null,
                                ISBN varchar(255)not null,
                                Edition int not null,
                                Request_ID int not null,
                                User_ID int not null

                                
                            )`;                    
      
        connection.query(createtable1, function(err, results, fields) {
          if (err) {
            console.log(err.message);
          }
        });

        connection.query(createtable2, function(err, results, fields) {
            if (err) {
              console.log(err.message);
            }
          });
      
});

let sql = `INSERT INTO books (book_name, publisher, ISBN, Edition, Request_ID, User_ID)
           VALUES('abc','def','def123',1,0,0)`;
connection.query(sql);

let sql2 = `INSERT INTO books (book_name, publisher, ISBN, Edition, Request_ID, User_ID)
           VALUES('jhi','def','def123',1,0,0)`;
connection.query(sql2);


module.exports = connection;


