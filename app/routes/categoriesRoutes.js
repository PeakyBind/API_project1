const express = require('express');
const router = require('express-promise-router')();

const categoriesController = require('../controllers/categoriesController');

router.route('/')
  .get(categoriesController.findAll);

router.route('/add')
  .post(categoriesController.addOne);

router.route('/:id')
  .put(categoriesController.editOneById);

router.route('/:id')
  .delete(categoriesController.deleteOneById);

module.exports = router;
