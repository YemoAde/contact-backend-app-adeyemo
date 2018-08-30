import Contact from './../entities/contact';
import Misc from './../utils/misc';
/**
 * A simple CRUD controller for contacts
 * Create the necessary controller methods 
 */

 /**
 * return void|mixed|Exception
 * Return all contacts
 */
export const all = (req, res) => {
	Contact.find().populate('user', 'username').exec((err, contacts) => {
        if(err){
            return Misc.responseHandler(res, 404, 'contacts_not_found');
        }else{
            return Misc.responseHandler(res, 200, 'contacts', contacts);
        }
        
    })
};

/**
 * param ObjectId id
 * return void|mixed|Exception
 * Returns a given contact by id
 */
export const get = (req, res) => {
    let contact_id = req.params.id
	Contact.findById(contact_id,).populate('user', 'username').exec((err, contact) => {
        if(err){
            return Misc.responseHandler(res, 404, 'contact_not_found');
        }
        return Misc.responseHandler(res, 200, 'contacts', contact);
    
        
    })
};

/**
 * return void|mixed|Exception
 * Creates a Contact
 * @todo Update Node and use spread Operator
 */
export const create = (req, res) => {
   let new_contact = new Contact(req.body);
   //User Id retrieved from token payload
   new_contact['user'] = req.user._id

   new_contact.save(new_contact, (err, contact) => {
       if(err || !contact) {
           return Misc.responseHandler(res, 400, 'contact_not_added', err);
       }
       return Misc.responseHandler(res, 200, 'contact_added', contact)
   })
};

/**
 * param ObjectId id
 * return void|mixed|Exception
 * Update a Contact by Id
 */
export const update = (req, res) => {
    let contact_id = req.params.id
    let _contact = req.body;
    //User Id retrieved from token payload
    _contact['user'] = req.user._id;
    Contact.findByIdAndUpdate(contact_id, _contact, (err, contact) => {
        if(err || !contact){
            return Misc.responseHandler(res, 400, 'update_operation_failed');
        }else{
            Contact.findById(contact_id,).populate('user', 'username').exec((err, uContact) => {
                return Misc.responseHandler(res, 200, 'updated', uContact);
            })
        }
    })
}

/**
 * param ObjectId id
 * return void|mixed|Exception
 * Delete a Contact by Id
 */
export const remove = (req, res) => {
    let contact_id = req.params.id
    Contact.findByIdAndDelete(contact_id, (err, contact) => {
        if(err || !contact){
            return Misc.responseHandler(res, 400, 'delete_operation_failed');
        }else{
            return Misc.responseHandler(res, 200, 'deleted', contact)
        }
    }) 
}

export default {
    // get all contacts for a user
    all,
    // get a single contact
    get,
    // // create a single contact
    create,
    // // update a single contact
    update,
    // // remove a single contact
    remove
}