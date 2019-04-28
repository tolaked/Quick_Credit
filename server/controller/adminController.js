import models from "../model/userData";
import moment from "moment";
import validation from "../validation/validation";
import Auth from "../middleware/isAuth";

class Admin {
  static verifyClient(req, res) {
    const { error } = validation.verifyUser(req.body);
    if (error) {
      return res.status(422).json({
        status: 422,
        message: error.details[0].message
      });
    }
    const clientEmail = req.params.email;
    const user = models.Users.find(oneUser => oneUser.email === clientEmail);
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "user does not exist"
      });
    }
    if (user.status == "verified") {
      return res.status(404).json({
        status: 404,
        message: "user already verified"
      });
    }
    user.status = req.body.status;
    user.modifiedOn = moment(new Date());
    return res.status(201).json({
      status: 201,
      data: user
    });
  }

  static specificLoan(req, res) {
    const currentLoan = req.params.id;
    const getLoan = models.Loans.find(oneLoan => oneLoan.id == currentLoan);
    if (!getLoan) {
      return res.status(404).json({
        status: 404,
        message: "Loan does not exist"
      });
    }

    return res.status(201).json({
      status: 201,
      data: getLoan
    });
  }
  static getAllLoans(req, res) {
    const loans = models.Loans;
    const loanCount = loans.length;
    if (!loans) {
      return res.status(500).json({
        status: 404,
        message: "No loan found"
      });
    }
    return res.status(200).json({
      status: 200,
      data: loans,
      loanCount
    });
  }

  static loanRepayment(req, res, next) {
    const { status, repaid } = req.query;

    const loans = models.Loans;
    if (status && repaid) {
      const boolRepaid = JSON.parse(repaid);
      const paymentStatus = loans.filter(
        loan =>
          loan.status === status.toLowerCase() && loan.repaid === boolRepaid
      );
      if (paymentStatus.length === 0) {
        return res.status(404).json({
          status: 404,
          message: "Not Found"
        });
      }
      return res.status(200).json({
        status: 200,
        data: paymentStatus
      });
    }
    next();
  }
  static approveRejectLoan(req, res) {
    const { body } = req;
    const loanId = req.params.id;
    const clientLoans = models.Loans;
    const loanToapprove = clientLoans.find(loan => loan.id == loanId);

    if (!loanToapprove) {
      return res.status(404).json({
        status: 404,
        error: "Loan not found"
      });
    }
    const { error } = validation.loanApproval(req.body);
    if (error) {
      return res.status(422).json({
        status: 422,
        error: error.details[0].message
      });
    }

    if (loanToapprove.status === "approved") {
      return res.status(409).json({
        status: 409,
        message: `This loan has been approved previously`
      });
    }
    if (loanToapprove) {
      loanToapprove.status = req.body.status;
      loanToapprove.modifiedOn = moment(new Date());
      return res.status(200).json({
        status: 200,
        data: loanToapprove
      });
    }
  }

  static postPayment(req, res) {
    const { body } = req;
    const loanId = req.params.id;
    const clientLoans = models.Loans;
    const repaymentTrans = clientLoans.find(loan => loan.id == loanId);
    if (!repaymentTrans) {
      return res.status(404).json({
        status: 404,
        error: "No loan found"
      });
    }
    if (repaymentTrans.repaid === true) {
      return res.status(409).json({
        status: 409,
        error: `Loan with the id ${loanId} has been fully repaid`
      });
    }
    const { error } = validation.postLoan(req.body);
    if (error) {
      return res.status(422).json({
        status: 422,
        error: error.details[0].message
      });
    }
    const paidAmount = parseFloat(req.body.paidAmount);
    const repaymentLength = models.Repayment.length;
    const lastRepaymentId = models.Repayment[repaymentLength - 1].id;
    const balance = repaymentTrans.balance - parseFloat(paidAmount);

    const postLoanRepaid = {
      user: repaymentTrans.user,
      id: lastRepaymentId + 1,
      loanId: req.params.id,
      createdOn: moment(new Date()),
      amount: repaymentTrans.amount,
      monthlyInstallment: repaymentTrans.paymentInstallment,
      paidAmount,
      balance,
      interest: repaymentTrans.interest
    };
    repaymentTrans.balance = balance;
    if (balance === 0) {
      repaymentTrans.repaid = true;
    }
    if (paidAmount > repaymentTrans.balance) {
      return res.status(200).json({
        status: 409,
        error: "amount greater than remaining balance"
      });
    }
    models.Repayment.push(postLoanRepaid);
    return res.status(200).json({
      status: 200,
      data: postLoanRepaid
    });
  }
}
export default Admin;
