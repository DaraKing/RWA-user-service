let responses = require('../common/responses');
let hash = require('../common/hash');
let validators = require('../common/validators');
let messages = require("../common/messages");
let database = require("../database");

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

        database.pool.getConnection((err, conn) => {
           if(err) {
               console.log(err);
               responses.internalServerErr(req, resp, messages.DATABASE_ERROR);
               return
           }

           let query = `INSERT INTO users(first_name,last_name,password,email,age,country, city) VALUES ("${req.body.first_name}", "${req.body.last_name}", "${passwordHash}", "${req.body.email}", ${req.body.age}, "${req.body.country}", "${req.body.city}")`;

           conn.query(query, (err) => {
                conn.release();
                if(err) {
                    console.log(err);
                }
           });

            responses.statusOk(req, resp, '{"message": "User has been successfully registered!"}');
        });
    }
};
