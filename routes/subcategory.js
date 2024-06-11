const express = require('express');
const subcategoryroutes = express.Router();

const {
    InsertSubCategory,
    UpdateSubCategory,
    GetSingleSubCategory,
    GetAllSubCategory,
    DeleteSubCategory } = require('../controllers/subcategory');

subcategoryroutes.post('/', InsertSubCategory);
subcategoryroutes.patch('/:id', UpdateSubCategory);
subcategoryroutes.get('/:id', GetSingleSubCategory);
subcategoryroutes.get('/', GetAllSubCategory);
subcategoryroutes.delete('/:id', DeleteSubCategory);

module.exports = subcategoryroutes;




