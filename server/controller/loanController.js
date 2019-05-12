import models from "../model/userData";
import moment from "moment";
import validation from "../validation/validation";

class Loans {
  /** *
   * @param{req} object
   * @param{res} object
   */
  static applyloan(req, res) {
    const verifiedClient = models.Users.find(user => user.id === req.user.id);
    if (
      verifiedClient.status === "pending" ||
      verifiedClient.status === "unverified"
    ) {
      return res.status(400).json({
        status: 400,
        error: "Sorry, you cannot apply for a loan until status is verified"
      });
    }

    const { error } = validation.validateLoan(req.body);
    if (error) {
      return res.status(422).json({
        status: 422,
        message: error.details[0].message
      });
    }

    const amount = parseFloat(req.body.amount);
    const tenor = parseFloat(req.body.tenor);
    const interest = 0.05 * amount;
    const paymentInstallment = (amount + interest) / tenor;

    const loanLength = models.Loans.length;
    const lastLoanId = models.Loans[loanLength - 1].id;

    const applyLoan = {
      id: lastLoanId + 1,
      user: req.user.email,
      createdOn: moment(new Date()),
      status: "pending",
      repaid: false,
      tenor,
      amount,
      paymentInstallment,
      balance: amount + interest,
      interest
    };

    const loanExists = models.Loans.filter(
      email => email.user === req.user.email
    );

    for (let i = 0; i < loanExists.length; i += 1) {
      if (loanExists[i].repaid === false) {
        return res.status(402).json({
          status: 402,
          message: "you have an outstanding loan"
        });
      }
    }
    models.Loans.push(applyLoan);
    return res.status(201).json({
      status: 201,
      data: applyLoan
    });
  }
  static paidLoans(req, res) {
    const getUser = req.user.email;

    const getloanId = req.params.id;
    const clientLoans = models.Loans;
    const loanToview = clientLoans.find(oneloan => oneloan.id == getloanId);

    if (!loanToview) {
      return res.status(409).json({
        status: 409,
        error: "No loan record found"
      });
    }
    if (loanToview.user !== getUser) {
      return res.status(403).json({
        status: 403,
        error: "Sorry, you can't view this loan"
      });
    }
    if (loanToview.status === "approved" && loanToview.repaid === true) {
      return res.status(201).json({
        status: 201,
        data: loanToview
      });
    }
    res.status(409).json({
      status: 409,
      error: "No repaid loans"
    });
  }
}
export default Loans;
