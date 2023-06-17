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


router.get("/view_admin", validateToken, (req, res) => {

    const query1 = `SELECT * FROM user WHERE Admin_id = 1;`;

    database.query(query1, (err, data) => {

        if (err) throw err;
        res.render(path.join(rootDir, "views", "view_admin.ejs"), { sampleData: data });
    });

});

router.post("/logout", (req, res) => {
    res.clearCookie('access-token');
    res.redirect("/alogin")
});




module.exports = router;