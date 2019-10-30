// ./app/schemas/articlesSchema.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const articlesSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true},
  tutorial: { type: ObjectId, ref: 'Tutorials' }
});

module.exports = articlesSchema;
