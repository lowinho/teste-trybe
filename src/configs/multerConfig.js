const multer = require('multer');
const { resolve } = require('path');

const multerConfig = {
    fileFilter: (req, file, callback) => {
        if (
          file.mimetype !== 'image/jpeg') {
            return callback(new multer.MulterError('Type file error'));
        }

        return callback(null, true);
    },

    storage: multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, resolve(__dirname, '..', 'uploads'));
        },
        filename: (req, file, callback) => {
            callback(null, `${req.params.id}.jpeg`);
        },
    }),
};

module.exports = multerConfig;
