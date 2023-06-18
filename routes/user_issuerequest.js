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


router.get("/user_issuerequest", validateToken, (req, res) => {
	const username = req.username.name;
	if (!username) {
		res.sendStatus(404);
	} else {
		database.query(
			`SELECT * FROM user WHERE name = ${database.escape(username)}`,
			async (error, results) => {
				if (error) {
					console.log(error);
					return;
				}
				if (!results[0]) {
					res.redirect("/");
				}


				const query1 = `
  SELECT b.*
  FROM request r
  JOIN books b ON r.book_id = b.book_id
  WHERE r.user_id = ${results[0].user_id} and r.status = 'issue requested';
`;
				console.log(results[0].user_id);

				database.query(query1, (err, data) => {

					if (err) throw err;
					res.render(path.join(rootDir, "views", "user_issuerequest.ejs"), { username: username, sampleData: data });
				});



			}

		)
	};

});

router.post("/withdraw_ir", validateToken, (req, res) => {

	const { recordId, username } = req.body;
	console.log(recordId);
	console.log(username);
	var query2 = `
				DELETE FROM request WHERE book_id = ${recordId} and status != "owned";`;

	database.query(query2, (err, result) => {
		if (err) {
			console.error(err);
			res.sendStatus(500);
		} else {
			if (result.affectedRows > 0) {
				res.redirect(`user_issuerequest?username=${username}`);
			} else {
				res.sendStatus(404);
			}
		}


	});
});


router.post('/logoutU', (req, res) => {
	res.clearCookie('access-token');
	res.redirect("/login")
});



module.exports = router;