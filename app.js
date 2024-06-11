const mysql = require('mysql');
const express = require('express');
const app = express();

const connection = require('./config/connection');
const categoryroutes = require('./routes/category');
const subcategoryroutes = require('./routes/subcategory');
const productroutes = require('./routes/product');

app.use(express.json());

app.use('/category', categoryroutes);
app.use('/subcategory', subcategoryroutes);
app.use('/product', productroutes);

connection.connect((err, result) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log("database connected")
    }
})
app.listen(process.env.port, () => { console.log("port connected") });

