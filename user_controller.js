let mysql = require('mysql');


let connection = mysql.createConnection();

let sql = `SELECT * FROM todos`;
connection.query(sql, (error, results, fields) => {
  if (error) {
    return console.error(error.message);
  }
  console.log(results);
});

