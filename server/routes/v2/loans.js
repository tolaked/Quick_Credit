import express from "express";
import LoansDb from "../../controller/v2/LoanController";
import Auth from "../../middleware/isAuth";
import Helper from "../../helper/users";

const { applyForLoan, viewRepayments, userViewLoans } = LoansDb;
const { verifyTokendb } = Auth;
const { trimmer } = Helper;

const router = express.Router();

// user create loan route
router.post("/loans", verifyTokendb, trimmer, applyForLoan);

// Get loan repayment history
router.get("/loans/:id/repayments", verifyTokendb, viewRepayments);

// User get own loans
router.get("/loans/history", verifyTokendb, userViewLoans);

// expose router
export default router;
