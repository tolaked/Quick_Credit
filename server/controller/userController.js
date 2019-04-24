import models from "../model/userData";
import moment from "moment";
import validation from '../validation/validation';
import Auth from '../middleware/isAuth';
import bcrypt from 'bcryptjs';
import helper from '../helper/users';

const { genSaltSync, hashSync, compareSync } = bcrypt;

class userController {
  /**
   *
   * @param {req} object
   * @param {res} object
   */
  static createUser(req, res) {
    const { body } = req;
    const { error } = validation.validateUser(req.body);
    if (error)
      return res.status(422).json({ message: error.details[0].message });

        try{
            // check if user already exists
      const emailExists = models.Users.find(user => user.email === req.body.email);

      if (emailExists) {
        return res.status(409).json({
          status: 409,
          error: 'user already exists',
        });
      }


      const salt = bcrypt.genSaltSync(10);
      const hash = hashSync(body.password, salt);

      

      const usersLength = models.Users.length;
    const lastUserId = models.Users[usersLength - 1].id;
    
    const post = {
      id: lastUserId + 1,
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: bcrypt.hashSync(body.password, salt),
      status: 'unverified',
      address:req.body.address,
      isAdmin: 'false',
      createdOn: moment(new Date()),
      modifiedOn: moment(new Date())
    };
  
    models.Users.push(post);
    const token = Auth.generateToken(models.Users[0].id);
    
    return res.status(201).json({
      status: 200,
      data: [
        {
          
          token,
          post,
          
        },
      ],
    }
    );

  }
    catch (e) {
      return res.status(400).json({
        status: 400,
        error: 'Sorry, something went wrong, try again',
      });
    }
  }

    /**
   * login a user
   * @param {*} req
   * @param {*} res
   */
  static loginUser(req, res) {

    const { body } = req;
    // check if user pass valid and required data
    const { error } = validation.validateLogin(req.body);
    if (error) {
      return res.status(422).json({
        status: 422,
        message: error.details[0].message,
      });
    }

    //  find user by email

     const userExists = models.Users.find(user => user.email === req.body.email);

     // check if user exists in our data structure
     if (!userExists) {
       return res.status(404).json({
         status: 404,
         error: 'User does not exist',
       });
     }
     
     const hashedPassword = userExists.password;

     // check if user provided password matches existing password
    if (!bcrypt.compareSync(body.password, hashedPassword)) {
      return res.status(401).json({
        status: 401,
        error: 'Invalid email/password',
      });
    }
       // get generated token
       const token = Auth.generateToken(models.Users[0].id);

     return res.status(200).json({
       status: 200,
       data: [
         {
           token,
         },
       ],
     });
    }

  }




export default userController;