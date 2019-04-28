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
const { verifyToken, trimmer } = Auth;
const router = express.Router();

// Admin verify user route
router.patch("/users/:email/verify", verifyToken, verifyClient);
// Admin view specific loan by id
router.get("/loans/:id", verifyToken, specificLoan);
// Admin get loan repayment status
router.get("/loans", trimmer, verifyToken, loanRepayment);
// Admin get all loans route
router.get("/loans", verifyToken, getAllLoans);
// Admin approve or reject loan route
router.patch("/loans/:id", trimmer, verifyToken, approveRejectLoan);
router.post("/loans/:id/repayment", verifyToken, postPayment);

export default router;
