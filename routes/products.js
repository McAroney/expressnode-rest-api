var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var Product = require("../models/Product.js");

/* GET ALL PRODUCTS */
router.get("/", function (req, res, next) {
	Product.find(function (err, products) {
		if (err) return next(err);
		res.json(products);
	});
});

/* GET SINGLE PRODUCT BY ID */

/* SAVE PRODUCT */
router.post("/", function (req, res) {
	Product.create(req.body, function (err, post) {
		if (err) res.json({ err: err });
		res.json(post);
	});
});

/* UPDATE PRODUCT */

/* DELETE PRODUCT */

module.exports = router;
