
var express = require('express');
var router = express.Router();
var database = require('../database');
const path = require('path');
const rootDir = require("../path")
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const cookieParser = require("cookie-parser");
const { createTokens, validateToken } = require(path.join(rootDir, "JWT.js"));


async function hashPassword(password) {
	const saltRounds = 10;
	const salt = await bcrypt.genSalt(saltRounds);
	const hash = await bcrypt.hash(password, salt);

	return {
		salt: salt,
		hash: hash,
	};
}

router.use(cookieParser());

router.get("/login", function (request, response, next) {

	response.render(path.join(rootDir, "views", "login.ejs"), {});

});

router.get("/signup", function (request, response, next) {

	response.render(path.join(rootDir, "views", "signup.ejs"), { title: 'Add New Book', action: 'add' });

});

router.post("/signup", async (request, res) => {

	var name = request.body.name;
	var email = request.body.email;
	var password = request.body.password;
	var passwordc = request.body.passwordc;
	var pass = await hashPassword(password);

	var query5 = `SELECT * FROM user WHERE email = ${database.escape(email)}`;

	database.query(query5, (err, result) => {
		if (!result[0]) {
	var query = `INSERT INTO user (name, email, salt, hash) VALUES ("${name}", "${email}", "${pass.salt}", "${pass.hash}")`;

	database.query(query, function (error, data) {

		if (error) {
			throw error;
		}
		else {
			const accessToken = createTokens(name);
			res.cookie("access-token", accessToken, {
				maxAge: 60 * 60 * 24 * 30 * 1000,
				httpOnly: true,
			});

			res.redirect(`/profile_new`);
		}

	})}
	else { const script = `
	<script>
	  alert('Email already inuse');
	  window.history.back();
	</script>
  `;
  res.send(script); }
});

});

router.post("/login", async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) res.redirect("/login");
	else {
		database.query(
			`select * from user where email = ${database.escape(email)} and Admin_id = 0` ,
			async (err, result) => {
				if (err) throw err;
				if (!result[0]) {
					res.redirect("/login");
				} else {
					let hash = await bcrypt.hash(password, result[0].salt);
					if (hash !== result[0].hash) {
						const script = `
						<script>
						  alert('Password Incorrect');
						  window.history.back();
						</script>
					  `;
					  res.send(script);
					} else {
						const accessToken = createTokens(result[0]);
						res.cookie("access-token", accessToken, {
							maxAge: 60 * 60 * 24 * 1000,
							httpOnly: true,
						});

						res.redirect(`/profile`);
					}
				}
			}
		);
	}
});


module.exports = router;