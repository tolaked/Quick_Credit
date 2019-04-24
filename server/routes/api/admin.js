import express from 'express';
import loanController from '../../controller/loanController';
import admin from '../../controller/adminController';
import Auth from '../../middleware/isAuth';

const {trimmer} = Auth;

const router = express.Router();

// Admin verify user route
router.patch('/users/:email/verify',trimmer, admin.verifyClient);
// Admin view specific loan by id
router.get('/loans/:id', admin.specificLoan);
router.get('/loans', admin.getAllLoans);

export default router;