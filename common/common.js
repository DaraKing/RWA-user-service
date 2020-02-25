let token = require('./token');

module.exports = {
    getUserId: function (req) {
        let jwtToken = req.headers['authorization'].split(" ")[1];

        let data = token.verify(jwtToken);

        return data.user_id;
    }
};
