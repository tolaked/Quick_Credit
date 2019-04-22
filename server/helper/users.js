import bcrypt from 'bcrypt';
class Helper{
  
  static comparePassword(password, hash) {
    const result = bcrypt.compareSync(password, hash);
    return result;
}
  }

export default Helper;