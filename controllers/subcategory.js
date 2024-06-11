const mysql = require('mysql');
const connection = require('../config/connection');

const InsertSubCategory = async (req, res) => {
    try {
        const data = req.body;
        if (!data.categoryid || !data.subcategoryname) {
            return res.status(400).json({
                status: false,
                message: "Please add all data"
            })
        }

        connection.query(`insert into subcategorys (categoryid,subcategoryname)values(?,?)`, [data.categoryid, data.subcategoryname], (err, result) => {
            if (err) {
                return res.status(400).json({
                    status: false,
                    message: "Please contact admin"
                })
            }
            res.status(201).json({
                status: true,
                message: "Subcategory inserted successfully"
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

const UpdateSubCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        connection.query(`select * from subcategorys where subcategoryid  = ${id}`, (err, result) => {
            if (err) {
                return res.status(400).json({
                    status: false,
                    message: "Please contact admin"
                })
            }

            if (!result.length) {
                return res.status(400).json({
                    status: false,
                    message: "Subcategory not found"
                })
            }

            connection.query(`update subcategorys set categoryid = '${data.categoryid}' , subcategoryname = '${data.subcategoryname}' where subcategoryid = ${id}`, (err, result) => {
                if (err) {
                    return res.status(400).json({
                        status: false,
                        message: "Please contact admin"
                    })
                }

                res.status(200).json({
                    status: true,
                    message: "Subcategory updated successfully"
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

const GetSingleSubCategory = async (req, res) => {
    try {
        const id = req.params.id;
        connection.query(`select * from subcategorys where subcategoryid = ${id}`, (err, result) => {
            if (err) {
                return res.status(400).json({
                    status: false,
                    message: "Please contact admin"
                })
            }

            if (!result.length) {
                return res.status(400).json({
                    status: false,
                    message: "Subcategory not found"
                })
            }

            connection.query(`select s.*,c.categoryname from subcategorys as s left join categorys as c on s.categoryid = c.categoryid where subcategoryid = ${id}`, (err, result) => {
                if (err) {
                    return res.status(400).json({
                        status: false,
                        message: "Please contact admin"
                    })
                }

                res.status(200).json({
                    status: true,
                    message: "data found",
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

const GetAllSubCategory = async (req, res) => {
    try {
        connection.query(`select s.*,c.categoryname from subcategorys as s left join categorys as c on s.categoryid = c.categoryid`, (err, result) => {
            if (err) {
                return res.status(400).json({
                    status: false,
                    message: "Please contact admin"
                })
            }

            res.status(200).json({
                status: true,
                message: "data found",
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

const DeleteSubCategory = async (req, res) => {
    try {
        const id = req.params.id;
        connection.query(`select * from subcategorys where subcategoryid  = ${id}`, (err, result) => {
            if (err) {
                return res.status(400).json({
                    status: false,
                    message: "Please contact admin"
                })
            }

            if (!result.length) {
                return res.status(400).json({
                    status: false,
                    message: "Subcategory not found"
                })
            }

            connection.query(`delete from subcategorys where subcategoryid = ${id}`, (err, result) => {
                if (err) {
                    return res.status(400).json({
                        status: false,
                        message: 'Please contact admin'
                    })
                }

                res.status(200).json({
                    status: true,
                    message: "Subcategory deleted successfully"
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
    InsertSubCategory,
    UpdateSubCategory,
    GetSingleSubCategory,
    GetAllSubCategory,
    DeleteSubCategory
}


