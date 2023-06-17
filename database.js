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





connection.connect(function (err) {

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
                                Admin_id int(1) NOT NULL default 0
                            )`;

  let createtable2 = `create table if not exists books(
                                book_id int primary key auto_increment,
                                book_name varchar(255)not null,
                                publisher varchar(255)not null,
                                ISBN varchar(255)not null,
                                Edition int not null,
                                Quantity int not null,
                                Request_ID int not null default 0,
                                User_ID int not null default 0

                                
                            )`;

  let createtable3 = `create table if not exists request(
                              request_id int primary key auto_increment,
                              book_id int not null,
                              user_id int not null,
                              status varchar(255)not null
                              
                          )`;


});

module.exports = connection;


