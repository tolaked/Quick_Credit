import express from "express";
import loanController from "../../controller/loanController";
import admin from "../../controller/adminController";

const { loanRepayment, getAllLoans, specificLoan } = admin;

const router = express.Router();

// Admin verify user route
router.patch("/users/:email/verify", admin.verifyClient);
// Admin view specific loan by id
router.get("/loans/:id", specificLoan);
// Admin get loan repayment status
router.get("/loans", loanRepayment, getAllLoans);
export default router;
