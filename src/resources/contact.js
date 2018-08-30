import Contact from '../controllers/contact';
import express from 'express';
import authMiddleware from './../middlewares/auth';

const router = express.Router();
router.use(authMiddleware);

router.get('/all', Contact.all);
router.get('/:id', Contact.get);
router.post('/create', Contact.create);
router.put('/update/:id', Contact.update);
router.delete('/:id', Contact.remove);
/**
 * 
 * 
 */
module.exports = app => {
    app.use('/contact', router)
    /**
     * Create the remaining routes
     * get,
     * create,
     * delete,
     * update,
     * remove
     */
};
