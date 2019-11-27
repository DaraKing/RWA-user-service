const bcrypt = require('bcrypt');
const constants = require('./constants');

module.exports = {
    hashPassword: function (data) {
        return bcrypt.hashSync(data, constants.BCRYPT_SALT);
    },
    comparePasswords: function (password, hash) {
        return bcrypt.compareSync(password,hash);
    }
};
