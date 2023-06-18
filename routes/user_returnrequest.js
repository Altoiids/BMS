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


router.get("/user_returnrequest", validateToken, (req, res) => {
	const username = req.username.name;
	if (!username) {
		res.status(404).sendFile(path.join(rootDir, "views", "404.html"));
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


				const query1 = `SELECT b.* FROM request r JOIN books b ON r.book_id = b.book_id WHERE r.user_id = ${results[0].user_id} and r.status = 'return requested';`;
				database.query(query1, (err, data) => {

					if (err) throw err;
					res.render(path.join(rootDir, "views", "user_returnrequest.ejs"), { username: username, sampleData: data, user_id: results[0].user_id });
				});



			}

		)
	};
});


router.post("/withdraw_rr", validateToken, (req, res) => {

	const { recordId, username, userId } = req.body;
	console.log(recordId);
	console.log(username);
	console.log(userId);
	var query2 = `
				UPDATE request SET status = "owned" WHERE user_id = ${userId} and book_id = ${recordId};
`;

	database.query(query2, (err, result) => {
		if (err) {
			console.error(err);
			res.sendStatus(500);
		} else {
			if (result.affectedRows > 0) {
				res.redirect(`user_returnrequest?username=${username}`);
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