import models from "../model/userData";
import moment from "moment";
import validation from '../validation/validation';
import Helper from '../helper/users';
class userController {
  /**
   *
   * @param {req} object
   * @param {res} object
   */
  static createUser(req, res) {
    const { error } = validation.validateUser(req.body);
    if (error)
      return res.status(422).json({ message: error.details[0].message });

      const usersLength = models.Users.length;
    const lastUserId = models.Users[usersLength - 1].id;
    
    const post = {
      id: lastUserId + 1,
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
      status: 'unverified',
      address:req.body.address,
      isAdmin: req.body.isAdmin,
      createdOn: moment(new Date()),
      modifiedOn: moment(new Date())
    };
  
    models.Users.push(post);

    return res.status(201).json({
      status: "201",
      data: post
    });
  }
}

export default userController;