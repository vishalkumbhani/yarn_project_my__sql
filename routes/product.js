const express = require('express');
const productroutes = express.Router();

const {
    InsertProduct,
    UpdateProduct,
    GetSingleProduct,
    GetAllProduct,
    DeleteProduct } = require('../controllers/product');

productroutes.post('/', InsertProduct);
productroutes.patch('/:id', UpdateProduct);
productroutes.get('/:id', GetSingleProduct);
productroutes.get('/', GetAllProduct);
productroutes.delete('/:id', DeleteProduct);

module.exports = productroutes;
