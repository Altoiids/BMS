var express = require('express');
var router = express.Router();
var database = require('../database');
const path = require('path');
const rootDir = require("../path")
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const cookieParser = require("cookie-parser");
const { createTokens, validateToken } = require(path.join(rootDir,"JWT.js"));

router.use(cookieParser());


router.get("/profile",validateToken, (req, res) => {
	const username = req.query.username;
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
			//PROFILE PAGE IS NOT COMPLETED	
					
				const query = `select * from requests where user_id=${database.escape(results[0].user_id)}`;
				database.query(query, (err, requestdata) => {
							if (err) throw err;
							response.render(path.join(rootDir,"views","profile.ejs"), {title: username, action:'list', sampleData:data});
						});
					}
                    
        )};            	
			});
		
	



module.exports = router;