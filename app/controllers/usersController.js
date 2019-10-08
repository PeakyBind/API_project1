const JWT = require('jsonwebtoken');
const User = require('../models/usersModel');

signToken = user => {
  return JWT.sign({
    iss: process.env.JWT_ISS,
    sub: user.id,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1)
  }, process.env.JWT_SECRET);
};

module.exports = {
  signUp: async (req, res, next) => {
    const { email, password } = req.body;

    const foundUser = await User.findOne({ email });
    if (foundUser) { return res.status(403).json({ error: "Email is already used" }); }

    const newUser = new User({ email, password });
    await newUser.save();

    const token = signToken(newUser);

    res.status(200).json({ token })
  },

  signIn: async (req, res, next) => {
    const token = signToken(req.user);
    res.status(200).json({ token });
    console.log('Successful login');
  },

  secret: async (req, res, next) => {
    console.log('I managed to get here');
    res.json({ secret: "ressource" })
  }
};
