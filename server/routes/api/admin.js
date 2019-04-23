import express from 'express';
import loanController from '../../controller/loanController';
import admin from '../../controller/adminController';
import Auth from '../../middleware/isAuth';

const {trimmer} = Auth;

const router = express.Router();


// apply loan route
router.patch('/users/:email/verify',trimmer, admin.verifyClient);

export default router;