import validation from "../../validation/validation";

import DB from "../../Db/db";

class AdminController {
  static async verifyUser(req, res) {
    const { status } = req.body;
    const { email } = req.params;
    const values = [status, email];

    const { error } = validation.verifyUser(req.body);
    if (error)
      return res.status(422).json({
        status: 422,
        message: error.details[0].message
      });
    try {
      const clientQuery = "SELECT * FROM users WHERE email = $1";
      const row = await DB.query(clientQuery, [email]);

      if (!row.rows[0]) {
        return res.status(404).json({
          status: 404,
          error: "user not found"
        });
      }
      if (row.rows[0].status === "verified") {
        return res.status(409).json({
          status: 409,
          error: "user already verified"
        });
      }

      const queryString =
        "UPDATE users SET status = $1 WHERE email = $2 returning *";
      const { rows } = await DB.query(queryString, values);
      const verifiedUser = {
        id: rows[0].id,
        firstName: rows[0].firstname,
        lastName: rows[0].lastname,
        email: rows[0].email,
        address: rows[0].address,
        status: rows[0].status,
        isAdmin: rows[0].isadmin,
        modifiedOn: new Date()
      };

      return res.status(200).json({
        status: 200,
        data: verifiedUser
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error
      });
    }
  }

  static async specificLoan(req, res) {
    const { id } = req.params;

    try {
      const clientLoan = "SELECT * FROM loans WHERE id = $1";
      const { rows } = await DB.query(clientLoan, [id]);

      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          message: "Loan does not exist"
        });
      }
      return res.status(200).json({
        status: 200,
        data: rows[0]
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error
      });
    }
  }

  static async patchLoan(req, res) {
    const { status } = req.body;
    const { id } = req.params;
    const value = [status, id];

    const { error } = validation.patchLoan(req.body);
    if (error)
      return res.status(422).json({
        status: 422,
        message: error.details[0].message
      });
    try {
      const clientQuery = "SELECT * FROM loans WHERE id = $1";
      const loan = await DB.query(clientQuery, [id]);

      if (!loan.rows[0]) {
        return res.status(404).json({
          status: 404,
          error: "loan not found"
        });
      }
      if (loan.rows[0].status === "approved") {
        return res.status(409).json({
          status: 409,
          error: `loan with the id ${id} already verified`
        });
      }

      const loanQueryString =
        "UPDATE loans SET status = $1 WHERE id = $2 returning *";
      const { rows } = await DB.query(loanQueryString, value);

      return res.status(200).json({
        status: 200,
        data: rows[0]
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error
      });
    }
  }

  static async loanRepayment(req, res, next) {
    const { status, repaid } = req.query;

    try {
      const clientQuery = "SELECT * FROM loans WHERE (status,repaid) =($1,$2)";
      const { rows } = await DB.query(clientQuery, [status, repaid]);

      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          message: "Not found"
        });
      }

      return res.status(200).json({
        status: 200,
        data: rows
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error
      });
    }
  }
  static async allLoans(req, res) {
    try {
      const allLoansQuery = "SELECT * FROM loans ";
      const { rows } = await DB.query(allLoansQuery);
      const totalLoans = rows.length;
      if (!rows) {
        return res.status(200).json({
          status: 404,
          message: "no loan found"
        });
      }

      return res.status(200).json({
        status: 200,
        message: `${totalLoans} loans record found`,
        data: rows
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error
      });
    }
  }

  static async postRepayment(req, res) {
    const { id } = req.params;
    const { paidamount } = req.body;
    const newId = parseInt(id);
    const paidAmount = parseInt(paidamount);

    const { error } = validation.postLoan(req.body);
    if (error)
      return res.status(422).json({
        status: 422,
        message: error.details[0].message
      });
    try {
      const clientQuery = "SELECT * FROM loans WHERE id = $1";
      const clientId = await DB.query(clientQuery, [id]);
      const user = clientId.rows[0];

      if (!user) {
        {
          return res.status(404).json({
            status: 404,
            message: "loan not found"
          });
        }
      }
      if (user.status === "pending") {
        return res.status(409).json({
          status: 409,
          message: "warning!! Loan has not been approved"
        });
      }
      if (user.balance === 0) {
        return res.status(409).json({
          status: 409,
          message: "warning!! Loan has already been fully repaid"
        });
      }
      const loanAmount = user.amount;
      const availableBalance = user.balance;
      const monthlyinstallment = user.paymentinstallment;
      const balance = user.balance - paidamount;
      const loanclient = user.clientemail;

      const value = [balance, id];
      const values = [
        newId,
        loanclient,
        monthlyinstallment,
        new Date(),
        loanAmount,
        paidAmount,
        balance
      ];

      if (paidAmount > availableBalance) {
        return res.status(404).json({
          status: 409,
          message: "Paid amount can not be greater than balance"
        });
      }

      const repaymentQueryString =
        "INSERT INTO loanrepayments(loanid,client,monthlyinstallment,createdon,amount,paidAmount,balance) VALUES($1, $2, $3, $4, $5, $6, $7) returning *";
      const { rows } = await DB.query(repaymentQueryString, values);

      const loanQueryString =
        "UPDATE loans SET balance = $1 WHERE id = $2 returning *";
      await DB.query(loanQueryString, value);

      const updateRepaid = [true, req.params.id];
      if (rows[0].balance === 0) {
        const updateQueryString =
          "UPDATE loans SET repaid = $1 WHERE id = $2 returning *";
        await DB.query(updateQueryString, updateRepaid);
      }

      return res.status(201).json({
        status: 201,
        data: rows[0]
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error
      });
    }
  }
}

export default AdminController;
