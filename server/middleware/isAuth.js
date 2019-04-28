import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import models from "../model/userData";

dotenv.config();

class Auth {
  /*
   **
   * trim input whitespaces
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static trimmer(req, res, next) {
    const { body } = req;
    if (body) {
      const trimmed = {};

      Object.keys(body).forEach(key => {
        const value = body[key];
        Object.assign(trimmed, { [key]: value.trim() });
      });
      req.body = trimmed;
    }
    next();
  }
  /**
   *Generate token
   *
   * @param {number} id
   */
  static generateToken(email) {
    const token = jwt.sign(
      {
        email
      },
      process.env.SECRET_KEY,
      { expiresIn: "24h" }
    );

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
      const user = models.Users.find(user => user.email === req.body.email);
      const client = (user, decodedToken);

      // check if user exist
      if (!client) {
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
}

// expose auth
export default Auth;
