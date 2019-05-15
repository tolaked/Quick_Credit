import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import models from "../model/userData";

dotenv.config();

class Auth {
  /**
   *Generate token
   *
   * @param {number} id
   */
  static generateToken(email, isadmin, id) {
    const token = jwt.sign({ email, isadmin, id }, process.env.SECRET_KEY, {
      expiresIn: "48h"
    });

    return token;
  }

  /**
   * Verify token
   *
   * @param {object} req
   * @param {object} res
   * @param {function} next
   */
  static verifyToken(req, res, next) {
    const { token } = req.headers;

    // check if user provides a token
    if (!token) {
      return res.status(403).json({
        status: 403,
        error: "Unauthorize, please login"
      });
    }

    // check if token is valid
    try {
      // decode and get token
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

      // find user by email
      const user = models.Users.find(user => user.id === decodedToken.id);

      // check if user exist
      if (!user) {
        return res.status(401).json({
          status: 401,
          error: "Invalid token provided"
        });
      }

      // make current logged in user email available
      req.user = decodedToken;
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error
      });
    }
    next();
  }
  static adminOnly(req, res, next) {
    const { token } = req.headers;

    // check if token is valid
    try {
      // decode and get token
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

      // find user by email
      const user = models.Users.find(user => user.id === decodedToken.id);
      const authorizedAdmin = user.isAdmin;
      // check if user exist
      if (!authorizedAdmin) {
        return res.status(403).json({
          status: 403,
          error: "Unauthorized access,admin only route"
        });
      }

      // make current logged in user email available
      req.user = decodedToken;
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error
      });
    }
    next();
  }
  static alreadyVerified(req, res, next) {
    const clientEmail = req.params.email;
    const user = models.Users.find(oneUser => oneUser.email === clientEmail);
    if (user.status == "verified") {
      return res.status(404).json({
        status: 404,
        message: "user already verified"
      });
    }
    next();
  }
  static foundLoan(req, res, next) {
    const loanId = req.params.id;
    const clientLoans = models.Loans;
    const repaymentTrans = clientLoans.find(loan => loan.id == loanId);
    if (repaymentTrans) {
      if (repaymentTrans.repaid === true) {
        return res.status(409).json({
          status: 409,
          error: `Loan with the id ${loanId} has been fully repaid`
        });
      }
    }

    return next();
  }
}

// expose auth
export default Auth;
