import Joi from "joi";

class validate {
  /**
   *
   * @param {user} object
   */
  static validateUser(user) {
    const schema = Joi.object().keys({
      email: Joi.string()
        .email()
        .trim()
        .required(),
      firstName: Joi.string()
        .regex(/^[a-zA-Z]+$/)
        .error(() => "Firstname is required and must contain only alphabets")
        .required(),
      lastName: Joi.string()
        .regex(/^[a-zA-Z]+$/)
        .error(() => "Lastname is required and must contain only alphabets")
        .trim()
        .required(),
      password: Joi.string()
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .min(7)
        .alphanum()
        .required(),
      address: Joi.string().required(),
      status: Joi.string()
        .insensitive()
        .default("unverified"),
      isAdmin: Joi.string().default("false")
    });
    return Joi.validate(user, schema);
  }

  /**
   * @param{details} string
   */
  static validateLogin(details) {
    const schema = Joi.object().keys({
      email: Joi.string()
        .email()
        .trim()
        .required(),
      password: Joi.string()
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .trim()
        .required()
    });
    return Joi.validate(details, schema);
  }

  /**
   *
   * @param {user} object
   */
  static validateLoan(loan) {
    const schema = Joi.object().keys({
      tenor: Joi.number()
        .integer()
        .error(
          () => "tenor is required and must contain only numbers between 1 & 12"
        )
        .min(1)
        .max(12)
        .required(),
      amount: Joi.number()
        .error(() => "Amount is required and must contain only number")
        .required()
    });
    return Joi.validate(loan, schema);
  }

  /**
   *
   * @param {user} object
   */
  static verifyUser(user) {
    const schema = Joi.object().keys({
      status: Joi.string()
        .insensitive()
        .valid("unverified", "verified")
        .required()
    });
    return Joi.validate(user, schema);
  }
  static loanApproval(user) {
    const schema = Joi.object().keys({
      status: Joi.string()
        .insensitive()
        .valid("approved", "rejected")
        .required()
    });
    return Joi.validate(user, schema);
  }
  static postLoan(loan) {
    const schema = Joi.object().keys({
      paidamount: Joi.number()
        .error(
          () =>
            "paidamount is required and must contain only be a number or decimal"
        )
        .required()
    });
    return Joi.validate(loan, schema);
  }
}

export default validate;
