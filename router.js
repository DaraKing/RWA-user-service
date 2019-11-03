const port = 4000;
let test = require('./controllers/testController');
let authController = require('./controllers/authController');

module.exports = function(app) {
    app.group("/api", (api) => {
        api.get('/test', test.test);

        api.group("/auth", (auth) => {
            auth.post('/register', authController.register)
        })
    });

    app.listen(port, () => console.log(`[USER SERVICE] Listening on port ${port}`));
};
