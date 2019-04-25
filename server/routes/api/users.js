import express from "express";
import userController from "../../controller/userController";

const { createUser, loginUser } = userController;
const router = express.Router();

// user signup route
router.post("/signup", createUser);
router.post("/login", loginUser);

// expose router
export default router;
