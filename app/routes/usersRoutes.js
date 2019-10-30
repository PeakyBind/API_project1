const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../passport');

const { validateBody, schemas } = require('../helpers/routeHelpers');
const UsersController = require('../controllers/usersController');
const controllerHelper = require('../helpers/controllerHelpers');
const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });
const passportGoogle = passport.authenticate('googleToken', {
  scope: [ 'email', 'profile' ],
  session: false
});

router.route('/')
  .get(UsersController.findAll);

router.route('/:id')
  .get(passportJWT, UsersController.findOneById);

router.route('/:id/password')
  .put(passportJWT, validateBody(schemas.passwordSchema), UsersController.updatePassword);

router.route('/:id/avatar')
  .post(passportJWT, controllerHelper.avatarsStorage.single('avatar'), UsersController.uploadAvatar);

router.route('/:id/trainings')
  .post(passportJWT, UsersController.uploadTrainings);

router.route('/:id')
  .delete(UsersController.deleteOneById);

router.route('/signup')
  .post(validateBody(schemas.signUpSchema), UsersController.signUp);

router.route('/signin')
  .post(validateBody(schemas.signInSchema), passportSignIn, UsersController.signIn);

router.route('/oauth/google')
  .get(passportGoogle);

router.route('/oauth/google/callback')
  .get(
    passport.authenticate('googleToken', {
     failureRedirect: '/'
    }),
    UsersController.googleOauth
  );

router.route('/checkAuth/:id')
  .get(passportJWT, UsersController.checkAuth);

module.exports = router;
