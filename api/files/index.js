const {Router} = require('express');
const multer = require('multer');
const fs = require('fs');
const rootPath = require('app-root-path').path;
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const destinationPath = path.join(rootPath, 'static', 'img', req.user._id.toString());

        if(!fs.existsSync(destinationPath)) fs.mkdirSync(destinationPath);

        cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    }
});

const upload = multer({storage});

const routes = Router();

const ctrl = require('./files.controller');
const mdl = require('../middlewares');

routes.post('/', mdl.isAuth, upload.single('avatar'), ctrl.showMessages);

module.exports = routes;
