import express from "express";
import admin from "../../controller/adminController";
import Auth from "../../middleware/isAuth";
import Helper from "../../helper/users";

const {
  loanRepayment,
  getAllLoans,
  specificLoan,
  verifyClient,
  approveRejectLoan,
  postPayment
} = admin;
const { verifyToken, adminOnly } = Auth;
const { trimmer } = Helper;
const router = express.Router();

// Admin verify user route
router.patch(
  "/users/:email/verify",
  verifyToken,
  adminOnly,
  trimmer,
  verifyClient
);

// Admin view specific loan by id
router.get("/loans/:id", verifyToken, adminOnly, specificLoan);

// Admin get loan repayment status
router.get("/loans", verifyToken, adminOnly, loanRepayment);

// Admin get all loans route
router.get("/loans", verifyToken, adminOnly, getAllLoans);

// Admin approve or reject loan route
router.patch("/loans/:id", verifyToken, adminOnly, trimmer, approveRejectLoan);

// Admin post loan repayment
router.post("/loans/:id/repayment", verifyToken, adminOnly, postPayment);

export default router;
