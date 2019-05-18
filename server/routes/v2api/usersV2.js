import express from "express";
import userController from "../../controller/v2/usersControllerV2";
import Helper from "../../helper/users";

const { createUserDb, loginDb } = userController;
const { trimmer } = Helper;
const router = express.Router();

// user signup route
router.post("/signup", trimmer, createUserDb);

// user login route
router.post("/signin", trimmer, loginDb);

// expose router
export default router;
