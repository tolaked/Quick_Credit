import models from "../model/userData";
import moment from "moment";
import validation from "../validation/validation";

class Loans {
  /** *
   * @param{req} object
   * @param{res} object
   */
  static applyloan(req, res) {
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
      user: models.Users[0].email,
      createdOn: moment(new Date()),
      status: "pending",
      repaid: false,
      tenor,
      amount,
      paymentInstallment,
      balance: amount + interest,
      interest
    };
    const existLoan = models.Loans.filter(
      email => email.user === models.Users[0].email
    );

    for (let i = 0; i < existLoan.length; i += 1) {
      if (existLoan.repaid === false) {
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
    // const loans = models.Loans.find(oneloan => oneloan.id === req.params.id);
    const getloanId = req.params.id;
    const clientLoans = models.Loans;
    const loanToview = clientLoans.find(oneloan => oneloan.id == getloanId);

    if (!loanToview) {
      return res.status(409).json({
        status: 409,
        error: "No loan record found"
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
