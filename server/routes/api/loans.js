import express from 'express';
import loanController from '../../controller/loanController';



const router = express.Router();
const{applyloan,paidLoans} = loanController

// apply loan route
router.post('/loans', applyloan);
// get loan repayment history by email
router.get('/loan/:email/repayments', paidLoans);


export default router;