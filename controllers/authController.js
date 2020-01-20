let responses = require('../common/responses');
let hash = require('../common/hash');
let validators = require('../common/validators');
let messages = require("../common/messages");
let database = require("../database");
let token = require("../common/token");

module.exports = {
    register: function (req,resp) {
        if(!validators.email(req.body.email)) {
            responses.badRequest(req, resp, messages.INVALID_EMAIL);
            return;
        }

        if(!validators.passwordRepeat(req.body.password, req.body.password_repeat)) {
            responses.badRequest(req, resp, messages.PASSWORD_MISMATCH);
            return;
        }

        let passwordHash = hash.hashPassword(req.body.password);

        let sql = `INSERT INTO users(first_name,last_name,password,email,age,country, city) VALUES ("${req.body.first_name}", "${req.body.last_name}", "${passwordHash}", "${req.body.email}", ${req.body.age}, "${req.body.country}", "${req.body.city}")`

        database.exec(sql, (error, response) => {
            if(error) {
                responses.internalServerErr(req, resp, messages.DATABASE_ERROR);
            }else {
                responses.statusOk(req, resp, '{"message": "User has been successfully registered!"}');
            }
        });
    },
    login: function (req, resp) {
        if(!validators.email(req.body.email)) {
            responses.badRequest(req, resp, messages.INVALID_EMAIL);
            return;
        }

        if(!req.body.password) {
            responses.badRequest(req, resp, messages.PASSWORD_EMPTY);
            return;
        }

        let sql = `SELECT * FROM users INNER JOIN roles ON users.role_id=roles.role_id WHERE email = '${req.body.email}'`;

        database.exec(sql, (error, response) => {

            if(error) {
                responses.internalServerErr(req, resp, messages.DATABASE_ERROR);
            }else {

                if(!hash.comparePasswords(req.body.password, response[0].password)) {
                    responses.badRequest(req, resp, messages.PASSWORD_MISMATCH);
                    return;
                }

                let userToken = token.generate(response[0]);

                let insertSql = `INSERT INTO user_tokens(user_id, user_token) VALUES ("${response[0].user_id}", "${userToken}")`;

                database.exec(insertSql, (error, _ ) => {
                    if(error) {
                        responses.internalServerErr(req, resp, messages.DATABASE_ERROR);
                        return
                    }else {
                        response[0]["user_token"] = userToken;
                        responses.statusOk(req, resp, response[0]);
                    }
                });

            }
        });
    }
};
