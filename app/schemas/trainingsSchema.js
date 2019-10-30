// ./app/schemas/trainingsSchema.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trainingsSchema = new Schema({
  title: { type: String, required: true}
});

module.exports = trainingsSchema;
