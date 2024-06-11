const mysql = require('mysql');
const connection = require('../config/connection');

const InsertCategory = async (req, res) => {
    try {
        const data = req.body;
        if (!data.categoryname) {
            return res.status(400).json({
                status: false,
                message: "Please add categoryname"
            })
        }

        const image = req.file
        if (!image) {
            return res.status(400).json({
                status: false,
                message: "Please add categoryimage"
            })
        }

        connection.query(`insert into categorys (categoryname,categoryimgname) values (?,?)`, [data.categoryname, image.filename], (err, result) => {
            if (err) {
                return res.status(400).json({
                    status: false,
                    message: "please contact admin"
                })
            }

            return res.status(201).json({
                status: true,
                message: "Category inserted successfully"
            })
        })
    }

    catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}

const UpdateCategory = async (req, res) => {
    try {
        const id = req.params.id;
        connection.query(`select * from categorys where categoryid = ${id}`, (err, result) => {
            if (err) {
                return res.status(400).json({
                    status: false,
                    message: "please contact admin"
                })
            }
            if (!result.length) {
                return res.status(400).json({
                    status: false,
                    message: "Category not found"
                })
            }

            const data = req.body;
            const image = req.file;
            if (!image) {
                connection.query(`update categorys set categoryname ='${data.categoryname}' where categoryid = ${id}`, (err, result) => {
                    if (err) {
                        return res.status(400).json({
                            status: false,
                            message: "please contact admin"
                        })
                    }
                    return res.status(200).json({
                        status: true,
                        message: "Category updated successfully"
                    })
                })
            }

            const imgname = image.filename;
            connection.query(`update categorys set categoryname ='${data.categoryname}', categoryimgname = '${imgname}' where categoryid = ${id}`, (err, result) => {
                if (err) {
                    return res.status(400).json({
                        status: false,
                        message: "please contact admin"
                    })
                }
                return res.status(200).json({
                    status: false,
                    message: "Category updated successfully"
                })
            })
        })
    }

    catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}

const GetSingleCategory = async (req, res) => {
    try {
        const id = req.params.id;
        connection.query(`select * from categorys where categoryid = ${id}`, (err, result) => {
            if (err) {
                return res.status(400).json({
                    status: false,
                    message: "please contact admin"
                })
            }
            if (!result.length) {
                return res.status(400).json({
                    status: false,
                    message: "Category not found"
                })
            }

            res.status(400).json({
                status: false,
                message: "Category found",
                data: result[0]
            })
        })
    }

    catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}

const GetALlCategory = async (req, res) => {
    try {
        connection.query('select * from categorys ', (err, result) => {
            if (err) {
                return res.status(400).json({
                    status: false,
                    message: "Please contact admin"
                })
            }
            res.status(400).json({
                status: false,
                message: "All category found",
                data: result
            })
        })
    }

    catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}

const DeleteCategory = async (req, res) => {
    try {
        const id = req.params.id;
        connection.query(`select * from categorys where categoryid = ${id}`, (err, result) => {
            if (err) {
                return res.status(400).json({
                    status: false,
                    message: "please contact admin"
                })
            }
            if (!result.length) {
                return res.status(400).json({
                    status: false,
                    message: "Category not found"
                })
            }

            connection.query(`delete from categorys where categoryid = ${id}`, (err, result) => {
                if (err) {
                    return res.status(400).json({
                        status: false,
                        message: "please contact admin", err
                    })
                }
                res.status(400).json({
                    status: false,
                    message: "Category deleted successfully",
                    data: result[0]
                })
            })
        })
    }

    catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}

module.exports = {
    InsertCategory,
    UpdateCategory,
    GetSingleCategory,
    GetALlCategory,
    DeleteCategory
}