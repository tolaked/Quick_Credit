import express from "express";
import loanController from "../../controller/loanController";
import admin from "../../controller/adminController";
import Auth from "../../middleware/isAuth";
const {
  loanRepayment,
  getAllLoans,
  specificLoan,
  verifyClient,
  approveRejectLoan,
  postPayment
} = admin;
const { trimmer } = Auth;
const router = express.Router();

// Admin verify user route
router.patch("/users/:email/verify", verifyClient);
// Admin view specific loan by id
router.get("/loans/:id", specificLoan);
// Admin get loan repayment status
router.get("/loans", trimmer, loanRepayment);
// Admin get all loans route
router.get("/loans", getAllLoans);
// Admin approve or reject loan route
router.patch("/loans/:id", trimmer, approveRejectLoan);
router.post("/loans/:id/repayment", postPayment);

export default router;
