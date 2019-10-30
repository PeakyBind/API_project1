// ./app/models/categoriesModel.js

var mongoose = require('mongoose');
var schema = require('./../schemas/categoriesSchema');

var model = mongoose.model('Categories', schema);

module.exports = model;
