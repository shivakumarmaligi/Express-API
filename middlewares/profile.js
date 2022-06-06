const multer = require("multer");

const store_data = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, "public/uploads");
    },
    filename: function (req, res, cb) {
        cb(null, Date.now() + file.originalename);
    },
});

module.exports = { store_data };