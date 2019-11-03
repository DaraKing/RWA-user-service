let responses = require('../common/responses');

module.exports = {
    test: function (req,resp) {
        responses.statusOk(req, resp, 'Koje?!?');
    }
};
