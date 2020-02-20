let database = require("../database");
let responses = require('../common/responses');
let messages = require("../common/messages");

module.exports = {
    // ID param from URL you will get using req.params["categoryId"]
    getAllCategory: function (req, resp) {
        let sql = `SELECT * FROM categories `;

        database.exec(sql, (error, response) => {
            if(error) {
                responses.internalServerErr(req, resp, messages.DATABASE_ERROR);
            }else {
                responses.statusOk(req,resp, response);
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
        let sql = `INSERT INTO categories (category_name, category_description) VALUES ('${req.body.category_name}', '${req.body.category_description}')`;

        database.exec(sql, (error, response) => {
            if(error) {
                responses.internalServerErr(req, resp, messages.DATABASE_ERROR);
            }else {
                responses.statusOk(req, resp, '{"message": "Category data has been successfully created!"}');
            }
        });
    },
    updateCategory: function (req, resp) {
        let sql = `UPDATE categories SET category_name ='${req.body.category_name}', category_description='${req.body.category_description}'`;

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

