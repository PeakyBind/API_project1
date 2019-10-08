// ./app/schemas/usersSchema.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  email: { type: String, required: true , unique: true, lowercase: true },
  password: { type: String, required: true }
});

usersSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(this.password, salt);
    this.password = passwordHash;
    next();
  } catch(error) {
    next(error);
  }
});

usersSchema.methods.isValidPassword = async function (newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.password);
  } catch(error) {
    throw new Error(error);
  }
};

module.exports = usersSchema;
