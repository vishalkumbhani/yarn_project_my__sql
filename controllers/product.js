const mysql = require('mysql');
const connection = require('../config/connection');

const InsertProduct = async (req, res) => {
    try {
        const data = req.body;
        if (!data.subcategoryid || !data.company || !data.price || !data.deniers || !data.filament) {
            res.status(400).json({
                status: false,
                message: "Please add all data"
            })
        }

        connection.query(`insert into products (subcategoryid,company,price,deniers,filament)values(?,?,?,?,?)`, [data.subcategoryid, data.company, data.price, data.deniers, data.filament], (err, result) => {
            if (err) {
                return res.status(400).json({
                    status: false,
                    message: "Please contact admin"
                })
            }
            res.status(201).json({
                status: false,
                message: "Product inserted successfully"
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

const UpdateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;

        connection.query(`select * from products where productid = ${id}`, (err, result) => {
            if (err) {
                return res.status(400).json({
                    status: false,
                    message: "Please contact admin"
                })
            }

            if (!result.length) {
                return res.status(400).json({
                    status: false,
                    message: "Product not found"
                })
            }

            connection.query(`update products set subcategoryid = '${data.subcategoryid}',company= '${data.company}',price = '${data.price}',deniers = '${data.deniers}',filament = '${data.filament}'where productid = ${id}`, (err, result) => {
                if (err) {
                    return res.status(400).json({
                        status: false,
                        message: "Please contact admin", err
                    })
                }
                res.status(200).json({
                    status: true,
                    message: "Product updated successfully"
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

const GetSingleProduct = async (req, res) => {
    try {
        const id = req.params.id;
        connection.query(`select * from products where productid = ${id} `, (err, result) => {
            if (err) {
                return res.status(400).json({
                    status: false,
                    message: "Please contact admin"
                })
            }

            if (!result.length) {
                return res.status(400).json({
                    status: false,
                    message: "Product not found"
                })
            }

            connection.query(`select p.* , s.subcategoryname , c.categoryname
            from products as p 
            left join subcategorys as s on p.subcategoryid = s.subcategoryid 
            left join categorys as c on s.categoryid = c.categoryid
            where productid = ${id}`, (err, result) => {
                if (err) {
                    return res.status(400).json({
                        status: false,
                        message: "Please contact admin", err
                    })
                }

                res.status(200).json({
                    status: true,
                    message: "Data found",
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

const GetAllProduct = async (req, res) => {
    try {
        connection.query(`select p.* , s.subcategoryname , c.categoryname
        from products as p 
        left join subcategorys as s on p.subcategoryid = s.subcategoryid
        left join categorys as c on s.categoryid = c.categoryid`, (err, result) => {
            if (err) {
                return res.status(400).json({
                    status: false,
                    message: "Please contact admin"
                })
            }
            res.status(200).json({
                status: true,
                message: "All data found",
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

const DeleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        connection.query(`select * from products where productid = ${id}`, (err, result) => {
            if (err) {
                return res.status(400).json({
                    status: false,
                    message: "Please contact admin"
                })
            }

            if (!result.length) {
                return res.status(400).json({
                    status: false,
                    message: "Product not found"
                })
            }

            connection.query(`delete from products where productid = ${id}`, (err, result) => {
                res.status(200).json({
                    status: true,
                    message: "Product deleted successfully"
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
    InsertProduct,
    UpdateProduct,
    GetSingleProduct,
    GetAllProduct,
    DeleteProduct
}
