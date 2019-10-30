// ./app/schemas/usersSchema.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const usersSchema = new Schema({
  method: { type: String, enum: ['local', 'google'], required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  avatar: { type: String },
  local: {
    email: { type: String, lowercase: true },
    password: { type: String }
  },
  google: {
    id: { type: String },
    email: { type: String, lowercase: true }
  },
  trainings: [
    { type: ObjectId, ref: 'Trainings' }
  ]
}, {
  timestamps: true
});

usersSchema.pre('save', async function (next) {
  try {
    if (this.method !== 'local') {
      next();
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(this.local.password, salt);
    this.local.password = passwordHash;
    next();
  } catch(error) {
    next(error);
  }
});

usersSchema.methods.isValidPassword = async function (newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.local.password);
  } catch(error) {
    throw new Error(error);
  }
};

module.exports = usersSchema;
