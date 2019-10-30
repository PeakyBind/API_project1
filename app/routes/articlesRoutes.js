const express = require('express');
const router = require('express-promise-router')();
const controllerHelper = require('../helpers/controllerHelpers');
const articlesController = require('../controllers/articlesController');

router.route('/')
  .get(articlesController.findAll);

router.route('/image')
  .post(controllerHelper.articlesImagesStorage.single('upload'), articlesController.uploadImage);

router.route('/add')
  .post(articlesController.addOne);

module.exports = router;
