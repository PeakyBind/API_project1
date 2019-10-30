// ./app/models/trainingsModel.js

var mongoose = require('mongoose');
var schema = require('./../schemas/trainingsSchema');

var model = mongoose.model('Trainings', schema);

module.exports = model;
