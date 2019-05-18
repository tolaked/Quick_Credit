import express from "express";
import Admin from "../../controller/v2/adminContoller";
import Auth from "../../middleware/isAuth";
import Helper from "../../helper/users";

const {
  verifyUser,
  specificLoan,
  patchLoan,
  loanRepayment,
  allLoans,
  postRepayment
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
router.get("/loans/:id", verifyTokendb, adminRoute, specificLoan);

// Approve or reject loan application
router.patch("/loans/:id", verifyTokendb, adminRoute, trimmer, patchLoan);

// Get all loans
router.get("/loans", verifyTokendb, adminRoute, allLoans);

// Get all repaid and unrepaid loans
router.get("/loans", verifyTokendb, adminRoute, loanRepayment);

// Post loan repayment route
router.post(
  "/loans/:id/repayment",
  verifyTokendb,
  adminRoute,
  trimmer,
  postRepayment
);

// expose router
export default router;
