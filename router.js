const port = 4000;
let test = require('./controllers/testController');
let cors = require('cors');
let authController = require('./controllers/authController');
let usersController = require('./controllers/usersController');
let rolesController = require('./controllers/rolesController');
let contestController = require('./controllers/contestController');
let middleware = require('./common/middleware');
const express = require('express');
const path = require('path');

module.exports = function(app) {

    app.use(function (req, res, next) {

        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', '*');

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, access-control-allow-origin');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);

        // Pass to next layer of middleware
        next();
    });

    app.get("/", express.static(path.join(__dirname, "./images")));

    app.group("/api", (api) => {
        api.get('/test', test.test);

        api.group("/auth", (auth) => {
            auth.post('/register', authController.register);
            auth.post('/login', authController.login);
        });

        api.group("/roles", (roles) => {
            roles.get("/all", middleware.admin, rolesController.getAllRoles);
        });

        api.group("/users", (users) => {
             users.get('/all', middleware.admin, usersController.getAllUsers);
             users.get('/:userId', middleware.admin ,usersController.getUserById);
             users.put('/:userId', middleware.admin, usersController.updateUser);
        });

        api.group("/contest", (contest) => {
            contest.get('/all', middleware.admin, contestController.getAllContests);
            contest.post('/create', middleware.admin, contestController.createContest);
            contest.get('/:contestId', middleware.admin, contestController.getSingleContest);
            contest.put('/:contestId', middleware.admin, contestController.updateContest);
            contest.delete('/:contestId', middleware.admin, contestController.deleteContest);
        });
    });

    app.listen(port, () => console.log(`[MULTI SERVICE] Listening on port ${port}`));
};
