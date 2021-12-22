let users = require('../../constants/users');
const { hashPassword, generateJwt } = require('../../utils');

module.exports = async (req, res, next) => {

  const { email, password, firstName, lastName } = req.body;

  try {
    let id = '';
    
    if (!email || !firstName || !lastName || !password) {
      return next({ code: 400, msg: 'All Fields are required.'});
    }
  
    const hashedPassword = await hashPassword(password);
  
    if (!users.length) {
      id = Math.random();
      users.push({
        id,
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });

      const token = await generateJwt({ id, email });
      res.cookie('jwt', token, { httpOnly: true, maxAge: 15552000 });

      return res.json({
        status: 200,
        msg: 'Welcome',
        token,
      });
  
    } else {
      const existUser = users.find(user => user.email === email);
      if (existUser) {
        return next({ code: 400, msg: 'Email is already exist.'});
      }
      else {
        id = Math.random();
        users.push({
          id,
          firstName,
          lastName,
          email,
          password: hashedPassword,
        });
      }
  
          const token = await generateJwt({ id, email });
          res.cookie('jwt', token, { httpOnly: true, maxAge: 15552000 });
  
        return res.json({
          status: 200,
          msg: 'Welcome',
          token,
        });
    }
  } catch (err) {
    console.log('Error', err)
  }
}
