import express from "express";
import userController from "../../controller/userController";
import Auth from "../../middleware/isAuth";
const { createUser, loginUser } = userController;
const { trimmer } = Auth;
const router = express.Router();

// user signup route
router.post("/signup", trimmer, createUser);
// login route
router.post("/login", trimmer, loginUser);

// expose router
export default router;
