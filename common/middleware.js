let responses = require('./responses');
let token = require('./token');

module.exports = {
    admin: function (req, resp, next) {

        if (!req.headers['authorization']) {
            responses.unauthorized(req, resp);
            return
        };

        let jwtToken = req.headers['authorization'].split(" ")[1];

        let data = token.verify(jwtToken);

        if(!data) {
            responses.unauthorized(req, resp);
            return
        }

        if(data.role_id === 1) {
            responses.unauthorized(req, resp);
            return
        }

        next();
    }
};
