let database = require("../database");
let responses = require('../common/responses');
let messages = require("../common/messages");

module.exports = {
    getAllRoles: function (req, resp) {
        let sql = `SELECT * FROM roles`;

        database.exec(sql, (error, response) => {
            if(error) {
                responses.internalServerErr(req, resp, messages.DATABASE_ERROR);
            }else {
                responses.statusOk(req,resp, response);
            }
        })
    }
};
