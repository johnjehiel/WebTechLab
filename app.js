const express = require("express");

//creating a app variable to carry out express framework's functionsconst app = express()

//dotenv variable for accessing .env file's variablesrequire('dotenv').config();

//extablish connection
var con = require("./connection");

//to get data from front end
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//for using js code inside html elementsapp.set('view engine','ejs');

//listening app on port 3000
app.listen(3000, function () {
	console.log("Server is running");
});

//add data[CREATE]
app.post("/", function (req, res) {
	var name = req.body.name;
	var email = req.body.email;
	var sql = "INSERT INTO test (UserName, Email) VALUES (?)";
	var values = [name, email];
	con.query(sql, [values], function (err, result) {
		if (err) throw err;
		res.redirect("/");
	});
});

//display data[READ]
app.get("/", function (req, res) {
	var sql = "SELECT * FROM test;";
	con.query(sql, function (error, result) {
		if (error) throw error;
		res.render("display", { test: result });
	});
});

//display update form
app.get("/update", function (req, res) {
	con.connect(function (error) {
		if (error) console.log(error);
		var sql = "select * from test where id =?;";
		var id = req.query.id;
		con.query(sql, [id], function (error, result) {
			if (error) console.log(error);
			res.render("update", { test: result });
		});
	});
});

//update data[UPDATE]
app.post("/updateData", function (req, res) {
	var name = req.body.name;
	var email = req.body.email;
	var id = req.body.id;
	var sql = "update test set UserName=?, Email=? where id=?;";
	con.query(sql, [name, email, id], function (error, result) {
		if (error) console.log(error);
		res.redirect("/");
	});
});

//delete data[DELETE]
app.get("/delete", function (req, res) {
	con.connect(function (err) {
		if (err) console.log(err);
		var sql = "delete from test where id=?;";
		var id = req.query.id;
		con.query(sql, [id], function (error, result) {
			if (error) console.log(error);
			res.redirect("/");
		});
	});
});
