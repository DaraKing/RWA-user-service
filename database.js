var mysql = require('mysql');
var constants = require('./common/constants');

const pool = mysql.createPool({
    host:       constants.DB_HOST,
    user:       constants.DB_USER,
    password:   constants.DB_PASSWORD,
    database:   constants.DB_NAME
});

async function exec(query, result) {
    pool.query(query, null, function (err, res) {

        if(err) {
            console.log("[ERROR] ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

module.exports = {
    pool,
    exec
};
