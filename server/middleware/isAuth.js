import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import models from '../model/userData';

dotenv.config();

class Auth {
  /**
   *create a token
   * @param {*} email
   * @param {*} id
   * @param {*} isAdmin
   */
  static createToken(email, id, isAdmin) {
    const token = jwt.sign(
      {
        email,
        id,
        isAdmin,
      },
      process.env.SECRET_KEY,
      { expiresIn: '24h' },
    );

    return token;
  }

  /**
   *verify token provided by user
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static verifyToken(req, res, next) {
    const { token } = req.headers;

    // check if token was provided
    if (!token) {
      return res.status(403).json({
        status: 403,
        error: 'Unauthorized!, you have to login',
      });
    }

    try {
      // verify user provided token against existing token
      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      // check if user already exists
      const userExists = models.Users.find(user => user.email === req.body.email);
      // check for valid user
      if (!userExists) {
        return res.status(401).json({
          status: 401,
          error: 'The token you provided is invalid',
        });
      }

      // get user id, email and isAdmin
      req.user = decoded;

      // fire next middleware
      return next();
    } catch (error) {
      return res.status(400).json({
        status: 400,
        errors: [error],
      });
    }
  }
}

// expose auth
export default Auth;