const express = require('express');
const categoryroutes = express.Router();
const categoryimg = require('../middleware/categoryimg');
const {
    InsertCategory,
    UpdateCategory,
    GetSingleCategory,
    GetALlCategory,
    DeleteCategory } = require('../controllers/category')

categoryroutes.post('/', categoryimg.single('categoryimgname'), InsertCategory)
categoryroutes.patch('/:id', categoryimg.single('categoryimgname'), UpdateCategory)
categoryroutes.get('/:id', GetSingleCategory)
categoryroutes.get('/', GetALlCategory)
categoryroutes.delete('/:id', DeleteCategory)

module.exports = categoryroutes;