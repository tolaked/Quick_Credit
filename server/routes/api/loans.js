import express from 'express';
import loanController from '../../controller/loanController';
import Auth from '../../middleware/isAuth';

const {trimmer} = Auth;
const router = express.Router();

// apply loan route
router.post('/loan', loanController.applyloan);

export default router;