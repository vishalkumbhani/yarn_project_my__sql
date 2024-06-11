const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/image/category');
    },
    filename: function (req, file, cb) {
        const filename = `${Date.now()}${path.extname(file.originalname)}`
        cb(null, filename);
    }
})
const categoryimg = multer({ storage: storage });

module.exports = categoryimg;