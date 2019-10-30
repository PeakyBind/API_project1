// ./app/schemas/categoriesSchema.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categoriesSchema = new Schema({
  title: { type: String, required: true}
});

module.exports = categoriesSchema;
