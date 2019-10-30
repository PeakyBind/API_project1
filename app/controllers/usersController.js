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
  findAll: async (req, res, next) => {
    const Users = await User.find()
      .select('_id method local.email google.email createdAt updatedAt')
      .exec();
    const response = Users.map(doc => {
      let email;
      if (doc.local.email) {
        email = doc.local.email;
      }  else if (doc.google.email) {
        email = doc.google.email
      }
      return {
        id: doc._id,
        method: doc.method,
        email: email,
        password: doc.local.password,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt
      }
    });
    res.status(200).json(response);
  },

  deleteOneById: async (req, res, next) => {
    let id = req.params.id;
    User.findByIdAndRemove(id, (err, user) => {
      if (err) {
        return next(new Error('User not found'));
      } else {
        res.status(200).json('Successfully deleted');
      }
    })
  },

  signUp: async (req, res, next) => {
    const { firstName, lastName, email, password } = req.value.body;

    const foundUser = await User.findOne({ "local.email": email });
    if (foundUser) { return res.status(403).json({ error: "Email is already used" }); }

    const newUser = new User({
      method: 'local',
      firstName,
      lastName,
      local: {
        email,
        password
      }
   });
    await newUser.save();

    const token = signToken(newUser);

    res.status(200).json({ token })
  },

  signIn: async (req, res, next) => {
    const token = signToken(req.user);
    res.status(200).json({ token });
    console.log('Successful login');
  },

  googleOauth: async (req, res, next) => {
    const token = signToken(req.user);
    res.status(200).json({ token });
  },

  checkAuth: async(req, res, next) => {
    const token = req.headers.authorization;
    const decoded = JWT.decode(token);
    const id = req.params.id;

    if (id === decoded.sub) {
      res.status(200).json(true);
    } else {
      res.status(401);
    }
  },

  findOneById: async (req, res, next) => {
    const token = req.headers.authorization;
    const decoded = JWT.decode(token);
    const id = req.params.id;

    if (id === decoded.sub) {
      const user = await User.findById(id)
        .select('_id method firstName lastName avatar local.email local.password google.email trainings createdAt updatedAt')
        .exec();
      let email;
      if (user.local.email) {
        email = user.local.email;
      }  else if (user.google.email) {
        email = user.google.email
      }
      const response = {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: email,
        avatar: user.avatar,
        method: user.method,
        password: user.local.password,
        googleId: user.google.id,
        trainings: user.trainings,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      };
      res.status(200).json(response);
    }
  },

  updatePassword: async (req, res, next) => {
    const token = req.headers.authorization;
    const decoded = JWT.decode(token);
    const id = req.params.id;
    const { password } = req.value.body;

    if (id === decoded.sub) {
      const user = await User.findById(id);
      user.local.password = password;
      await user.save();

      res.status(200).json('Successful Update');
    }
  },

  uploadAvatar: async (req, res, next) => {
    const token = req.headers.authorization;
    const decoded = JWT.decode(token);
    const id = req.params.id;

    if (id === decoded.sub) {
      const user = await User.findById(id);
      user.avatar =
        process.env.HOST + ':' +
        process.env.APP_PORT + '/' +
        req.file.destination + req.file.filename;
      await user.save();

      res.status(200).json('Successfull Upload');
    }
  },

  uploadTrainings: async (req, res, next) => {
    const token = req.headers.authorization;
    const decoded = JWT.decode(token);
    const id = req.params.id;
    const training = req.body;

    if (id === decoded.sub) {
      const user = await User.findById(id);
      user.trainings.push(training.id);
      await user.save();

      res.status(200).json('Successfull Upload');
    }
  }
};
