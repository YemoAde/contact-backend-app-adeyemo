'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.remove = exports.update = exports.create = exports.get = exports.all = undefined;

var _contact2 = require('./../entities/contact');

var _contact3 = _interopRequireDefault(_contact2);

var _misc = require('./../utils/misc');

var _misc2 = _interopRequireDefault(_misc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A simple CRUD controller for contacts
 * Create the necessary controller methods 
 */

/**
* return void|mixed|Exception
* Return all contacts
*/
var all = exports.all = function all(req, res) {
    _contact3.default.find().populate('user', 'username').exec(function (err, contacts) {
        if (err) {
            return _misc2.default.responseHandler(res, 404, 'contacts_not_found');
        } else {
            return _misc2.default.responseHandler(res, 200, 'contacts', contacts);
        }
    });
};

/**
 * param ObjectId id
 * return void|mixed|Exception
 * Returns a given contact by id
 */
var get = exports.get = function get(req, res) {
    var contact_id = req.params.id;
    _contact3.default.findById(contact_id).populate('user', 'username').exec(function (err, contact) {
        if (err) {
            return _misc2.default.responseHandler(res, 404, 'contact_not_found');
        }
        return _misc2.default.responseHandler(res, 200, 'contacts', contact);
    });
};

/**
 * return void|mixed|Exception
 * Creates a Contact
 * @todo Update Node and use spread Operator
 */
var create = exports.create = function create(req, res) {
    var new_contact = new _contact3.default(req.body);
    //User Id retrieved from token payload
    new_contact['user'] = req.user._id;

    new_contact.save(new_contact, function (err, contact) {
        if (err || !contact) {
            return _misc2.default.responseHandler(res, 400, 'contact_not_added', err);
        }
        return _misc2.default.responseHandler(res, 200, 'contact_added', contact);
    });
};

/**
 * param ObjectId id
 * return void|mixed|Exception
 * Update a Contact by Id
 */
var update = exports.update = function update(req, res) {
    var contact_id = req.params.id;
    var _contact = req.body;
    //User Id retrieved from token payload
    _contact['user'] = req.user._id;
    _contact3.default.findByIdAndUpdate(contact_id, _contact, function (err, contact) {
        if (err || !contact) {
            return _misc2.default.responseHandler(res, 400, 'update_operation_failed');
        } else {
            _contact3.default.findById(contact_id).populate('user', 'username').exec(function (err, uContact) {
                return _misc2.default.responseHandler(res, 200, 'updated', uContact);
            });
        }
    });
};

/**
 * param ObjectId id
 * return void|mixed|Exception
 * Delete a Contact by Id
 */
var remove = exports.remove = function remove(req, res) {
    var contact_id = req.params.id;
    _contact3.default.findByIdAndDelete(contact_id, function (err, contact) {
        if (err || !contact) {
            return _misc2.default.responseHandler(res, 400, 'delete_operation_failed');
        } else {
            return _misc2.default.responseHandler(res, 200, 'deleted', contact);
        }
    });
};

exports.default = {
    // get all contacts for a user
    all: all,
    // get a single contact
    get: get,
    // // create a single contact
    create: create,
    // // update a single contact
    update: update,
    // // remove a single contact
    remove: remove
};