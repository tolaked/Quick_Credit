    
import Joi from 'joi';

class validate {
    /**
   * 
   * @param {user} object
   */
    static validateUser(user) {
        const schema = Joi.object().keys({
            email: Joi.string().email().trim().required(),
            firstName: Joi.string().regex(/^[A-Z]+$/).trim().uppercase(),
            lastName: Joi.string().trim(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).trim().min(7).alphanum().required(),
            address: Joi.string().required(),
            status: Joi.string().insensitive().default('unverified'),
            isAdmin: Joi.string().default('false'),
            
        });
        return Joi.validate(user, schema);
    }
}

export default validate;