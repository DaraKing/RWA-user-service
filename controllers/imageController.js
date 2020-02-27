let responses = require('../common/responses');
let database = require("../database");
let messages = require("../common/messages");
let token = require("../common/token");
let common = require("../common/common");

module.exports = {
    uploadPicture: function (req, resp) {
        let jwtToken = req.headers['authorization'].split(" ")[1];

        let data = token.verify(jwtToken);

        let insertSql = `INSERT INTO category_photos(photo_filename, image_title, image_description, user_id, category_id) VALUES ("${req.file.path}", "${req.body.image_title}", "${req.body.image_description}", ${data.user_id}, "${req.body.category_id}")`;

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
    },
    likeImage: function (req, resp) {

        let userId = common.getUserId(req);

        let sql = `INSERT INTO user_likes(category_photo_id, user_id) VALUES ("${req.params["imageId"]}", "${userId}")`;

        database.exec(sql, (error, _) => {
            if(error) {
                responses.internalServerErr(req, resp, messages.DATABASE_ERROR);
                return
            }else {
                responses.statusOk(req, resp, '{"message": "Image has been liked successfully !"}');
            }
        });

    }
};
