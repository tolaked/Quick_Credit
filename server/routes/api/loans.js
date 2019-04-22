import express from 'express';
import loanController from '../../controller/loanController';

const router = express.Router();

// apply loan route
router.post('/loan', loanController.applyloan);

export default router;