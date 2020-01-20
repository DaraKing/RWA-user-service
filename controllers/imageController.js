let responses = require('../common/responses');

module.exports = {
    uploadPicture: function (req, resp) {
        console.log(req.file.path);
        responses.statusOk(req, resp, '{"message": "Image has been uploaded successfully uploaded!"}');
    }
};
