const port = 4000;
let test = require('./controllers/testController');
let cors = require('cors');
let authController = require('./controllers/authController');
let usersController = require('./controllers/usersController');
let rolesController = require('./controllers/rolesController');
let contestController = require('./controllers/contestController');
let categoryController = require('./controllers/categoryController');
let imageController = require('./controllers/imageController');
let middleware = require('./common/middleware');

const express = require('express');
const path = require('path');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './images/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now().toString() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    }else {
        cb(null, false);
    }
};

const upload = multer({storage, fileFilter});

module.exports = function(app) {

    app.use(function (req, res, next) {

        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', '*');

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, access-control-allow-origin, Authorization');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);

        // Pass to next layer of middleware
        next();
    });

    app.use('/images', express.static('images'));

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

        api.group("/category", (category) => {
            category.get('/all', middleware.admin, categoryController.getAllCategory);
            category.get('/web', middleware.admin, categoryController.getAllCategoriesWeb);
            category.post('/create', middleware.admin, categoryController.createCategory);
            category.get('/:categoryId', middleware.admin, categoryController.getSingleCategory);
            category.put('/:categoryId', middleware.admin, categoryController.updateCategory);
            category.delete('/:categoryId', middleware.admin, categoryController.deleteCategory);
        });

        api.group("/contest-photo", (contestImage) => {
            contestImage.post('/upload', upload.single('image'), imageController.uploadPicture);
            contestImage.delete('/:imageId', imageController.deleteImage);
        });
    });

    app.listen(port, () => console.log(`[MULTI SERVICE] Listening on port ${port}`));
};
