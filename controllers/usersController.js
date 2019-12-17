let database = require("../database");
let responses = require('../common/responses');
let messages = require("../common/messages");

module.exports = {
    getAllUsers: function (req, resp) {
        let sql = `SELECT * FROM users`;

        database.exec(sql, (error, response) => {
            if(error) {
                responses.internalServerErr(req, resp, messages.DATABASE_ERROR);
            }else {
                responses.statusOk(req,resp, response);
            }
        });
    },
    getUserById: function (req, resp) {
        let sql = `SELECT * FROM users WHERE user_id = '${req.params["userId"]}'`;

        database.exec(sql, (error, response) => {
            if(error) {
                responses.internalServerErr(req, resp, messages.DATABASE_ERROR);
            }else {
                responses.statusOk(req,resp, response[0]);
            }
        })
    },
    updateUser: function (req, resp) {
        let sql = `UPDATE users SET first_name='${req.body.first_name}',last_name='${req.body.last_name}',email='${req.body.email}',age=${req.body.age},country='${req.body.country}',city='${req.body.city}' WHERE user_id=${req.params["userId"]}`

        database.exec(sql, (error, response) => {
            if(error) {
                responses.internalServerErr(req, resp, messages.DATABASE_ERROR);
            }else {
                responses.statusOk(req, resp, '{"message": "User data has been successfully changed!"}');
            }
        })
    }
};
