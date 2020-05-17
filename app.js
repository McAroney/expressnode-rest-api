var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var urlencode = require("urlencode");
var user = process.env.DB_USER;
var pass = process.env.DB_PASS;
var dbUrl = urlencode(
	"mongodb://" + user + ":" + pass + "\u0040ds155699.mlab.com:55699/products"
);

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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: "true" }));

app.use("/products", productsRouter);

module.exports = app;
