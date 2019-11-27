const port = 4000;
let test = require('./controllers/testController');
let cors = require('cors');
let authController = require('./controllers/authController');

module.exports = function(app) {

    app.group("/api", (api) => {
        api.get('/test', test.test);

        api.group("/auth", (auth) => {
            auth.post('/register',cors(), authController.register);
            auth.post('/login', cors(), authController.login);
        })
    });

    app.listen(port, () => console.log(`[USER SERVICE] Listening on port ${port}`));
};
