const {Router} = require('express');
const multer = require('multer');
const fs = require('fs');
const rootPath = require('app-root-path').path;
const path = require('path');

const allowedExts = [
    '.jpg',
    '.png',
    '.gif'
];

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const destinationPath = path.join(rootPath, 'static', 'img', req.user._id.toString());

        if(!fs.existsSync(destinationPath)) fs.mkdirSync(destinationPath);

        cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if(!allowedExts.includes(ext)){
            return cb(new Error('Only images can be uploaded'));
        } else {
            return cb(null, true);
        }
    }
});

const routes = Router();

const ctrl = require('./files.controller');
const mdl = require('../middlewares');

routes.post('/', mdl.isAuth, upload.single('avatar'), ctrl.showMessages);

module.exports = routes;
