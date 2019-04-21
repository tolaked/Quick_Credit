import express from 'express';
import userController from '../../controller/userController';


const router = express.Router();

// user signup route
router.post('/signup', userController.createUser);

// expose router
export default router;