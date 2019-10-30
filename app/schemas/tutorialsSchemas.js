// ./app/schemas/tutorialsSchema.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const tutorialsSchema = new Schema({
  title : { type: String, required: true },
  headline: { type: String },
  description: { type: String },
  training: { type: ObjectId, ref: 'Trainings' },
  thumbnails: {
    default: {
      url: { type: String },
      width: { type: Number },
      height: { type: Number }
    },
    medium: {
      url: { type: String },
      width: { type: Number },
      height: { type: Number }
    },
    high: {
      url: { type: String },
      width: { type: Number },
      height: { type: Number }
    },
    standard: {
      url: { type: String },
      width: { type: Number },
      height: { type: Number }
    },
    maxres: {
      url: { type: String },
      width: { type: Number },
      height: { type: Number }
    }
  },
  video: {
    youtubeId: { type: String },
    publishedAt: { type: String },
    duration: { type: String }
  },
});

module.exports = tutorialsSchema;
