let mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 5,
    host: 'localhost',
    user: 'root',
    password: 'Mumma12@', 
    database: 'lms'
});

pool.getConnection(function(err, connection) {
  // execute query
  // ...

        if (err) {
          return console.error('error: ' + err.message);
        }
      
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
                                Request_ID int(1) not null,
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




