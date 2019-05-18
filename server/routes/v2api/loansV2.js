import express from "express";
import LoansDb from "../../controller/v2/v2loanController";
import Auth from "../../middleware/isAuth";
import Helper from "../../helper/users";

const { createLoan, repayments } = LoansDb;
const { verifyTokendb } = Auth;
const { trimmer } = Helper;

const router = express.Router();

// user create loan route
router.post("/loans", verifyTokendb, trimmer, createLoan);

// Get loan repayment history
router.get("/loans/:id/repayments", verifyTokendb, repayments);

// expose router
export default router;
