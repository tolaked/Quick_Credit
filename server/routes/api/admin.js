import express from "express";
import admin from "../../controller/v1/AdminController";
import Auth from "../../middleware/isAuth";
import Helper from "../../helper/users";

const {
  getAllLoans,
  viewSpecificLoan,
  verifyClient,
  approveOrRejectLoan,
  postLoanPayment,
  viewLoanRepayment
} = admin;
const { verifyToken, adminOnly, alreadyVerified, foundLoan } = Auth;
const { trimmer } = Helper;
const router = express.Router();

// Admin verify user route
router.patch(
  "/users/:email/verify",
  verifyToken,
  adminOnly,
  alreadyVerified,
  trimmer,
  verifyClient
);

// Admin view specific loan by id
router.get("/loans/:id", verifyToken, adminOnly, viewSpecificLoan);

// Admin get loan repayment status
router.get("/loans", verifyToken, adminOnly, viewLoanRepayment);

// Admin get all loans route
router.get("/loans", verifyToken, adminOnly, getAllLoans);

// Admin approve or reject loan route
router.patch(
  "/loans/:id",
  verifyToken,
  adminOnly,
  trimmer,
  approveOrRejectLoan
);

// Admin post loan repayment
router.post(
  "/loans/:id/repayment",
  verifyToken,
  adminOnly,
  foundLoan,
  postLoanPayment
);

export default router;
