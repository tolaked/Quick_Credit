
import models from '../model/userData';
import moment from 'moment';
import validation from '../validation/validation';

class Admin {


    static verifyClient(req,res) { 
        const { error } = validation.verifyUser(req.body);
    if (error) {
      return res.status(422).json({
        status: 422,
        message: error.details[0].message,
      });
    }
    const clientEmail = req.params.email;
    const user = models.Users.find(oneUser => oneUser.email === clientEmail);
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: 'user does not exist',
      });
    }
    if(user.status == 'verified'){
        return res.status(404).json({
            status: 404,
            message: 'user already verified',
          });
    }
    user.status = req.body.status;
    user.modifiedOn = (moment(new Date()));
    return res.status(201).json({
      status: 201,
      data: user,
    });
    }

    static specificLoan(req,res){
      
      const currentLoan = req.params.id;
      const getLoan = models.Loans.find(oneLoan => oneLoan.id == currentLoan);
      if (!getLoan) {
        return res.status(404).json({
          status: 404,
          message: 'Loan does not exist',
        });
      }
      
      return res.status(201).json({
        status: 201,
        data: getLoan,
      });
    }

    static getAllLoans(req, res) {
      const loans = models.Loans;
      const loanCount = loans.length;
      if (!loans) {
        return res.status(500).json({
          status: 500,
          message: 'internal server error',
        });
      }
      return res.status(200).json({
        status: 200,
        data: loans,
        loanCount,
      });
    }

    static loanPayment(req, res, next) {
      const { status, repaid } = req.query;
      let paymentFilter;
      const loans = models.Loans;
      if (status && repaid) {
        const boolRepaid = JSON.parse(repaid);
        paymentFilter = loans.filter(loan => loan.status === status.toLowerCase()
          && loan.repaid === boolRepaid);
        if (paymentFilter.length === 0) {
          return res.status(404).json({
            status: 404,
            message: 'Not Found',
          });
        }
        if(status=='approved' && repaid==true){
        return res.status(200).json({
          status: 200,
          data: paymentFilter,
        });
      }}
      next();
    }
}
export default Admin;