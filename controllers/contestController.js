let database = require("../database");
let responses = require('../common/responses');
let messages = require("../common/messages");

module.exports = {
    // ID param from URL you will get using req.params["contestId"]
    getAllContests: function (req, resp) {
        let sql = `SELECT * FROM contest `;

        database.exec(sql, (error, response) => {
            if(error) {
                responses.internalServerErr(req, resp, messages.DATABASE_ERROR);
            }else {
                responses.statusOk(req,resp, response);
            }
        });
    },
    getSingleContest: function (req, resp) {
        let sql = `SELECT * FROM contest WHERE contest_id = '${req.params["contest_id"]}'`;

        database.exec(sql, (error, response) => {
            if(error) {
                responses.internalServerErr(req, resp, messages.DATABASE_ERROR);
            }else {
                responses.statusOk(req,resp, response[0]);
            }
        });
    },
    createContest: function (req, resp) {
        let sql = `INSERT INTO contest (contest_start, contest_end) VALUES ('${req.body.contest_start}', '${req.body.contest_end}')`;
        database.exec(sql, (error, response) => {
            if(error) {
                responses.internalServerErr(req, resp, messages.DATABASE_ERROR);
            }else {
                responses.statusOk(req, resp, '{"message": "Contest data has been successfully created!"}');
            }
        });
    },
    updateContest: function (req, resp) {
        let sql = `UPDATE contest SET contest_start ='${req.body.contest_start}', contest_end='${req.body.contest_end}'`;

        database.exec(sql, (error, response) => {
            if(error) {
                responses.internalServerErr(req, resp, messages.DATABASE_ERROR);
            }else {
                responses.statusOk(req, resp, '{"message": "Contest data has been successfully changed!"}');
            }
        })
    },
    deleteContest: function (req, resp) {
        let sql = `DELETE FROM contest WHERE contest_id='${req.body.contest_id}'`;

        database.exec(sql, (error, response) => {
            if(error) {
                responses.internalServerErr(req, resp, messages.DATABASE_ERROR);
            }else {
                responses.statusOk(req,resp, '{"message": "Contest has been deleted!"}');
            }
        });
    }
};
