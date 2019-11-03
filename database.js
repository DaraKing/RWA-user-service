var mysql = require('mysql');
var constants = require('./common/constants');

module.exports = {
    pool : mysql.createPool({
        host:       constants.DB_HOST,
        user:       constants.DB_USER,
        password:   constants.DB_PASSWORD,
        database:   constants.DB_NAME
    })
};
