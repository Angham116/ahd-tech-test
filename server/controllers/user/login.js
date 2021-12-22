const { compare } = require('bcrypt');

let users = require('../../constants/users');
const { generateJwt } = require('../../utils');

module.exports = async (req, res, next) => {
  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return next({ code: 400, msg: 'All fields are required' });
    }

    const isExistUser = users.find(user => user.email.toLowerCase() === email.toLowerCase());

    if (!isExistUser) {
      return next({ code: 404, msg: 'User doesnt exist'});
    }

    const passIsMatch = await compare(password, isExistUser.password);

    if (!passIsMatch) {
      return next({
        code: 400,
        msg: 'Incorrect Password',
      });
    }

    const { id } = isExistUser;

    const token = await generateJwt({ id, email });
      res.cookie('jwt', token, { httpOnly: true, maxAge: 15552000 });

      return res.json({
        status: 200,
        msg: 'Welcome',
        token,
      });

  } catch (err) {
    next({ code: 500, msg: err });
  }
}