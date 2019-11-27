const jwt = require('jsonwebtoken');
const constants = require('./constants');

module.exports = {
    generate: function (data) {
        return jwt.sign({email: data.email, user_id: data.user_id}, constants.SECRET_KEY);
    }
};
