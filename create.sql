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


