import express from 'express';
import userController from '../../controller/userController';
import Auth from '../../middleware/isAuth';

const {trimmer} = Auth;

const router = express.Router();

// user signup route
router.post('/signup', trimmer,userController.createUser);
router.post('/login',trimmer,userController.loginUser);

// expose router
export default router;