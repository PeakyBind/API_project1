const express = require('express');
const router = require('express-promise-router')();

const trainingsController = require('../controllers/trainingsController');

router.route('/')
  .get(trainingsController.findAll);

router.route('/add')
  .post(trainingsController.addOne);

router.route('/addImported')
  .post(trainingsController.addImportedOne);

router.route('/:id')
  .put(trainingsController.editOneById);

router.route('/:id')
  .delete(trainingsController.deleteOneById);

router.route('/youtubeImport')
  .post(trainingsController.importOneByYoutube);

module.exports = router;
