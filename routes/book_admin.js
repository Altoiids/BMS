var express = require('express');
var router = express.Router();
var database = require('../database');
const path = require('path');
const rootDir = require("../path")

router.get("/sample_data", function(request, response, next){

	var query = "SELECT * FROM books where Quantity >= 1";

	database.query(query, function(error, data){

		if(error)
		{
			throw error; 
		}
		else
		{
			response.render(path.join(rootDir,"views","books.ejs"), {title:'Books_Inventory', action:'list', sampleData:data});
		}

	});

});



router.get("/book_admi/add", function(request, response, next){

	response.render(path.join(rootDir,"views","books.ejs"), {title:'Add New Book', action:'add'});

});

router.post("/book_admin/add_sample_data", function(request, response, next){

	var book_name = request.body.book_name;

	var publisher = request.body.publisher;

	var ISBN = request.body.ISBN;

	var Edition = request.body.Edition;
	var Quantity = request.body.Quantity;
	console.log(request.body);

	var query = `
	INSERT INTO books
	(book_name, publisher, ISBN, Edition, Quantity) 
	VALUES ("${book_name}", "${publisher}", "${ISBN}", "${Edition}", "${Quantity}" )
	`;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}	
		else
		{
			response.redirect("/sample_data");
		}

	});

});


router.post('/delete', (req, res) => {
	const { recordId, quantity } = req.body;
  
	
	const query = `UPDATE books SET Quantity = Quantity - ${quantity} WHERE book_id = ${recordId} and Quantity >= ${quantity}`;
	database.query(query, (err, result) => {
	  if (err) {
		console.error(err);
		res.sendStatus(500);
	  } else {
		if (result.affectedRows > 0) {
		  res.redirect('/sample_data'); 
		} else {
		  res.sendStatus(404); 
		  
		}
	  }
	});
  });


  router.post('/add_new', (req, res) => {
	const { recordId, quantity } = req.body;
  
	
	const query = `UPDATE books SET Quantity = Quantity + ${quantity} WHERE book_id = ${recordId}`;
	database.query(query, (err, result) => {
	  if (err) {
		console.error(err);
		res.sendStatus(500);
	  } else {
		if (result.affectedRows > 0) {
		  res.redirect('/sample_data'); 
		} 
	  }
	});
  });


module.exports = router;

