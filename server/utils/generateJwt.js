const { sign } = require('jsonwebtoken');

const { SECRET } = require('../config');

module.exports = ({ id }) => {
  console.log(65565)
	const token = sign(
		{ id },
		SECRET,
  { expiresIn: '182d' }
	);

	return token;
}
