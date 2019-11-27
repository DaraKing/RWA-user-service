const port = 4000;
let test = require('./controllers/testController');
let cors = require('cors');
let authController = require('./controllers/authController');

let corsOptions = {
    origin: 'http://rwafrontend-env.sw7w4bhifr.eu-central-1.elasticbeanstalk.com'
};

module.exports = function(app) {

    app.group("/api", (api) => {
        api.get('/test', test.test);

        api.group("/auth", (auth) => {
            auth.post('/register',cors(corsOptions), authController.register);
            auth.post('/login', cors(corsOptions), authController.login);
        })
    });

    app.listen(port, () => console.log(`[USER SERVICE] Listening on port ${port}`));
};
