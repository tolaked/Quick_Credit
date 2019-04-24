import express from 'express';
import loanController from '../../controller/loanController';
import Auth from '../../middleware/isAuth';

const {trimmer} = Auth;
const router = express.Router();
const{applyloan,paidLoans} = loanController
// apply loan route
router.post('/loans', applyloan);
router.get('/loan/:email/repayments', paidLoans);

export default router;