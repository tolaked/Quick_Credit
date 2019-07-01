import DB from "../../Db/db";
import Auth from "../../middleware/isAuth";
import bcrypt from "bcryptjs";
import validation from "../../validation/validation";

const { genSaltSync, hashSync, compareSync } = bcrypt;

export default class UsersController {
  /**
   * Create a new user
   *
   * @param {object} req
   * @param {object} res
   */
  static async createUserDb(req, res) {
    const { body } = req;
    const { error } = validation.validateUserDb(body);
    if (error)
      return res.status(422).json({
        status: 422,
        message: error.details[0].message
      });

    // generate hash from password
    const salt = genSaltSync(10);
    const hash = hashSync(body.password, salt);

    // collect user body data
    const values = [
      body.firstname,
      body.lastname,
      body.email,
      hash,
      body.address
    ];

    try {
      // query string
      const queryString =
        "INSERT INTO Users(firstname, lastname, email, password, address) VALUES($1, $2, $3, $4, $5) returning *";

      const { rows } = await DB.query(queryString, values);

      // query database

      // create token
      const token = Auth.generateToken(
        rows[0].email,
        rows[0].isadmin,
        rows[0].id
      );

      const newUser = {
        email: rows[0].email,
        firstName: rows[0].firstname,
        lastName: rows[0].lastname,
        status: rows[0].status,
        Address: rows[0].address,
        isAdmin: rows[0].isadmin
      };
      return res.status(201).json({
        status: 201,
        data: { newUser, token }
      });
    } catch (error) {
      // check if user exist
      if (error.routine === "_bt_check_unique") {
        return res.status(409).json({
          status: 409,
          error: "User already exist"
        });
      }

      return res.status(400).json({
        status: 400,
        errors: "Something went wrong, try again"
      });
    }
  }
  /**
   * log a user in
   *
   * @param {object} req
   * @param {object} res
   */
  static async loginDb(req, res) {
    // get user input data
    const { email, password } = req.body;
    const { error } = validation.validateLogin(req.body);
    if (error)
      return res.status(422).json({
        status: 422,
        message: error.details[0].message
      });

    const queryString = "SELECT * FROM Users WHERE email = $1";

    try {
      // Select all user record where email is equal db email
      const { rows } = await DB.query(queryString, [email]);

      // check if user exist in database
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          error: "User does not exist"
        });
      }

      // check if user provided password matches user's hashed password in database
      if (!compareSync(password, rows[0].password)) {
        return res.status(401).json({
          status: 401,
          error: "Invalid Email/Password"
        });
      }

      // generate token
      const token = Auth.generateToken(
        rows[0].email,
        rows[0].isadmin,
        rows[0].id
      );

      // return success message
      return res.status(200).json({
        status: 200,
        data: [
          {
            message: "Logged in successfully",
            user: {
              lastname: rows[0].lastname,
              isAdmin: rows[0].isadmin,
              email: rows[0].email
            },
            token
          }
        ]
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        errors: "Something went wrong, try again"
      });
    }
  }
}
