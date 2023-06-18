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


router.get("/accept_issue", validateToken, (req, res) => {

	const query1 = `SELECT r.*, u.*, b.* FROM request r INNER JOIN user u ON r.user_id = u.user_id INNER JOIN books b ON r.book_id = b.book_id WHERE r.status = "issue requested" and b.Quantity>0; `;


	database.query(query1, (err, data) => {

		if (err) throw err;
		res.render(path.join(rootDir, "views", "accept_issue.ejs"), { sampleData: data });
	});
}

);



router.post("/accept_ir", validateToken, (req, res) => {

	const { recordId, bookId } = req.body;

	var query2 = `UPDATE request SET status = "owned" WHERE request_id = ${recordId};`;

	database.query(query2, (err, result) => {
		if (err) {
			console.error(err);
			res.sendStatus(500);
		} else {
			if (result.affectedRows > 0) {
				var query3 = `
				UPDATE books SET Quantity = Quantity -1  WHERE book_id = ${bookId};`;
				database.query(query3, (err, result) => {
					if (err) {
						console.error(err);
						res.sendStatus(500);
					} else {
						if (result.affectedRows > 0) {
							res.redirect(`/accept_issue`);
						} else {
							res.sendStatus(404);
						}
					}
				});

			} else {
				res.sendStatus(404);
			}
		}


	});



});


router.post("/reject_ir", validateToken, (req, res) => {

	const { recordId } = req.body;

	var query2 = `DELETE FROM request WHERE request_id = ${recordId}`;

	database.query(query2, (err, result) => {
		if (err) {
			console.error(err);
			res.sendStatus(500);
		} else {
			if (result.affectedRows > 0) {
				res.redirect(`/accept_issue`)
			} else {
				res.sendStatus(404);
			}
		}
	});
});


router.post('/logout', (req, res) => {
	res.clearCookie('access-token');
	res.redirect(`/alogin`)
});

module.exports = router;