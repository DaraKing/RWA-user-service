let database = require("../database");
let responses = require('../common/responses');
let messages = require("../common/messages");
let common = require("../common/common");

module.exports = {
    // ID param from URL you will get using req.params["categoryId"]
    getAllCategories: function (req, resp) {
        let sql = `SELECT * FROM categories `;

        database.exec(sql, (error, response) => {
            if(error) {
                responses.internalServerErr(req, resp, messages.DATABASE_ERROR);
            }else {
                responses.statusOk(req,resp, response);
            }
        });
    },
    getAllCategoriesWeb: function (req, resp) {
        let sql = `SELECT * FROM categories LIMIT 3`;

        database.exec(sql, (error, response) => {
            if(error) {
                responses.internalServerErr(req, resp, messages.DATABASE_ERROR);
            }else {
                responses.statusOk(req,resp, response);
            }
        });
    },
    getCategoryWeb: function(req, resp) {

        let userId = common.getUserId(req);

        let sql = `SELECT c.category_id, c.category_name, c.category_description, c.category_image,
        COALESCE(
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'category_photo_id', cp.category_photo_id,
                    'photo_filename', cp.photo_filename,
                    'first_name', u.first_name,
                    'last_name', u.last_name
                )
            ), 
        '[]') as photos
        FROM categories AS c
        LEFT JOIN category_photos AS cp ON cp.category_id = c.category_id
        LEFT JOIN users AS u ON u.user_id = cp.user_id
        WHERE c.category_id = ${req.params["categoryId"]}
        GROUP BY c.category_id, c.category_name, c.category_description, c.category_image`;

        database.exec(sql, (error, response) => {
            if(error) {
                responses.internalServerErr(req, resp, messages.DATABASE_ERROR);
            }else {

                let likeSql = `SELECT category_photo_id FROM user_likes WHERE user_id = ${userId}`;

                database.exec(likeSql, (err, res) => {
                    if(err) {
                        responses.internalServerErr(req, res, messages.DATABASE_ERROR);
                    }else {
                        response[0].photos = JSON.parse(response[0].photos.toString());

                        for(let i=0; i<res.length; i++) {
                            for(let j=0; j<response[0].photos.length; j++) {
                                if(!response[0].photos[j].user_liked) {
                                    response[0].photos[j].user_liked = response[0].photos[j].category_photo_id === res[i].category_photo_id;
                                }
                            }
                        }

                        responses.statusOk(req,resp, response);
                    }
                })
            }
        });
    },
    getSingleCategory: function (req, resp) {
        let sql = `SELECT * FROM categories WHERE category_id = '${req.params["categoryId"]}'`;

        database.exec(sql, (error, response) => {
            if(error) {
                responses.internalServerErr(req, resp, messages.DATABASE_ERROR);
            }else {
                responses.statusOk(req,resp, response[0]);
            }
        });
    },
    createCategory: function (req, resp) {
        let sql = `INSERT INTO categories (category_name, category_description, category_image) VALUES ('${req.body.category_name}', '${req.body.category_description}', '${req.body.category_image}')`;

        database.exec(sql, (error, response) => {
            if(error) {
                responses.internalServerErr(req, resp, messages.DATABASE_ERROR);
            }else {
                responses.statusOk(req, resp, '{"message": "Category data has been successfully created!"}');
            }
        });
    },
    updateCategory: function (req, resp) {
        let sql = `UPDATE categories SET category_name ='${req.body.category_name}', category_description='${req.body.category_description}', category_image='${req.body.category_image}' WHERE category_id='${req.params["categoryId"]}'`;

        database.exec(sql, (error, response) => {
            if(error) {
                responses.internalServerErr(req, resp, messages.DATABASE_ERROR);
            }else {
                responses.statusOk(req, resp, '{"message": "Category data has been successfully changed!"}');
            }
        })
    },
    deleteCategory: function (req, resp) {
        let sql = `DELETE FROM categories WHERE category_id='${req.params["categoryId"]}'`;

        database.exec(sql, (error, response) => {
            if(error) {
                responses.internalServerErr(req, resp, messages.DATABASE_ERROR);
            }else {
                responses.statusOk(req,resp, '{"message": "Category has been deleted!"}');
            }
        });
    }
};

