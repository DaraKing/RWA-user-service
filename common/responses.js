module.exports = {
    statusOk:           function (req,resp, message) {
        resp.status(200).send(message);
    },
    badRequest:         function (req, resp, message) {
        resp.status(400).send(message);
    },
    unauthorized:       function (req, resp, message) {
        if(!message) {
            message = "UNATHORIZED ACCESS!"
        }
        resp.status(401).send(message);
    },
    notFound:           function (req, resp, message) {
        resp.status(404).json(message);
    },
    internalServerErr:  function (req, resp, message) {
        if(!message) {
            message = " INTERNAL SERVER ERROR"
        }
        resp.status(500).send(message).end();
    }
};
