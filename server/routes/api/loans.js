import express from "express";
import loanController from "../../controller/loanController";
import Auth from "../../middleware/isAuth";

const { verifyToken } = Auth;
const router = express.Router();
const { applyloan, paidLoans } = loanController;

// apply loan route
router.post("/loans", verifyToken, applyloan);
// get loan repayment history by email
router.get("/loans/:id/repayments", verifyToken, paidLoans);

export default router;
