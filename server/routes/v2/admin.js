import express from "express";
import Admin from "../../controller/v2/AdminController";
import Auth from "../../middleware/isAuth";
import Helper from "../../helper/users";

const {
  verifyUser,
  viewSpecificLoan,
  viewRepaidLoans,
  approveOrRejectLoan,
  getAllLoans,
  postLoanRepayment
} = Admin;
const { verifyTokendb, adminRoute } = Auth;
const { trimmer } = Helper;
const router = express.Router();

// Admin verify user route
router.patch(
  "/users/:email/verify",
  verifyTokendb,
  adminRoute,
  trimmer,
  verifyUser
);

// Admin get specific loan route
router.get("/loans/:id", verifyTokendb, adminRoute, viewSpecificLoan);

// Approve or reject loan application
router.patch(
  "/loans/:id",
  verifyTokendb,
  adminRoute,
  trimmer,
  approveOrRejectLoan
);

// Get all repaid and unrepaid loans
router.get("/loans", verifyTokendb, adminRoute, viewRepaidLoans);

// Get all loans
router.get("/loans", verifyTokendb, adminRoute, getAllLoans);

// Post loan repayment route
router.post(
  "/loans/:id/repayment",
  verifyTokendb,
  adminRoute,
  trimmer,
  postLoanRepayment
);

// expose router
export default router;
