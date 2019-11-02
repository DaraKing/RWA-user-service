const port = 4000;
let test = require('./controllers/testController');

module.exports = function(app) {
    app.get('/api/test', test.test);

    app.listen(port, () => console.log(`[USER SERVICE] Listening on port ${port}`));
};
