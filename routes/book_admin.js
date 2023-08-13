// var express = require('express');
var router = express.Router();
var database = require('../database');
const path = require('path');
const rootDir = require("../path")
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const cookieParser = require("cookie-parser");
const { createTokens, validateToken } = require(path.join(rootDir, "JWT.js"));

router.use(cookieParser());


router.get("/inventory", validateToken, function (request, response, next) {
	
	var query = "SELECT * FROM books where Quantity >= 1";

	database.query(query, function (error, data) {

		if (error) {
			throw error;
		}
		else {
			response.render(path.join(rootDir, "views", "books.ejs"), { title: 'Books_Inventory', action: 'list', sampleData: data });
		}

	});

});



router.get("/addd", validateToken, function (request, response, next) {

	response.render(path.join(rootDir, "views", "books.ejs"), { title: 'Add New Book', action: 'add' });

});

router.post("/book_admin/add_sample_data", validateToken, function (request, response, next) {

	var book_name = request.body.book_name;

	var publisher = request.body.publisher;

	var ISBN = request.body.ISBN;

	var Edition = request.body.Edition;
	var Quantity = request.body.Quantity;
	

	var query = `INSERT INTO books (book_name, publisher, ISBN, Edition, Quantity) VALUES (${database.escape(book_name)}, ${database.escape(publisher)}, ${database.escape(ISBN)}, "${Edition}", "${Quantity}" )`;

	database.query(query, function (error, data) {

		if (error) {
			throw error;
		}
		else {
			response.redirect("/inventory");
		}

	});

});


router.post('/delete', validateToken, (req, res) => {
	const { recordId, quantity } = req.body;


	const query = `UPDATE books SET Quantity = Quantity - ${quantity} WHERE book_id = ${recordId} and Quantity >= ${quantity}`;
	database.query(query, (err, result) => {
		if (err) {
			console.error(err);
			res.sendStatus(500);
		} else {
			if (result.affectedRows > 0) {
				res.redirect('/inventory');
			} else {
				const script = `
				<script>
				  alert('Invalid quantity entered.');
				  window.history.back();
				</script>
			  `;
			  res.send(script);

			  
			}
		}
	});
});


router.post('/add_new', validateToken, (req, res) => {
	const { recordId, quantity } = req.body;


	const query = `UPDATE books SET Quantity = Quantity + ${quantity} WHERE book_id = ${recordId}`;
	database.query(query, (err, result) => {
		if (err) {
			console.error(err);
			res.sendStatus(500);
		} else {
			if (result.affectedRows > 0) {
				res.redirect('/inventory');
			}
		}
	});
});
router.post('/logout', (req, res) => {
	res.clearCookie('access-token');
	res.redirect("/alogin")
});

module.exports = router;

