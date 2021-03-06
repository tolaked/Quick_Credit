import DB from "../../Db/db";
import validation from "../../validation/validation";

export default class LoansDb {
  /** *
   * @param{req} object
   * @param{res} object
   */

  static async applyForLoan(req, res) {
    const { email } = req.user;
    const { error } = validation.validateLoan(req.body);
    if (error)
      return res.status(422).json({
        status: 422,
        message: error.details[0].message
      });

    const amount = parseFloat(req.body.amount);
    const tenor = parseFloat(req.body.tenor);
    const interest = 0.05 * amount;
    const paymentinstallment = (amount + interest) / tenor;
    // get all post request body data

    const values = [
      email,
      new Date(),
      tenor,
      amount,
      paymentinstallment,
      amount + interest,
      interest
    ];
    try {
      const userQuery = "SELECT * FROM loans WHERE clientemail = $1";
      const user = await DB.query(userQuery, [email]);

      if (user.rows.length > 0) {
        const newuser = user.rows[user.rows.length - 1];

        if (newuser.status === "pending") {
          return res.status(403).json({
            status: 403,
            error: "sorry, you can only apply for a loan at a time"
          });
        }

        if (newuser.status === "approved" && newuser.repaid === false) {
          return res.status(403).json({
            status: 403,
            error:
              "sorry, you cannot apply for a loan at the moment, you have an outstanding loan"
          });
        }
      }

      // query string
      const queryString =
        "INSERT INTO loans(clientemail, createdon, tenor, amount, paymentinstallment,balance,interest) VALUES($1, $2, $3, $4, $5,$6,$7) returning *";

      const { rows } = await DB.query(queryString, values);

      // check if the user exists in our users db

      return res.status(201).json({
        status: 201,
        data: {
          Loan: rows[0]
        }
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: "Something went wrong, try again"
      });
    }
  }

  /** *
   * @param{req} object
   * @param{res} object
   */
  static async viewRepayments(req, res) {
    const { id } = req.params;
    const getUser = req.user.email;
    const admin = req.user.isadmin;

    try {
      const repaymentQuery = "SELECT * FROM loanrepayments WHERE loanid =$1";
      const { rows } = await DB.query(repaymentQuery, [id]);

      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          message: "no repayment record found"
        });
      }

      if (rows[0].client !== getUser && admin === false) {
        return res.status(403).json({
          status: 403,
          message: `Sorry, you can't view this loan`
        });
      }

      return res.status(200).json({
        status: 200,
        data: rows
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: "Something went wrong, try again"
      });
    }
  }

  /** *
   * @param{req} object
   * @param{res} object
   */
  static async userViewLoans(req, res) {
    const loanOwner = req.user.email;

    try {
      const userLoans = "SELECT * FROM loans WHERE clientemail = $1";

      const { rows } = await DB.query(userLoans, [loanOwner]);

      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          error: "no loans found"
        });
      }
      return res.status(200).json({
        status: 200,
        data: rows
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: "Something went wrong, try again"
      });
    }
  }
}
