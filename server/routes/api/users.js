import express from 'express';
import userController from '../../controller/userController';

const router = express.Router();

// user signup route
router.post('/signup',userController.createUser);
router.post('/login',userController.loginUser);

// expose router
export default router;