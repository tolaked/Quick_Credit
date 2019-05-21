import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import models from "../model/userData";
import DB from "../Db/db";
dotenv.config();

export default class Auth {
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

  /**
   * Verify token
   *
   * @param {object} req
   * @param {object} res
   * @param {function} next
   */
  static async verifyTokendb(req, res, next) {
    const { token } = req.headers;

    // check if token was provided
    if (!token) {
      return res.status(401).json({
        status: 403,
        error: "Unauthorized!, you have to login"
      });
    }

    try {
      // verify user provided token against existing token
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const queryString = "SELECT * FROM users WHERE id = $1";
      const { rows } = await DB.query(queryString, [decoded.id]);
      // check for valid app users
      if (!rows[0]) {
        return res.status(401).json({
          status: 401,
          error: "The token you provided is invalid"
        });
      }

      // get user id, email and isAdmin
      req.user = decoded;
      // fire next middleware
      return next();
    } catch (error) {
      return res.status(400).json({
        status: 400,
        errors: [error]
      });
    }
  }

  /**
   * Verifies admin authorization
   *
   * @param {object} req
   * @param {object} res
   * @param {function} next
   */
  static async adminRoute(req, res, next) {
    const { token } = req.headers;
    try {
      // verify user provided token against existing token
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const queryString = "SELECT * FROM users WHERE id= $1";
      const { rows } = await DB.query(queryString, [decoded.id]);

      if (!rows[0].isadmin) {
        return res.status(403).json({
          status: 403,
          error: "!!!Unauthorized, admin only route"
        });
      }

      req.user = decoded;

      return next();
    } catch (error) {
      return res.status(400).json({
        status: 400,
        errors: [error]
      });
    }
  }

  /**
   * Verifies admin authorization
   *
   * @param {object} req
   * @param {object} res
   * @param {function} next
   */
  static adminOnly(req, res, next) {
    const { token } = req.headers;

    // check if token is valid
    try {
      // decode and get token
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

      const authorizedAdmin = req.user.isadmin;
      // check if user is an admin
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

  /**
   * Finds already verified user
   *
   * @param {object} req
   * @param {object} res
   * @param {function} next
   */
  static alreadyVerified(req, res, next) {
    const clientEmail = req.params.email;
    const user = models.Users.find(oneUser => oneUser.email === clientEmail);
    if (user.status == "verified") {
      return res.status(409).json({
        status: 409,
        message: "user already verified"
      });
    }
    next();
  }

  /**
   * Finds repaid Loans
   *
   * @param {object} req
   * @param {object} res
   * @param {function} next
   */
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
