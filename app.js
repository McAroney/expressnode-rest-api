var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cors = require("cors");
var user = process.env.DB_USER;
var pass = process.env.DB_PASS;
var dbUrl =
	"mongodb://" + user + ":" + pass + "@ds155699.mlab.com:55699/products";

var productsRouter = require("./routes/products");

var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: "true" }));
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use("/products", productsRouter);

mongoose
	.connect(dbUrl, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => console.log("connection succesful"))
	.catch((err) => console.error(err));

module.exports = app;
