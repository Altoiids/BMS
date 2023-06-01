var express = require('express');
var router = express.Router();
var database = require('../database');
const path = require('path');
const rootDir = require("../path")

router.get("/sample_data", function(request, response, next){

	var query = "SELECT * FROM books";

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



router.get("/book_admin/add", function(request, response, next){

	response.render(path.join(rootDir,"views","books.ejs"), {title:'Insert Data into MySQL', action:'add'});

});

router.post("/book_admin/add_sample_data", function(request, response, next){

	var book_name = request.body.book_name;

	var publisher = request.body.publisher;

	var ISBN = request.body.ISBN;

	var Edition = request.body.Edition;

	var query = `
	INSERT INTO books
	(book_name, publisher, ISBN, edition) 
	VALUES ("${book_name}", "${publisher}", "${ISBN}", "${Edition}")
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

module.exports = router;