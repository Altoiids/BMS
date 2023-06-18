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


async function hashPassword(password) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);

    return {
        salt: salt,
        hash: hash,
    };
}



router.get("/add_admin", validateToken, function (request, response, next) {

    response.render(path.join(rootDir, "views", "add_admin.ejs"), { title: 'Add New Admin' });

});

router.post("/addadmin", async (request, res) => {


    var name = request.body.name;
    var email = request.body.email;
    var password = request.body.password;
    var passwordc = request.body.passwordc;
    var pass = await hashPassword(password);


    var query = `INSERT INTO user (name, email, salt, hash, Admin_id) VALUES ("${database.escape(name)}", "${database.escape(email)}", "${pass.salt}", "${pass.hash}", 1)`;


    database.query(query, function (error, data) {

        if (error) {
            throw error;
        }
        else {
           
            res.redirect(`/add_admin`);
        }

    });

});

router.post('/logout', (req, res) => {
    res.clearCookie('access-token');
    res.redirect("/alogin")
});



module.exports = router;

