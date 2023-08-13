const express = require('express');
const router = express.Router();
const path = require('path');
const rootDir = require("../path")

router.get("/", (req, res) => {
    res.render(path.join(rootDir, 'views', 'login.ejs'));
});
router.get("/admin", (req, res) => {
    res.render(path.join(rootDir, 'views', 'login.ejs'));
});

module.exports = router;