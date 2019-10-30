// ./app/models/articlesModel.js

var mongoose = require('mongoose');
var schema = require('./../schemas/articlesSchema');

var model = mongoose.model('Articles', schema);

module.exports = model;
