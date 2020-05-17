var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var Product = require('../models/Product.js')

/* GET ALL PRODUCTS */
router.get('/', function (req, res) {
  console.log("entered '.../products/' route..")
  Product.find({}, function (err, products) {
    if (err) res.json({ err: err })
    res.json({ res: products })
  })
})

/* GET SINGLE PRODUCT BY ID */
router.get('/:id', function (req, res) {
  Product.findById(req.params.id, function (err, post) {
    if (err) return res.json({ err: err })
    res.json(post)
  })
})

/* SAVE PRODUCT */
router.post('/', function (req, res) {
  Product.create(req.body, function (err, post) {
    if (err) res.json({ err: err })
    res.json(post)
  })
})

/* UPDATE PRODUCT */
router.put('/:id', function (req, res) {
  Product.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) res.json({ err: err })
    res.json(post)
  })
})

/* DELETE PRODUCT */
router.delete('/:id', function (req, res) {
  Product.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) res.json({ err: err })
    res.json(post)
  })
})

module.exports = router
