
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
}
export default Admin;