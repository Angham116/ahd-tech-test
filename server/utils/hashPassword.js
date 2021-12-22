const { hash } = require('bcrypt');

module.exports = (password) => hash(password, 10);
