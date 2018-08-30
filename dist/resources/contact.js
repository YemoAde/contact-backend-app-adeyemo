'use strict';

var _contact = require('../controllers/contact');

var _contact2 = _interopRequireDefault(_contact);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _auth = require('./../middlewares/auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
router.use(_auth2.default);

router.get('/all', _contact2.default.all);
router.get('/:id', _contact2.default.get);
router.post('/create', _contact2.default.create);
router.put('/update/:id', _contact2.default.update);
router.delete('/:id', _contact2.default.remove);
/**
 * 
 * 
 */
module.exports = function (app) {
  app.use('/contact', router);
  /**
   * Create the remaining routes
   * get,
   * create,
   * delete,
   * update,
   * remove
   */
};