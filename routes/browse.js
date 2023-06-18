var express = require('express');
var router = express.Router();
var database = require('../database');
const path = require('path');
const rootDir = require("../path")
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const cookieParser = require("cookie-parser");
const { createTokens, validateToken } = require(path.join(rootDir, "JWT.js"));

router.use(cookieParser());


router.get("/browse", validateToken, (req, res) => {
	var username = req.username.name;
	
	if (!username) {
		res.status(404).sendFile(path.join(rootDir, "views", "404.html"));
	} else {
		database.query(
			`SELECT * FROM user WHERE name = ${database.escape(username)}`,
			async (error, results) => {
				if (error) {
					return;
				}
				if (!results[0]) {
					res.redirect("/");
				}


				const query1 = `SELECT * FROM books WHERE Quantity >= 1;`;

				database.query(query1, (err, data) => {

					if (err) throw err;
					
					res.render(path.join(rootDir, "views", "browse_books.ejs"), { sampleData: data, username: username, user_id: results[0].user_id });

				});

			}

		)
	};
});


router.post("/issue", validateToken, (req, res) => {



	const { recordId, userId, username } = req.body;
	

	var query5 = `SELECT * FROM request WHERE book_id = ${recordId} and user_id = ${userId}`;

	database.query(query5, (err, result) => {
		if (!result[0]) {
			var query1 = `
	INSERT INTO request
	(book_id, user_id, status) 
	VALUES ("${recordId}", "${userId}", "issue requested" )
	`;
			database.query(query1, (err, result) => {
				if (err) {
					console.error(err);
					res.sendStatus(500);
				}
				else {
					if (result.affectedRows > 0) {
						res.redirect(`/browse`);
						
					}
					else {
						res.sendStatus(404);

					}
				}
			});


		}
		else { const script = `
		<script>
		  alert('Book Already Requested');
		  window.history.back();
		</script>
	  `;
	  res.send(script); }
	});
});



router.post("/logoutU", (req, res) => {
	res.clearCookie('access-token');
	res.redirect("/login")
});


module.exports = router;