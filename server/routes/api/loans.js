import express from "express";
import loanController from "../../controller/v1/LoanController";
import Auth from "../../middleware/isAuth";

const { verifyToken } = Auth;
const { applyLoan, paidLoans } = loanController;

const router = express.Router();

// apply loan route
router.post("/loans", verifyToken, applyLoan);
// get loan repayment history by id
router.get("/loans/:id/repayments", verifyToken, paidLoans);

export default router;
