
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

router.get("/alogin", function (request, response, next) {

	response.render(path.join(rootDir, "views", "adminlogin.ejs"), {});

});


router.post("/alogin", async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) res.redirect(`/alogin`);
	else {
		database.query(
			`select * from user where email = ${database.escape(email)}`,
			async (err, result) => {
				if (err) throw err;
				if (!result[0]) {
					res.redirect(`/alogin`);
				} else {
					let hash = await bcrypt.hash(password, result[0].salt);
					if (hash !== result[0].hash || result[0].Admin_id != 1) {
						console.log("passwords don't match");
						res.redirect(`/alogin`);
					} else {
						const accessToken = createTokens(result[0]);
						res.cookie("access-token", accessToken, {
							maxAge: 60 * 60 * 24 * 1000,
							httpOnly: true,
						});

						res.redirect(`/inventory?username=${result[0].name}`);
					}
				}
			}
		);
	}
});


module.exports = router;