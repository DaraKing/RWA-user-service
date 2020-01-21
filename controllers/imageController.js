let responses = require('../common/responses');
let database = require("../database");
let messages = require("../common/messages");
let token = require("../common/token");

module.exports = {
    uploadPicture: function (req, resp) {
        let jwtToken = req.headers['authorization'].split(" ")[1];

        let data = token.verify(jwtToken);

        let insertSql = `INSERT INTO contest_photos(photo_filename, user_id, contest_id) VALUES ("${req.file.path}", ${data.user_id}, "${req.body.contest_id}")`;

        database.exec(insertSql, (error, _) => {
            if(error) {
                responses.internalServerErr(req, resp, messages.DATABASE_ERROR);
                return
            }else {
                responses.statusOk(req, resp, '{"message": "Image has been uploaded successfully uploaded!"}');
            }
        });
    },
    deleteImage: function (req, resp) {
        let sql = `DELETE FROM contest_photos WHERE contest_photo_id = ${req.params["imageId"]}`;

        database.exec(sql, (error, _ ) => {
            if(error) {
                responses.internalServerErr(req, resp, messages.DATABASE_ERROR);
            }else {
                responses.statusOk(req, resp, '{"message": "Image has been successfully deleted!"}');
            }
        });
    }
};
