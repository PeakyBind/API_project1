// ./app/models/tutorialsModel.js

var mongoose = require('mongoose');
var schema = require('./../schemas/tutorialsSchemas');

var model = mongoose.model('Tutorials', schema);

module.exports = model;
