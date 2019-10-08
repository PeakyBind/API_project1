// ./app/models/usersModel.js

var mongoose = require('mongoose');
var schema = require('./../schemas/usersSchema');

var model = mongoose.model('Users', schema);

module.exports = model;
