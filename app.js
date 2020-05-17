var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var user = process.env.DB_USER;
var pass = process.env.DB_PASS;
var dbUrl =
	"mongodb://" + user + ":" + pass + "@ds155699.mlab.com:55699/products";

var productsRouter = require("./routes/products");

var app = express();

mongoose.Promise = global.Promise;

mongoose
	.connect(dbUrl, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => console.log("connection succesful"))
	.catch((err) => console.error(err));

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
	next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: "true" }));

app.use("/products", productsRouter);

module.exports = app;
