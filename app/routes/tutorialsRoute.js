const express = require('express');
const router = require('express-promise-router')();

const tutorialsController = require('../controllers/tutorialsController');

router.route('/')
  .get(tutorialsController.findAll);

router.route('/add')
  .post(tutorialsController.addOne);

router.route('/youtubeImport')
  .post(tutorialsController.importOneByYoutube);

router.route('/:id')
  .put(tutorialsController.editOneById);

router.route('/:id')
  .delete(tutorialsController.deleteOneById);

module.exports = router;
