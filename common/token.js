const jwt = require('jsonwebtoken');
const constants = require('./constants');

module.exports = {
    generate: function (data) {
        return jwt.sign({email: data.email, user_id: data.user_id, role_id: data.role_id}, constants.SECRET_KEY);
    },
    verify: function (token) {

        try {
            let response = jwt.verify(token, constants.SECRET_KEY);
            return response;
        } catch (e) {
            return null;
        }
    }
};
